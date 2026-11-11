import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Field, inputClass } from './Login.jsx'

// პაროლის სიძლიერე (0-4)
const strength = (p) => [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(p)).length
const strengthLabel = ['ძალიან სუსტი', 'სუსტი', 'საშუალო', 'კარგი', 'ძლიერი']
const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-600']

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'შეიყვანეთ სწორი ელ-ფოსტა'
    if (form.password.length < 8) e.password = 'პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო'
    if (form.confirm !== form.password) e.confirm = 'პაროლები არ ემთხვევა'
    if (!form.agree) e.agree = 'გთხოვთ დაეთანხმოთ წესებს'
    return e
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    try {
      register(form)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setErrors({ email: err.message })
    }
  }

  const s = strength(form.password)

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-4">
        <h1 className="text-3xl font-bold text-center">რეგისტრაცია</h1>

        {success && <p className="p-3 rounded-lg bg-green-100 text-green-700 text-center">✅ რეგისტრაცია წარმატებულია! გადამისამართება...</p>}

        <Field label="სახელი" error={errors.name}>
          <input name="name" value={form.name} onChange={onChange} className={inputClass(errors.name)} placeholder="გიორგი" />
        </Field>
        <Field label="ელ-ფოსტა" error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={onChange} className={inputClass(errors.email)} placeholder="name@mail.com" />
        </Field>
        <Field label="პაროლი" error={errors.password}>
          <div className="relative">
            <input name="password" type={show ? 'text' : 'password'} value={form.password} onChange={onChange} className={inputClass(errors.password)} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="პაროლის ჩვენება">{show ? '🙈' : '👁️'}</button>
          </div>
          {form.password && (
            <div className="mt-2">
              <div className="h-2 rounded bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className={`h-full transition-all ${strengthColor[s]}`} style={{ width: `${(s / 4) * 100 || 5}%` }} />
              </div>
              <p className="text-xs mt-1 text-slate-500">სიძლიერე: {strengthLabel[s]}</p>
            </div>
          )}
        </Field>
        <Field label="გაიმეორეთ პაროლი" error={errors.confirm}>
          <input name="confirm" type={show ? 'text' : 'password'} value={form.confirm} onChange={onChange} className={inputClass(errors.confirm)} />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="agree" checked={form.agree} onChange={onChange} className="accent-rose-500 w-4 h-4" />
          ვეთანხმები წესებს და პირობებს
        </label>
        {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

        <button className="w-full py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 active:scale-95 transition">რეგისტრაცია</button>
        <p className="text-center text-sm">უკვე გაქვთ ანგარიში? <Link to="/login" className="text-rose-500 font-semibold">შესვლა</Link></p>
      </form>
    </section>
  )
}

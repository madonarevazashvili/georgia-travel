import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// საერთო კომპონენტები ფორმებისთვის
export function Field({ label, error, children }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export const inputClass = (err) =>
  `w-full px-4 py-2 rounded-xl border bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition ${err ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return setError('შეავსეთ ყველა ველი')
    try {
      login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <form onSubmit={onSubmit} noValidate className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-4">
        <h1 className="text-3xl font-bold text-center">ავტორიზაცია</h1>
        {error && <p className="p-3 rounded-lg bg-red-100 text-red-700 text-center">{error}</p>}

        <Field label="ელ-ფოსტა">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass()} placeholder="name@mail.com" />
        </Field>
        <Field label="პაროლი">
          <div className="relative">
            <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass()} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="პაროლის ჩვენება">{show ? '🙈' : '👁️'}</button>
          </div>
        </Field>

        <button className="w-full py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 active:scale-95 transition">შესვლა</button>
        <p className="text-center text-sm">არ გაქვთ ანგარიში? <Link to="/register" className="text-rose-500 font-semibold">რეგისტრაცია</Link></p>
      </form>
    </section>
  )
}

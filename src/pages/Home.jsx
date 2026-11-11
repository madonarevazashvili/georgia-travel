import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { destinations } from '../data/destinations.js'

const stats = [
  { label: 'ტურისტი წელიწადში', value: 7000000, suffix: '+' },
  { label: 'ისტორიული ძეგლი', value: 12000, suffix: '+' },
  { label: 'ღვინის ჯიში', value: 525, suffix: '' },
]

const faq = [
  { q: 'როდის ჯობია საქართველოში მოგზაურობა?', a: 'მაის-ოქტომბერი იდეალურია მთისა და ზღვისთვის, ზამთარი კი — სათხილამურო კურორტებისთვის.' },
  { q: 'საჭიროა თუ არა ვიზა?', a: 'ბევრი ქვეყნის მოქალაქეს შეუძლია უვიზოდ დარჩეს 1 წლამდე.' },
  { q: 'როგორ გადავაადგილდე?', a: 'ქალაქებს შორის მოძრაობს მატარებლები და მიკროავტობუსები; ასევე პოპულარულია მანქანის ქირაობა.' },
]

// ანიმირებული მთვლელი
function Counter({ value, suffix }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let frame
    let start = null
    const step = (t) => {
      if (start === null) start = t
      const p = Math.min((t - start) / 1500, 1)
      setN(Math.floor(value * p))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <span>{n.toLocaleString('ka-GE')}{suffix}</span>
}

// სლაიდერი (კარუსელი)
function Slider() {
  const [i, setI] = useState(0)
  const items = destinations
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), 4000)
    return () => clearInterval(id)
  }, [items.length])
  const d = items[i]
  return (
    <div className={`relative rounded-3xl p-8 sm:p-12 text-white bg-gradient-to-br ${d.color} shadow-xl transition-all duration-700`}>
      <div className="text-7xl mb-4">{d.emoji}</div>
      <h3 className="text-3xl font-extrabold">{d.name}</h3>
      <p className="mt-2 max-w-lg opacity-90">{d.text}</p>
      <div className="flex items-center gap-3 mt-6">
        <button aria-label="წინა" onClick={() => setI((i - 1 + items.length) % items.length)} className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40">‹</button>
        <button aria-label="შემდეგი" onClick={() => setI((i + 1) % items.length)} className="w-10 h-10 rounded-full bg-white/25 hover:bg-white/40">›</button>
        <div className="flex gap-2 ml-2">
          {items.map((_, k) => (
            <button key={k} aria-label={`სლაიდი ${k + 1}`} onClick={() => setI(k)}
              className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-white' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 to-sky-100 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              აღმოაჩინე <span className="text-rose-500">საქართველო</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              მთები, ზღვა, ძველი ქალაქები და ღვინის 8000-წლიანი ისტორია — ყველაფერი ერთ პატარა ქვეყანაში.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/destinations" className="px-6 py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 hover:scale-105 transition">ადგილების ნახვა</Link>
              <Link to="/weather" className="px-6 py-3 rounded-xl border-2 border-rose-500 text-rose-500 font-semibold hover:bg-rose-500 hover:text-white transition">ამინდის შემოწმება</Link>
            </div>
          </div>
          {/* გრაფიკული ელემენტი — SVG */}
          <svg viewBox="0 0 400 300" className="w-full animate-float" role="img" aria-label="მთების ილუსტრაცია">
            <circle cx="310" cy="70" r="40" fill="#fbbf24" />
            <polygon points="0,300 130,90 260,300" fill="#64748b" />
            <polygon points="130,90 160,140 100,140" fill="#fff" />
            <polygon points="140,300 280,60 400,300" fill="#475569" />
            <polygon points="280,60 315,120 245,120" fill="#fff" />
            <rect x="0" y="270" width="400" height="30" fill="#22c55e" />
          </svg>
        </div>
      </section>

      {/* სტატისტიკა */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid sm:grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <Reveal key={s.label} className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
            <div className="text-4xl font-extrabold text-rose-500"><Counter value={s.value} suffix={s.suffix} /></div>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{s.label}</p>
          </Reveal>
        ))}
      </section>

      {/* სლაიდერი */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <Reveal>
          <h2 className="text-3xl font-bold mb-6">პოპულარული მიმართულებები</h2>
          <Slider />
        </Reveal>
      </section>

      {/* FAQ აკორდეონი */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <Reveal>
          <h2 className="text-3xl font-bold mb-6 text-center">ხშირად დასმული კითხვები</h2>
          <div className="space-y-3">
            {faq.map((f, k) => (
              <div key={k} className="rounded-xl bg-white dark:bg-slate-800 shadow overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === k ? null : k)} aria-expanded={openFaq === k}
                  className="w-full flex justify-between items-center p-4 font-semibold text-left">
                  {f.q}
                  <span className={`transition-transform ${openFaq === k ? 'rotate-45' : ''}`}>＋</span>
                </button>
                <div className={`px-4 overflow-hidden transition-all duration-300 text-slate-600 dark:text-slate-300 ${openFaq === k ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                  {f.a}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}

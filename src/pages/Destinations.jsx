import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations.js'
import { useAuth } from '../context/AuthContext.jsx'

const regions = ['ყველა', ...new Set(destinations.map((d) => d.region))]

export default function Destinations() {
  const [filter, setFilter] = useState('ყველა')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [likes, setLikes] = useState(() => JSON.parse(localStorage.getItem('likes') || '[]'))
  const { user } = useAuth()

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes))
  }, [likes])

  // Esc ღილაკით მოდალის დახურვა
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const list = useMemo(() => destinations.filter((d) =>
    (filter === 'ყველა' || d.region === filter) && d.name.includes(search.trim())
  ), [filter, search])

  const toggleLike = (id) => setLikes((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">ადგილები</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 ძებნა..."
          className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400" />
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button key={r} onClick={() => setFilter(r)}
              className={`px-4 py-2 rounded-xl transition ${filter === r ? 'bg-rose-500 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 && <p className="text-center text-slate-500">ვერაფერი მოიძებნა 😕</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => (
          <article key={d.id} className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow hover:shadow-xl hover:-translate-y-1 transition">
            <div className={`h-40 flex items-center justify-center text-7xl bg-gradient-to-br ${d.color}`}>
              <span className="group-hover:scale-125 transition-transform">{d.emoji}</span>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{d.name}</h2>
                <button onClick={() => toggleLike(d.id)} aria-label="მოწონება" className="text-2xl hover:scale-125 transition">
                  {likes.includes(d.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700">{d.region}</span>
              <p className="mt-3 text-slate-600 dark:text-slate-300 line-clamp-2">{d.text}</p>
              <button onClick={() => setSelected(d)} className="mt-4 text-rose-500 font-semibold hover:underline">დეტალურად →</button>
            </div>
          </article>
        ))}
      </div>

      {/* მოდალური ფანჯარა */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className={`h-32 flex items-center justify-center text-6xl bg-gradient-to-br ${selected.color}`}>{selected.emoji}</div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{selected.text}</p>
              <p className="mt-3 text-sm text-slate-500">📍 {selected.lat}, {selected.lon}</p>
              {user ? (
                <p className="mt-4 text-green-600">✅ {user.name}, შეგიძლიათ დაჯავშნოთ ტური!</p>
              ) : (
                <p className="mt-4 text-sm">
                  ტურის დასაჯავშნად <Link to="/login" className="text-rose-500 underline">შედით სისტემაში</Link>.
                </p>
              )}
              <button onClick={() => setSelected(null)} className="mt-6 w-full py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600">დახურვა</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

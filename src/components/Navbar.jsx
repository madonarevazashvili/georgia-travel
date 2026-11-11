import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/', label: 'მთავარი' },
  { to: '/destinations', label: 'ადგილები' },
  { to: '/weather', label: 'ამინდი' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const { user, logout } = useAuth()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition ${isActive ? 'bg-rose-500 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold text-rose-500">🏔️ საქართველო</Link>

        {/* დესკტოპის მენიუ */}
        <ul className="hidden md:flex items-center gap-2">
          {links.map(l => <li key={l.to}><NavLink to={l.to} end className={linkClass}>{l.label}</NavLink></li>)}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} aria-label="თემის შეცვლა"
            className="w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-xl">
            {dark ? '☀️' : '🌙'}
          </button>
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <span className="text-sm">გამარჯობა, <b>{user.name}</b></span>
                <button onClick={logout} className="px-4 py-2 rounded-lg border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white transition">გასვლა</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">შესვლა</NavLink>
                <NavLink to="/register" className="px-4 py-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition">რეგისტრაცია</NavLink>
              </>
            )}
          </div>
          {/* ჰამბურგერი — ჩამოსაშლელი მენიუ მობილურზე */}
          <button onClick={() => setOpen(!open)} aria-label="მენიუ" aria-expanded={open}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5">
            <span className={`h-0.5 w-6 bg-current transition ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-6 bg-current transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-current transition ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="px-4 pb-4 space-y-1" onClick={() => setOpen(false)}>
          {links.map(l => <li key={l.to}><NavLink to={l.to} end className={linkClass}>{l.label}</NavLink></li>)}
          {user ? (
            <li><button onClick={logout} className="w-full text-left px-3 py-2 text-rose-500">გასვლა ({user.name})</button></li>
          ) : (
            <>
              <li><NavLink to="/login" className={linkClass}>შესვლა</NavLink></li>
              <li><NavLink to="/register" className={linkClass}>რეგისტრაცია</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// ოპტიმიზაცია: გვერდები იტვირთება მხოლოდ საჭიროებისას (code splitting)
const Destinations = lazy(() => import('./pages/Destinations.jsx'))
const Weather = lazy(() => import('./pages/Weather.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<p className="text-center py-20">იტვირთება...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<p className="text-center py-20 text-2xl">404 — გვერდი ვერ მოიძებნა</p>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { destinations } from '../data/destinations.js'

// API ინტეგრაცია: Open-Meteo (უფასო, API გასაღები არ სჭირდება) — https://open-meteo.com
const codes = {
  0: ['☀️', 'მოწმენდილი'], 1: ['🌤️', 'უმეტესად მზიანი'], 2: ['⛅', 'ნაწილობრივ მოღრუბლული'], 3: ['☁️', 'მოღრუბლული'],
  45: ['🌫️', 'ნისლი'], 48: ['🌫️', 'ნისლი'], 51: ['🌦️', 'ჟინჟღლი'], 53: ['🌦️', 'ჟინჟღლი'], 55: ['🌦️', 'ჟინჟღლი'],
  61: ['🌧️', 'წვიმა'], 63: ['🌧️', 'წვიმა'], 65: ['🌧️', 'ძლიერი წვიმა'], 71: ['🌨️', 'თოვლი'], 73: ['🌨️', 'თოვლი'],
  75: ['❄️', 'ძლიერი თოვლი'], 80: ['🌦️', 'შხაპუნა'], 81: ['🌦️', 'შხაპუნა'], 82: ['⛈️', 'ძლიერი შხაპუნა'], 95: ['⛈️', 'ჭექა-ქუხილი'],
}
const days = ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ']

export default function Weather() {
  const [city, setCity] = useState(destinations[0])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const ctrl = new AbortController()
    setLoading(true)
    setError('')
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}`
      + '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code'
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Tbilisi'
    fetch(url, { signal: ctrl.signal })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(setData)
      .catch((e) => { if (e.name !== 'AbortError') setError('მონაცემების ჩატვირთვა ვერ მოხერხდა. სცადეთ თავიდან.') })
      .finally(() => setLoading(false))
    return () => ctrl.abort()
  }, [city])

  const cur = data?.current
  const [icon, desc] = codes[cur?.weather_code] || ['🌡️', '']

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">ამინდი</h1>
      <p className="text-slate-500 mb-6">რეალური მონაცემები Open-Meteo API-დან</p>

      <select value={city.id} onChange={(e) => setCity(destinations.find((d) => d.id === Number(e.target.value)))}
        className="w-full sm:w-64 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 mb-8">
        {destinations.map((d) => <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>)}
      </select>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="p-4 rounded-xl bg-red-100 text-red-700">{error}</p>}

      {!loading && !error && cur && (
        <>
          <div className="rounded-3xl p-8 text-white bg-gradient-to-br from-sky-500 to-indigo-600 shadow-xl flex flex-col sm:flex-row items-center gap-6">
            <div className="text-8xl">{icon}</div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">{city.name}</h2>
              <p className="text-6xl font-extrabold">{Math.round(cur.temperature_2m)}°C</p>
              <p className="opacity-90">{desc}</p>
            </div>
            <div className="sm:ml-auto space-y-1 text-sm">
              <p>💧 ტენიანობა: {cur.relative_humidity_2m}%</p>
              <p>💨 ქარი: {cur.wind_speed_10m} კმ/სთ</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-10 mb-4">7 დღის პროგნოზი</h3>
          <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
            {data.daily.time.map((t, k) => (
              <div key={t} className="rounded-xl bg-white dark:bg-slate-800 shadow p-3 text-center">
                <p className="font-semibold">{days[new Date(t).getDay()]}</p>
                <p className="text-3xl my-1">{(codes[data.daily.weather_code[k]] || ['🌡️'])[0]}</p>
                <p className="text-sm">
                  <b>{Math.round(data.daily.temperature_2m_max[k])}°</b> / {Math.round(data.daily.temperature_2m_min[k])}°
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

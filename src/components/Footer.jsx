export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <h3 className="font-bold text-white mb-2">🏔️ აღმოაჩინე საქართველო</h3>
          <p>მოგზაურობის გზამკვლევი — ადგილები, ამინდი და რჩევები.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">კონტაქტი</h3>
          <p>📧 info@georgia-travel.ge</p>
          <p>📞 +995 555 00 00 00</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">ტექნოლოგიები</h3>
          <p>HTML5 · CSS3 · Tailwind · JavaScript · React · Open-Meteo API</p>
        </div>
      </div>
      <p className="text-center text-xs pb-4">© {new Date().getFullYear()} ყველა უფლება დაცულია</p>
    </footer>
  )
}

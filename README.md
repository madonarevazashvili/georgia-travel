# 🏔️ აღმოაჩინე საქართველო

საქართველოში მოგზაურობის გზამკვლევი: React + Tailwind CSS ვებგვერდი.

## ტექნოლოგიები
- **HTML5**: სემანტიკური ტეგები (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3**: ანიმაციები (`@keyframes`), transitions, gradients
- **Tailwind CSS v4**: სტილები, რესპონსიული დიზაინი, მუქი თემა
- **JavaScript (ES6+)**: fetch, async, localStorage, IntersectionObserver
- **React 19**: კომპონენტები, hooks, Context API, React Router
- **API**: [Open-Meteo](https://open-meteo.com) (ამინდის პროგნოზი, გასაღები არ სჭირდება)
- **ოპტიმიზაცია**: lazy loading / code splitting, Vite build (მინიფიკაცია)
- **Git/GitHub**: ვერსიების კონტროლი

## დავალების პუნქტები → სად არის შესრულებული
| # | მოთხოვნა | ფაილი |
|---|---|---|
| 1 | სტრუქტურა | `src/App.jsx`, `src/pages/*`, `src/components/*` |
| 2 | ჩამოსაშლელი მენიუ | `src/components/Navbar.jsx` (ჰამბურგერი მობილურზე) |
| 3 | ტექნოლოგიები | ზემოთ ჩამოთვლილი |
| 4 | დიზაინი | Tailwind, მუქი/ღია თემა |
| 5 | ინფორმაცია (ტექსტი, გრაფიკა) | `Home.jsx` (SVG, სტატისტიკა), `Destinations.jsx` |
| 6 | რეგისტრაცია / ავტორიზაცია | `Register.jsx`, `Login.jsx`, `context/AuthContext.jsx` |
| 7 | ინტერაქტიული ელემენტები | სლაიდერი, აკორდეონი, მოდალი, ფილტრი, ძებნა, მოწონება, მთვლელი, scroll ანიმაცია |
| 8 | რესპონსიულობა | Tailwind breakpoints (`sm:`, `md:`, `lg:`) |
| 9 | API ინტეგრაცია | `src/pages/Weather.jsx` |

## გაშვება
```bash
npm install
npm run dev      # დეველოპმენტ სერვერი: http://localhost:5173
npm run build    # production ვერსია: dist/ საქაღალდეში
```

## GitHub-ზე ატვირთვა
```bash
git remote add origin https://github.com/<username>/georgia-travel.git
git push -u origin main
```

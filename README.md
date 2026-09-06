# راي لينك للتوريدات — الموقع الإلكتروني الرسمي
# RAI Link Supplies — Official Website

> حلول متكاملة للمشتريات والتوريد لقطاعات الأعمال في مصر  
> Integrated procurement & supply solutions for businesses across Egypt

---

## عن المشروع / About the Project

**RAI Link Supplies** is an Egyptian company specialising in integrated procurement and supply chain solutions. This repository contains the official company website — a bilingual (Arabic / English) single-page application built with Angular v21.

Arabic is the **primary language**: the site loads in Arabic by default with a right-to-left (`dir="rtl"`) layout. English is available as a **runtime toggle** — no page reload, no route prefix change — supporting full LTR layout switching via `dir="ltr"`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular v21 (standalone components · signals · new control flow) |
| Styling | Tailwind CSS v4 |
| Internationalisation | ngx-translate (`@ngx-translate/core`) |
| Animations | Angular Animations (`@angular/animations`) |
| Build | Angular CLI v21 + Vite builder |
| Language | TypeScript |

---

## Getting Started

### Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | 20.x LTS or later |
| npm | 10.x or later |
| Angular CLI | v21 (`npm i -g @angular/cli@21`) |

### Install

```bash
npm install
```

### Development server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app hot-reloads on source file changes.

### Production build

```bash
npm run build
# Output goes to /dist/rai-link-supplies/browser/
```

---

## Project Structure

```
src/
├── app/
│   ├── core/                    # Singleton services (LanguageService, etc.)
│   │   └── services/
│   ├── shared/                  # Reusable components, pipes, directives
│   │   └── components/
│   │       ├── header/          # Utility bar + main nav + mobile drawer
│   │       └── footer/
│   ├── features/                # Page-level feature modules
│   │   ├── home/                # Home page + all section components
│   │   ├── about/               # About Us page
│   │   ├── services/            # Services & How We Work page
│   │   ├── partners/            # Partners & Target Audience page
│   │   └── contact/             # Contact form + map page
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.ts
└── public/
    ├── i18n/
    │   ├── ar.json              # Arabic translations (default)
    │   └── en.json              # English translations
    └── images/
```

---

## Internationalisation (i18n)

The site uses **ngx-translate** for runtime language switching — no Angular built-in i18n (which requires separate builds per locale).

| Detail | Value |
|---|---|
| Default language | Arabic (`ar`) |
| Default direction | `rtl` |
| Toggle target | English (`en`) / `ltr` |
| Storage | `localStorage` key `rai-lang` |
| Translation files | `public/i18n/ar.json`, `public/i18n/en.json` |

**How it works:**
1. `index.html` ships with `<html dir="rtl" lang="ar">` — no flash of wrong layout on first paint.
2. `LanguageService` reads `localStorage` on app init; if a previously saved preference exists it applies it immediately.
3. On toggle, `LanguageService` calls `TranslateService.use()`, updates `document.documentElement.dir` and `lang`, and persists the choice.
4. All text strings are keyed in translation JSON files and referenced via `translate` pipe or `TranslateService.instant()`.

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Full company overview — all sections in condensed form |
| `/about` | About Us | Narrative · Mission · Vision · Values |
| `/services` | Services | Products (7 categories) · How We Work · Project Scope |
| `/partners` | Partners | Partners & Suppliers · Target Audience (3 segments) |
| `/contact` | Contact Us | Contact form · Info · Map |

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server at `localhost:4200` |
| `npm run build` | Production build to `/dist` |
| `npm test` | Run unit tests via Karma |
| `npm run lint` | Run ESLint |

---

## License

**Proprietary — RAI Link Supplies**  
All rights reserved. Unauthorised copying, distribution, or modification of this software is strictly prohibited.

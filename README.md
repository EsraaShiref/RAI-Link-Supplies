# RAI Link Supplies

![Angular](https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-not%20specified-lightgrey)

RAI Link Supplies is a bilingual, responsive corporate website for a B2B
procurement and general supplies company. It presents RAI Link's supply
capabilities, procurement expertise, target audiences, product categories, and
contact workflow through a modern Arabic-first user experience.

The current repository is the **frontend application only**. It does not
contain a backend API, database, authentication service, or production
quotation endpoint.

## Contents

- [Product overview](#product-overview)
- [Implemented features](#implemented-features)
- [Technology and architecture](#technology-and-architecture)
- [Application routes](#application-routes)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available commands](#available-commands)
- [Configuration and environment](#configuration-and-environment)
- [Quotation integration](#quotation-integration)
- [Quality and accessibility](#quality-and-accessibility)
- [Deployment](#deployment)
- [Backend status](#backend-status)

## Product overview

RAI Link Supplies provides a digital corporate presence for organizations
looking for reliable sourcing and procurement support. The site is designed to
help visitors:

- Understand the company's supply and procurement scope.
- Explore product and service categories.
- See how RAI Link serves government, corporate, educational, and healthcare
  organizations.
- Review the six-step procurement process.
- Submit a quotation request through the contact page.
- Switch between Arabic and English without a full-page reload.
- Use the site comfortably on desktop, tablet, and mobile devices.

## Implemented features

- **Bilingual experience:** Arabic and English dictionaries are loaded from
  `public/assets/i18n/ar.json` and `public/assets/i18n/en.json`.
- **RTL/LTR direction switching:** The document language, direction, and font
  class update with the selected language.
- **Responsive corporate pages:** Home, About, Services & Scope, Products,
  Partners, and Contact pages are available as lazy-loaded standalone
  components.
- **Supply and procurement presentation:** General procurement, IT and
  electronics, and specialized/project procurement areas are represented with
  translated content and local image assets.
- **Target audience section:** Partners includes alternating audience sections
  for government/public sector, corporate/private enterprise, and educational/
  healthcare institutions.
- **Products search:** The Products page filters translated category titles and
  descriptions on the client.
- **Six-step process flow:** Services & Scope presents request, quotation,
  purchase order, sourcing, delivery, and support steps.
- **Quotation form:** The Contact page includes a typed reactive form with
  validation for name, email, phone, category, quantity, and message.
- **Quotation states:** The form exposes idle, submitting, success, and error
  states and preserves entered data when submission fails.
- **Current quotation simulation:** Until an endpoint is configured, submission
  completes through a deliberate 900 ms simulated round trip.
- **Theme preference:** Light and dark themes are persisted in browser storage,
  with light mode as the default.
- **Persistent navigation shell:** Fixed header, responsive mobile drawer,
  footer, skip link, and global floating WhatsApp action.
- **Scroll and reveal interactions:** Scroll state, lazy/deferred content,
  skeleton placeholders, and reveal-on-scroll animations are implemented with
  Angular directives and signals.
- **SEO foundations:** Route metadata is translated through a custom title
  strategy and SEO service.
- **Local brand assets:** Logo, audience images, expertise images, favicon, and
  translation files are served from `public/`.
- **Accessibility foundations:** Semantic landmarks, labelled form controls,
  keyboard-friendly controls, focus handling, reduced-motion support, and
  accessible status/error messaging are included.

## Technology and architecture

### Frontend stack

- **Angular 21.2** standalone components and the Angular CLI application
  builder.
- **TypeScript 5.9** with strict compiler and strict Angular template
  checking.
- **Angular Router** with lazy `loadComponent` routes, scroll restoration, and
  anchor scrolling.
- **Angular Reactive Forms** for the quotation request workflow.
- **Signals and computed state** for language, theme, filtering, validation
  presentation, and derived UI state.
- **RxJS 7.8** for Angular HTTP and reactive integrations.
- **Tailwind CSS 4.3** through `@tailwindcss/postcss`.
- **Lucide Angular** for interface and feature icons.
- **Cairo** and **Plus Jakarta Sans** loaded in `src/index.html` for Arabic and
  English typography.

### Tooling

- Angular CLI `21.2.8`
- Angular build and development server
- ESLint 10 with `angular-eslint`
- Prettier 3
- Vitest 4 through the Angular unit-test builder
- npm 11.14.1, declared through the `packageManager` field

### Architectural approach

The application uses a feature-oriented, standalone Angular architecture:

- `core/` contains application-wide models, content, services, and navigation.
- `features/` contains route-level page components and feature-specific
  controls.
- `layout/` contains the application shell shared by every route.
- `shared/` contains reusable components, directives, and utilities.
- Route-level components are lazy loaded to keep the initial bundle focused on
  the shell.
- Static content is separated from presentation in typed content arrays and
  runtime translation dictionaries.
- Browser preferences are coordinated before first paint in `src/index.html`
  and then kept in sync by Angular services.

## Application routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Corporate overview, capabilities, values, audience preview, and calls to action |
| `/about` | About | Company overview and brand positioning |
| `/services-scope` | Services & Scope | Procurement scope, expertise areas, and six-step process |
| `/products` | Products | Searchable product and supply categories |
| `/partners` | Partners | Partner proposition, audience sections, and supplier placeholders |
| `/contact` | Contact | Contact details, map link, and quotation request form |
| `/target-audience` | Redirect | Redirects to `/partners` for compatibility with existing links |

## Project structure

```text
RAI-Link-Supplies/
├── public/
│   ├── assets/
│   │   ├── i18n/
│   │   │   ├── ar.json                 # Arabic runtime dictionary
│   │   │   └── en.json                 # English runtime dictionary
│   │   └── images/                     # Logo and procurement/audience imagery
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── content/                # Navigation, product, brand, and process data
│   │   │   ├── models/                 # Shared TypeScript interfaces and types
│   │   │   └── services/               # Translation, theme, SEO, scroll, quotation services
│   │   ├── features/
│   │   │   ├── about/
│   │   │   ├── contact/                # Contact page and quotation form
│   │   │   ├── home/
│   │   │   ├── partners/
│   │   │   ├── products/
│   │   │   ├── services-scope/          # Scope page and process timeline
│   │   │   └── target-audience/         # Legacy-compatible feature entry
│   │   ├── layout/
│   │   │   ├── cta-banner/
│   │   │   ├── footer/
│   │   │   └── header/
│   │   ├── shared/
│   │   │   ├── components/             # Reusable visual and interaction components
│   │   │   ├── directives/             # Reveal and scroll sentinel directives
│   │   │   └── utils/
│   │   ├── app.config.ts               # Global providers and router configuration
│   │   ├── app.routes.ts               # Lazy-loaded route definitions
│   │   └── app.ts                      # Root shell and document-level state
│   ├── index.html                      # Host document and pre-paint preferences
│   ├── main.ts                         # Angular bootstrap entry point
│   └── styles.css                      # Global Tailwind tokens and styles
├── angular.json                        # Angular CLI project and build targets
├── eslint.config.js                    # TypeScript and Angular lint rules
├── package.json                        # Scripts and dependencies
├── package-lock.json                   # Locked npm dependency graph
├── .postcssrc.json                     # Tailwind/PostCSS integration
├── tsconfig.json                       # Shared TypeScript compiler settings
├── tsconfig.app.json                   # Application TypeScript project
└── tsconfig.spec.json                  # Test TypeScript project
```

## Getting started

### Prerequisites

- Node.js compatible with Angular 21 (Node.js 20.19+ or 22.12+ is
  recommended).
- npm 11.14.1 or a compatible npm 11 release.
- Git.

No .NET SDK, database server, API credentials, or backend service is required
to run the current frontend repository.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EsraaShiref/RAI-Link-Supplies.git
   cd RAI-Link-Supplies
   ```

2. Install the locked dependency tree:

   ```bash
   npm ci
   ```

   Use `npm install` if you intentionally need npm to update the lockfile.

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:4200](http://localhost:4200).

The Angular development server watches the source tree and reloads when files
change.

## Available commands

| Command | Description |
| --- | --- |
| `npm start` | Start the Angular development server |
| `npm run build` | Create the production build in `dist/rai-link-supplies/` |
| `npm run watch` | Build continuously with the development configuration |
| `npm test` | Run the Angular unit-test target |
| `npm run lint` | Run ESLint for Angular and TypeScript sources |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check source formatting without changing files |

The repository currently does not include an end-to-end test script or
application test suites. The `test` target is configured through Angular's
unit-test builder and Vitest dependencies.

## Configuration and environment

There are currently no `.env` files or Angular environment files in the
repository. Runtime configuration is intentionally small:

- Translation dictionaries are loaded from `assets/i18n/ar.json` and
  `assets/i18n/en.json`.
- The selected language is stored under `localStorage` key `rai-lang`.
- The selected theme is stored under `localStorage` key `rai-theme`.
- The initial language and theme are applied by the pre-paint script in
  `src/index.html`.
- The contact map link is defined as `OFFICE_MAP_URL` in
  `src/app/core/content/navigation.ts`.
- The global WhatsApp action currently links to the configured business number
  in `WhatsappButtonComponent`.

When adding deployment-specific values, introduce Angular environment files or
an external configuration mechanism deliberately; do not commit secrets into
the public bundle.

## Quotation integration

Quotation form UX is implemented, but the repository currently uses a simulated
submission because `QUOTATION_ENDPOINT` is `null` in
`src/app/core/services/quotation.service.ts`.

To connect a real service:

1. Choose an owned API, form provider, or serverless function.
2. Replace the endpoint configuration in `QuotationService`.
3. Keep the existing typed `QuotationRequest` payload contract.
4. Configure CORS, validation, abuse protection, and error handling on the
   receiving service.
5. Do not place private API credentials in Angular source code.

The service is designed to POST the request with Angular's `HttpClient` once an
endpoint is supplied.

## Quality and accessibility

The project is configured with strict TypeScript and Angular template checks,
Angular ESLint rules, semantic HTML guidance, and accessibility template
rules. Notable implementation details include:

- Standalone components and Angular's modern control-flow syntax.
- Keyboard-accessible navigation and form controls.
- Skip-to-content link.
- Dynamic `lang` and `dir` attributes.
- Focus management for invalid quotation fields and successful submission.
- Reduced-motion media-query handling for animated components.
- Lazy loading, deferred content, and image loading hints.

Before opening a change, run:

```bash
npm run format:check
npm run lint
npm run build
```

## Deployment

Build the production application with:

```bash
npm run build
```

Deploy the generated browser files from:

```text
dist/rai-link-supplies/browser/
```

Because this is an Angular single-page application, configure the hosting
platform to serve `index.html` as the fallback for application routes such as
`/about` and `/contact`.

The production build includes hashed output assets and the static files from
`public/`.

## Backend status

There is no backend implementation in this repository. In particular, the
current codebase does not include:

- A .NET, Node, or other API project.
- Database migrations or schemas.
- Authentication or authorization.
- Server-side quotation persistence.
- CI/CD workflow files.
- Docker or container orchestration configuration.

Those capabilities can be added later behind the existing `QuotationService`
boundary without changing the contact form's public component API.

## License and ownership

No license file is currently included in the repository. Add a license before
distributing the source outside the owning organization.

# Ziad Shakhshir Factory — Storefront (Phase 1)

مصنع زياد الشخشير — A modern, **bilingual (Arabic RTL ⇄ English)**, fully responsive
storefront for a premium Palestinian furniture manufacturer (est. 1987).

Built with **Next.js (App Router) · TypeScript · SCSS Modules · Material UI Icons**,
with all data fetched via **Axios** from **JSON Server** (`db.json`). The architecture is
modular, DRY, and scalable so a later phase can swap the data layer for a real backend
(Node.js / Express / PostgreSQL / Prisma) **without changing the frontend**.

**Styling:** every component is styled by its own `*.module.scss` (locally scoped). Shared
design tokens live as CSS variables in `src/app/globals.scss`; repeated patterns are
factored into SCSS mixins in `src/styles/_mixins.scss` (`card`, `section`, `kicker`,
`icon-btn`, `field`, `job-chip`, …). Reusable `Button` and `Container` components remove
markup duplication.

**Data:** one Axios instance (`src/services/http.ts`) is used by `src/services/api.ts`,
which exposes typed `getX()` helpers and `submitApplication()`. Components never call
Axios directly.

---

## ✨ What's included (Phase 1 — public storefront)

- **Homepage**: hero slider, stats, 16 product categories, product catalog with
  live category filters, "Why choose us", a 10‑step manufacturing timeline,
  completed projects (with lightbox), testimonials, trusted clients, about, and a
  contact section (form + branches + map + WhatsApp).
- **Category pages** — `/categories/[id]` (browse products by category).
- **Product detail pages** — `/products/[id]` (with related products).
- **Bilingual** Arabic (default, RTL) ⇄ English (LTR) with a one‑click toggle
  (persisted in `localStorage`). Fonts switch automatically (Tajawal / Sora + Inter).
- **Careers / Jobs** — vacancies are served from JSON Server; if none are posted
  the section shows **"No vacancies currently"**. Each posting opens an application
  page (`/careers/[id]`) where applicants enter name, mobile, job title, cover
  letter and **upload a résumé** — the submission is saved to JSON Server under
  `/applications` (résumé stored as a base64 data URL for this phase).
- **Cart & checkout** — add to cart + slide‑out drawer → **checkout page** (`/checkout`,
  customer details + order summary) → the order is **POSTed to `/orders`** and the user
  lands on an **order‑confirmation page** (`/order/[id]`); the new order appears
  automatically in the admin **Orders** screen.
- **Admin dashboard** (`/admin`) — simulated login, a top‑bar **notification bell**
  (unread badge + dropdown surfacing new orders & applications), plus full management of
  **jobs**, **applications** (with résumé download), **orders** (status updates),
  **products**, **categories**, **staff**, and an **admin profile** (with picture upload) —
  all writing to JSON Server through the Axios `api` layer.

---

## 🚀 Quick start

```bash
# 1) Install dependencies
npm install

# 2) Run the app + the JSON Server API together
npm run dev
```

- App → http://localhost:3000
- API (JSON Server) → http://localhost:3001

`npm run dev` starts **both** the Next.js dev server and JSON Server (via
`concurrently`). The frontend reads data from `NEXT_PUBLIC_API_URL`
(see `.env.local`, defaults to `http://localhost:3001`).

> If `npm install` reports peer‑dependency conflicts on your npm version, run
> `npm install --legacy-peer-deps`.

### Individual scripts

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Next.js + JSON Server together (recommended) |
| `npm run web`   | Next.js dev server only                      |
| `npm run api`   | JSON Server only (`db.json` on port 3001)    |
| `npm run build` | Production build                             |
| `npm start`     | Run the production build                     |

> **Note:** the app fetches from JSON Server at request time, so the API must be
> running. Always use `npm run dev` (not just `next dev`) during development.

---

## 🗂 Project structure

```
ziad-shakhshir-factory/
├── db.json                     # JSON Server data (the whole content model)
├── .env.local                  # NEXT_PUBLIC_API_URL
├── public/                     # logo-mark.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx          # root layout (fonts, providers, navbar/footer)
│   │   ├── page.tsx            # homepage (composes all sections)
│   │   ├── globals.scss        # tokens (CSS vars), reset, fonts, keyframes
│   │   ├── categories/[id]/    # category listing page
│   │   ├── products/[id]/      # product detail page
│   │   └── careers/[id]/       # job details + application form
│   ├── components/             # one folder per component (Name/Name.tsx + index.ts)
│   │                           #   Navbar/ Hero/ Categories/ Catalog/ ProductCard/
│   │                           #   WhyChooseUs/ ManufacturingProcess/ CompletedProjects/
│   │                           #   Testimonials/ TrustedClients/ AboutSection/ Careers/
│   │                           #   JobApplicationForm/ ContactSection/ Footer/ CartDrawer/
│   │                           #   Button/ Container/ Logo/ Icon/ SafeImage/ Reveal/ ...
│   │                           # each: Name.tsx + Name.module.scss + index.ts
│   │                           # import as "@/components/<Name>" (resolves to index.ts)
│   ├── context/                # LanguageProvider, CartProvider
│   ├── hooks/                  # useLanguage, useCart
│   ├── services/               # http.ts (Axios instance) + api.ts (typed helpers)
│   ├── styles/                 # _variables.scss, _mixins.scss, detail.module.scss (shared)
│   ├── i18n/                   # translations.json + translations.ts (UI strings)
│   ├── lib/                    # cx (classNames) + format helpers (money, initials)
│   └── types/                  # TypeScript domain models
```

---

## 🌍 Internationalization & RTL

- UI chrome/labels live in `src/i18n/translations.json` (keyed `ar` / `en`).
- **Content** in `db.json` is bilingual per field: `name_ar`/`name_en`,
  `desc_ar`/`desc_en`, etc. Components pick the right field with the `tr()` helper
  from `useLanguage()`.
- The active language sets `<html lang dir>` and swaps the font stack. Arabic is
  the default and the layout is RTL out of the box.

---

## 🧱 Data model (`db.json`)

Resources exposed by JSON Server:

`company` (object) · `heroSlides` · `categories` · `products` · `whyChooseUs`
· `manufacturingSteps` · `projects` · `testimonials` · `clients` · `jobs`
· `applications` · `orders` · `admins` · `staff`

Useful endpoints:

```
GET  /categories
GET  /categories/3
GET  /products
GET  /products?categoryId=15    # products in a category
GET  /products/1
GET  /company
GET  /jobs                      # open vacancies (empty array -> "No vacancies currently")
GET  /jobs/2
POST /applications              # a submitted job application (name, mobile, résumé, ...)
```

Edit `db.json` to change content — the site reflects it on the next request.

---

## 🖼 Images

Hero, project, and careers images are bundled locally in `public/images/` and
referenced by path in `db.json` (e.g. `/images/hero-1.jpg`). Product and category
images reference remote CDN URLs. All are rendered with plain `<img>` and degrade
gracefully to a branded placeholder if a source ever fails. To use `next/image`
instead, add any remote hosts under `images.remotePatterns` in `next.config.ts`.

---

## 🔐 Admin dashboard

Visit **`/admin`** (or the "Admin Panel" link in the footer). Sign in with the seeded admin:

```
Email:    admin@shakhshir-factory.ps
Password: admin123
```

Auth is **simulated** for this phase (credentials checked against `/admins` on JSON
Server, session kept in `localStorage`). The dashboard lets the admin:

- **Notifications** — a bell in the admin top bar shows an unread count for new incoming
  **orders** and **job applications**. Opening the dropdown lists the most recent activity
  (each item links to Orders / Applications) and clears the badge. Unread state is tracked
  with a "last seen" timestamp in `localStorage`; the feed polls every 45s and on window focus.
  Brand-new items that arrive **while the admin is active** also pop up as small
  **toast notifications** (auto-dismiss, click to jump to the item). A single shared
  `AdminNotificationsProvider` runs one polling loop that feeds both the bell and the toasts.
- **Jobs** — create / edit / delete vacancies (bilingual) → reflected on the public Careers section.
- **Applications** — view submissions, download résumés, delete.
- **Orders** — view items, change status (new / processing / completed / cancelled), delete.
- **Products** — create / edit / delete products (price, currency, category select,
  featured flag, bilingual name/description/badge). The image can be **uploaded from your
  device** (stored as a base64 data URL, with live preview) or pasted as a URL → reflected
  in the storefront catalog.
- **Categories** — create / edit / delete (bilingual) → reflected across the storefront.
- **Staff** — add / edit / delete employees (name, position, department, contact, active status).
- **Profile** — the signed-in admin edits their name / email / phone and uploads a
  **profile picture** (stored as a base64 data URL); the sidebar shows their avatar.

Every change is written to JSON Server via the Axios `api` layer, so `db.json` updates live.

---

## 🛣 Roadmap (next phases)

1. **Payments & fulfilment** — online payment, coupons, delivery/tax, and email receipts on top of the existing checkout.
2. **Admin** — system settings and richer reporting (staff, profile, products, and image upload are already in).
3. **Real auth** — replace the simulated LocalStorage/`/admins` check with JWT/session
   auth (customer + admin), and real "forgot password" email.
4. **Real backend** — Node.js / Express / PostgreSQL / Prisma, replacing JSON
   Server by pointing `NEXT_PUBLIC_API_URL` at the new API.

---

## 📝 Notes

Company contact details, prices, and some catalog entries (products, projects,
client logos) are realistic **sample data** for this phase and are easy to edit in
`db.json`.

Resources
http://localhost:3001/company
http://localhost:3001/heroSlides
http://localhost:3001/categories
http://localhost:3001/products
http://localhost:3001/whyChooseUs
http://localhost:3001/projects
http://localhost:3001/testimonials
http://localhost:3001/clients
http://localhost:3001/orders
http://localhost:3001/jobs
http://localhost:3001/applications
http://localhost:3001/admins
http://localhost:3001/staff

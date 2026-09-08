# AGENTS.md — architecture notes for developers & AI agents

Quick orientation for anyone (human or agent) extending this project.

## Big picture
- **Next.js App Router + TypeScript + Tailwind + Material UI Icons.**
- **Data** comes from **JSON Server** (`db.json`) via a shared **Axios** instance
  (`src/services/http.ts`) wrapped by `src/services/api.ts`. Keep all data access in
  those two files so the backend can be swapped later (Node/Express/PostgreSQL/Prisma)
  by changing only `http.ts` (baseURL) / `api.ts` + `NEXT_PUBLIC_API_URL`.
- Pages are **server components** that fetch data and pass it to **client
  components** which handle language, interactivity, and rendering.
- Rendering is `force-dynamic` (data is read at request time). Run the API and web
  together with `npm run dev`.
- **Routes**: the storefront lives under `app/(site)/` (route group) with its own
  layout (Navbar/Footer/etc.). The **admin** lives under `app/admin/*` with a separate
  layout and NO storefront chrome. `app/layout.tsx` is just `<html>/<body>` + providers.
- **Admin auth** is simulated: `AdminAuthProvider` checks `/admins` via the Axios api
  and stores the session in `localStorage`; `AdminShell` guards pages + renders the
  sidebar. Admin CRUD (jobs/categories/orders/applications) writes through `api.ts`.

## Bilingual content (important)
- UI strings: `src/i18n/translations.json` (`ar` / `en`), typed via `translations.ts`.
- Data fields are bilingual with `_ar` / `_en` suffixes in `db.json`.
- In client components, get language with `useLanguage()`:
  - `t` → UI strings for the active language
  - `tr(obj, "name")` → picks `name_ar` or `name_en`
  - `lang`, `dir`, `toggle()`
- Default language is Arabic (RTL). `<html lang dir>` is updated by `LanguageProvider`.

## Adding content
- **A product**: add an object to `products` in `db.json` (bilingual fields,
  `categoryId`, `price`, `currency`, `image`, `featured`, optional `badge_*`).
- **A category**: add to `categories` (bilingual `name`/`desc`, `slug`, `image`).
- **A job/vacancy**: add to `jobs` in `db.json` (bilingual `title`/`type`/`location`/
  `department`/`desc` + `postedAt`). It appears in the Careers section and gets its
  own apply page at `/careers/{id}`. Empty the `jobs` array to show
  "No vacancies currently". Submitted applications land in `applications`.
- **An admin**: add to `admins` in `db.json` (`email` + `password`; optional `phone`,
  `avatar`) — used by the simulated login at `/admin/login` and the profile page.
- **A staff member**: managed from `/admin/staff` (resource `staff` in `db.json`).
- No code changes needed — the homepage catalog, category pages, careers, and
  filters pick it up automatically. Jobs, categories, and orders can also be managed
  from the admin dashboard at `/admin`.

## Conventions
- Each component lives in its **own folder**: `src/components/<Name>/<Name>.tsx`
  plus an `index.ts` that re-exports the default. Import components as
  `@/components/<Name>` (resolves to the folder's `index.ts`).
- Anything using hooks/interactivity starts with `"use client"`.
- Styling: **SCSS Modules only** — each component has `Name.module.scss` and uses
  `import styles from "./Name.module.scss"` + the `cx()` helper for conditional classes.
  Global tokens (CSS vars) + reset live in `src/app/globals.scss`; reuse shared patterns
  via mixins from `src/styles/_mixins.scss` (`@use "../../styles/mixins" as *;`) instead
  of copy-pasting rules. Don't re-declare buttons/containers — use `Button`/`Container`.
- Icons: use `Icon` (maps `db.json` icon keys → MUI icons) or import specific
  `@mui/icons-material/*Rounded` icons directly.
- Images: use `SafeImage` (graceful fallback on load error).

## Gotchas
- The site needs JSON Server running (`npm run dev` handles it).
- `params` in dynamic routes is a Promise (Next 15): `const { id } = await params;`.
- Don't hardcode strings in components — add them to `translations.json`.

<!-- SN-SCRIPTSYNC:BEGIN instructionsSchemaVersion=23 -->
<!-- apiVersion: 23 -->
<!-- Managed by the sn-scriptsync VS Code extension and refreshed automatically.
     This is only a small pointer to agentinstructions.md so this file stays tiny.
     Add your own notes OUTSIDE these markers — they are preserved across updates. -->

## ServiceNow Script Sync (sn-scriptsync)

This workspace uses the **sn-scriptsync** VS Code extension to sync ServiceNow
artifacts with local files and exposes a local HTTP Agent API for AI tools.

The full ServiceNow conventions, the Agent API reference, and the on-demand
skills live in [`agentinstructions.md`](agentinstructions.md). Read it before
working with ServiceNow artifacts or calling the Agent API.

@agentinstructions.md

<!-- SN-SCRIPTSYNC:END -->

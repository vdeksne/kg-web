# Kaspars Groza — portfolio site

Bilingual (Latvian / English) graphic design portfolio built with [Next.js](https://nextjs.org) (App Router).

## Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn / Base UI
- **Motion:** Framer Motion
- **Content:** JSON file (`content/site-content.json`) with optional [Supabase](https://supabase.com) persistence and storage (see `supabase/migrations`)
- **Validation:** Zod
- **Payments (optional):** Stripe
- **Docs / UI dev:** Storybook (`@storybook/nextjs-vite`)

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` (Supabase keys if you use the cloud CMS, strong `ADMIN_PASSWORD` and `ADMIN_SESSION_TOKEN` for `/admin`, Stripe keys if needed). See `.env.example` for all variables.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Unprefixed paths redirect to the default locale (`/lv`).

## Scripts

| Command                   | Description                                                 |
| ------------------------- | ----------------------------------------------------------- |
| `npm run dev`             | Development server                                          |
| `npm run build`           | Production build                                            |
| `npm run start`           | Run production server                                       |
| `npm run lint`            | ESLint                                                      |
| `npm run storybook`       | Storybook on [http://localhost:6006](http://localhost:6006) |
| `npm run build-storybook` | Static Storybook build (`storybook-static/`)                |

## Routing and locales

- Public pages live under **`/[locale]`** (`lv`, `en`), e.g. `/lv`, `/en/about`, `/en/portfolio`, `/en/contact`.
- **`/admin`** is the password-protected CMS (login at `/admin/login`).
- Locale behavior is handled in `src/middleware.ts`.

## Content and admin

- Default and merged content types live in `src/lib/site-content/`.
- Edits from the admin UI can be written to the repo JSON file and/or Supabase when configured.
- Image uploads can target local `public/` paths or Supabase Storage depending on setup.

## Fonts

Licensed **Gotham** `.woff2` files are expected under `public/fonts/` (see `public/fonts/README.txt`). The CSS falls back to locally installed Gotham names when files are missing.

## Contact form

Submissions post to `POST /api/contact`. Set **`RESEND_API_KEY`** and **`CONTACT_FROM_EMAIL`** (see [Resend](https://resend.com): verify your domain or use their test sender). Optional **`CONTACT_TO_EMAIL`** — comma-separated recipients; defaults to `info@kasparsgroza.lv`.

In **development**, if those variables are missing, the API still returns success and logs the payload to the terminal so you can test the form; **production** returns `503` until Resend is configured.

## Deploy

Configure the same environment variables on your host (e.g. [Vercel](https://vercel.com)). Run `npm run build` in CI before deploy.

# Ahmed Taher — Portfolio (Nuxt 4)

Senior Frontend Developer portfolio migrated from static HTML/CSS/JS to **Nuxt 4**.

- **App root:** `A:\Projects\myPortfolio` (this repo)
- **Legacy static site (preserved):** `legacy-static/` (original HTML/CSS/JS/GSAP + `img/`)
- **Sibling scaffold (optional duplicate):** `A:\Projects\myPortfolio-nuxt`
- **Live (current Vercel static):** https://my-portfolio-pied-delta.vercel.app/
- **CV:** `public/cv/Ahmed_Taher_Senior_Frontend_CV.pdf`

## Stack

Nuxt 4 · Vue 3 Composition API · TypeScript · Tailwind · GSAP + ScrollTrigger · SSR · Resend contact API

## Run locally

```bash
cd A:\Projects\myPortfolio
copy .env.example .env
npm install
npm run dev
```

Open http://localhost:3000

## Production

```bash
npm run build
npm run preview
```

## Environment

See `.env.example`:

- `NUXT_RESEND_API_KEY` — required for contact email delivery
- `NUXT_CONTACT_TO_EMAIL` — default `ahmedtaher4550@gmail.com`
- `NUXT_CONTACT_FROM_EMAIL` — verified Resend sender
- `NUXT_PUBLIC_SITE_URL` — canonical / OG URL

## Sections

Hero · About · Engineering Highlights · Technical Expertise · Experience (CV) · Projects (brief order + Mashawirk/Sumaya emphasis) · Contact · More work (Configurator)

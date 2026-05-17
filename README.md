# Arina Gusak — Portfolio

Single-page portfolio site built with Next.js 16 (App Router) + Tailwind CSS v4.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project structure

```
src/
├── app/
│   ├── globals.css      # tokens (background, accent, fonts)
│   ├── layout.tsx       # root layout + page metadata
│   └── page.tsx         # single scrolling page (hero → showreel → galleries → contact)
├── components/
│   ├── VideoCard.tsx    # thumbnail + hover state
│   └── VideoModal.tsx   # lightbox with platform-specific iframe
└── lib/
    └── projects.ts      # all video metadata + embed URL builder

public/
├── images/headshot.jpg  # extracted from the CV PDF
└── thumbnails/*.jpg     # extracted from the portfolio PDF
```

## Adding or editing work

All content lives in `src/lib/projects.ts`. To add a project:

1. Drop the thumbnail into `public/thumbnails/`.
2. Add a `Project` entry to the appropriate group with `platform`, `url`, and `thumbnail`.

`embedUrl()` handles YouTube and Google Drive automatically — Instagram links open externally because IG blocks inline embedding without their (heavy) JS SDK.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to <https://vercel.com/new>, import the repo.
3. Framework preset auto-detects as Next.js — accept defaults and deploy.

No environment variables needed. Both pages prerender statically.

## Tech notes

- Tailwind v4 (CSS-first config in `globals.css` via `@theme inline`)
- `next/image` for headshot and thumbnails (auto-optimized)
- `next/font` for Geist (body) and Fraunces (display serif)
- Page is a single client component to keep the modal state simple — for a portfolio this size, the tradeoff is fine.

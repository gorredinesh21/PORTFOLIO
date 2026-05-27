# portfolio

My personal portfolio website. A multi-page site with a terminal / developer aesthetic — sticky `$` prompt nav, JetBrains Mono, GitHub-dark palette, typewriter hero, and per-project case study pages.

Live at: _(deploying soon)_

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- JetBrains Mono via `next/font`
- `lucide-react` for icons + inline SVGs for brand marks
- `framer-motion`, `clsx`, `tailwind-merge`

## Pages

- `/` — hero, featured projects, quick contact
- `/about` — background, philosophy, education, achievements
- `/experience` — current and past roles
- `/projects` — index of all projects
- `/projects/[slug]` — per-project case study (problem, approach, highlights, metrics)
- `/skills` — categorised tech stack
- `/contact` — contact info + availability

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Editing content

All site content (name, contact, about copy, experience, projects, skills) lives in [`lib/data.ts`](lib/data.ts). Edit that one file to update anything text-related on the site — no component changes needed.

To add a new project, append an entry to the `projects` array in `lib/data.ts`. The dynamic route `/projects/[slug]` and `generateStaticParams` will pick it up automatically.

## Project structure

```
app/
  layout.tsx          # root layout, fonts, nav + footer
  page.tsx            # home
  globals.css         # tailwind v4 @theme + custom CSS (terminal palette, CRT effect)
  about/              # /about
  experience/         # /experience
  projects/
    page.tsx          # /projects index
    [slug]/page.tsx   # /projects/<slug> detail
  skills/             # /skills
  contact/            # /contact
components/
  nav.tsx, footer.tsx
  terminal-window.tsx # ASCII-style window chrome
  page-header.tsx     # $ command-prompt page header
  section-card.tsx    # filename-tagged card
  project-card.tsx, tag.tsx
  typewriter.tsx      # client component, animated hero
  brand-icons.tsx     # inline SVGs for github/linkedin
lib/
  data.ts             # all site content
  utils.ts            # cn() helper (clsx + tailwind-merge)
public/
  GORRE_DINESH_CV.pdf
```

## Notes

- Tailwind v4 has no `tailwind.config.ts` — theme tokens live in `app/globals.css` under `@theme inline { ... }`.
- Dynamic-route `params` are a `Promise` in Next.js 16 (`const { slug } = await params`).
- `lucide-react@1.x` dropped brand icons, so GitHub and LinkedIn marks are inline SVGs in `components/brand-icons.tsx`.

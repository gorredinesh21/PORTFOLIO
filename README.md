# Portfolio

Personal portfolio of **Gorre Dinesh Chandan Reddy** — a software engineer working across
**Generative AI, full-stack web, and data**. A multi-page site with a clean, modern SaaS
aesthetic: a light theme with an animated colour-orb background, indigo/rose/teal accents,
smooth page transitions, and per-project case-study pages.

Live at: https://portfolio-eight-coral-tabh47k4e7.vercel.app

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4 (`@theme inline`, no config file)
- Fonts: **Inter** (UI) + **JetBrains Mono** (code accents) via `next/font`
- `framer-motion` for reveal + page-transition animations
- `lucide-react` for icons + inline SVGs for brand marks
- `clsx`, `tailwind-merge`

## Design

- **Light, modern SaaS** look — bold Inter headings, generous whitespace, rounded cards.
- **Animated background** — a soft gradient wash plus three slowly-floating, blurred colour
  orbs (indigo, rose, teal) so the page is never flat white. Respects `prefers-reduced-motion`.
- **Colour-coded project domains** — every project is tagged (`GenAI`, `Full-Stack`, `ML / DL`,
  `Web3`, `Systems`) and the projects page has interactive filter tabs.
- **Motion** — blur-in scroll reveals, animated page transitions, gradient-shifting buttons,
  and a gradient hover sheen on cards.

## Pages

- `/` — hero (animated typing), the three-domain "what I do" story, featured projects, stats, CTA
- `/about` — background, how I work, current focus, education, achievements
- `/experience` — current and past roles
- `/projects` — all projects with domain filter tabs
- `/projects/[slug]` — per-project case study (problem, approach, highlights, metrics)
- `/skills` — categorised tech stack
- `/contact` — contact channels + availability

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

All site content (name, contact, about copy, experience, projects, skills) lives in
[`lib/data.ts`](lib/data.ts). Edit that one file to update anything text-related — no
component changes needed.

To add a new project, append an entry to the `projects` array in `lib/data.ts` (include a
`domain` and optional `featured: true`). The dynamic route `/projects/[slug]` and
`generateStaticParams` pick it up automatically, and the domain filter updates itself.

## Project structure

```
app/
  layout.tsx          # root layout, fonts, animated background, nav + footer
  template.tsx        # per-route enter animation (page transitions)
  page.tsx            # home
  globals.css         # tailwind v4 @theme + custom CSS (SaaS palette, orbs, motion)
  about/              # /about
  experience/         # /experience
  projects/
    page.tsx          # /projects index
    [slug]/page.tsx   # /projects/<slug> detail
  skills/             # /skills
  contact/            # /contact
components/
  background.tsx      # fixed animated colour-orb background
  nav.tsx, footer.tsx
  reveal.tsx          # framer-motion blur-in scroll reveal
  typing-roles.tsx    # animated hero typing
  page-header.tsx     # eyebrow + bold title page header
  section-card.tsx    # rounded content card
  project-card.tsx    # project card with domain badge
  project-gallery.tsx # client filterable project grid
  domain-badge.tsx    # colour-coded project domain badge
  tag.tsx             # pill/tag
  brand-icons.tsx     # inline SVGs for github/linkedin
lib/
  data.ts             # all site content + Domain type
  utils.ts            # cn() helper + domain colour styles
public/
  Gorre_Dinesh_Chandan_Reddy_Resume.pdf
```

## Notes

- Tailwind v4 has no `tailwind.config.ts` — theme tokens live in `app/globals.css` under
  `@theme inline { ... }`.
- The `<body>` background is transparent so the fixed colour-orb layer shows through.
- Dynamic-route `params` are a `Promise` in Next.js 16 (`const { slug } = await params`).
- `lucide-react@1.x` dropped brand icons, so GitHub and LinkedIn marks are inline SVGs in
  `components/brand-icons.tsx`.

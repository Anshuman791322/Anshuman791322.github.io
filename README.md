# Anshuman Singh — Portfolio

A premium, motion-rich single-page portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion and Lenis. Statically exported and ready for GitHub Pages.

## Stack

- **Next.js 15** (App Router) with `output: "export"` for static hosting
- **React 19 + TypeScript**
- **Tailwind CSS v4** + a custom design-token layer in `app/globals.css`
- **Framer Motion** for animation (with `LazyMotion` + `domAnimation` for a smaller bundle)
- **Lenis** for smooth scrolling
- **lucide-react** for iconography

## Local development

```bash
cd portfolio
npm install
npm run dev
```

Open <http://localhost:3000>.

Run the full verification before deployment:

```bash
npm run verify   # lint + build
```

The static export will be in `portfolio/out`.

## Where to edit your content

All copy, links, skills, timeline and projects live in **one typed file**:

| What | File |
|---|---|
| Name, role, bio, email, GitHub, availability | [`data/portfolio.ts`](data/portfolio.ts) → `portfolio.person` |
| Hero stat cards (count-up) | `portfolio.stats` |
| Skill groups (chips) | `portfolio.skills` |
| Timeline / journey | `portfolio.timeline` |
| Bento project cards (incl. accent + grid span) | `portfolio.projects` |
| "Notes from the workbench" rail | `portfolio.experiments` |
| Social/contact links | `portfolio.socials` |
| Portrait image | [`public/portrait.jpg`](public/portrait.jpg) — replace with your own (4:5 portrait works best) |
| Page title / meta | [`app/layout.tsx`](app/layout.tsx) |

Design tokens (colours, glass, blur radii) live in [`app/globals.css`](app/globals.css) under the `:root` block.

Motion language (easings, springs, shared variants) lives in [`lib/motion.ts`](lib/motion.ts).

## Design direction

- Palette: midnight navy `#0B1220`, cobalt blue `#4A90FF` (with `#7DB7FF` / `#245DFF`), burnt orange `#FF8A3D` (with `#FFB36A`).
- Glass surfaces use `rgba(15, 23, 42, 0.56)` for primary glass, `rgba(17, 24, 39, 0.72)` for strong glass, and a 12px backdrop blur on the sticky nav.
- Motion respects `prefers-reduced-motion` — the intro splash, custom cursor, ambient orbs, hero spotlight and parallax all defer to a fade-only experience when requested.
- The custom cursor only mounts on `(hover: hover) and (pointer: fine)` devices; touch users get the native cursor.

### Stitch design reference

The visual language was authored in [Google Stitch](https://stitch.withgoogle.com/) before the React build:

- Project: `projects/11795861637911762179` — *Cobalt × Burnt Orange*
- Design system: `assets/990860009263511179`
- Screens: Hero · Projects Bento · Contact CTA

Saved screenshots + static HTML mockups live in [`docs/stitch/`](docs/stitch/README.md). The React implementation matches the Stitch frames pixel-for-token and adds the full motion system on top.

## Deploying to GitHub Pages

A workflow is provided at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It uses the official actions: `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`.

### 1. Push this `portfolio/` folder as its own repository

The workflow expects `portfolio/` to be the repo root (so `package.json` sits at the top). Two ways:

- **Clean repo** (recommended): create a new GitHub repo, then push only the contents of `portfolio/` to it.
- **Existing repo**: if `portfolio/` lives inside a larger workspace, copy the folder out before pushing.

### 2. Enable Pages

In your repo on github.com → Settings → Pages → **Build and deployment** → set source to **GitHub Actions**.

### 3. Push to `main`

The workflow runs on every push to `main` (and on manual dispatch). It builds the static export and publishes the `out/` directory.

### Subpath vs. root deployment

`next.config.ts` figures out `basePath` automatically:

- **Project page** (`username.github.io/my-portfolio`) → `basePath = "/my-portfolio"` (derived from `GITHUB_REPOSITORY`).
- **User/organisation page** (`username.github.io`) → no `basePath` — the repo name ends in `.github.io` so it's detected as a user site.
- **Local dev** → no `basePath`.

If you fork the repo under a different name, you don't need to change anything — the workflow re-derives the path on each build.

### Custom domain

1. Add the domain in repo Settings → Pages → Custom domain.
2. Create a `CNAME` file in `public/` containing your domain on a single line (e.g. `anshuman.dev`). It will be copied to `out/CNAME` automatically by Next.js.
3. The `basePath` block in `next.config.ts` won't apply (no `GITHUB_REPOSITORY` subpath in this case), which is what you want for a custom domain.

## Accessibility & performance notes

- All interactive surfaces have `:focus-visible` styles (orange outline).
- Hover-only details on project cards are also surfaced inside the modal (which is keyboard-reachable and `Enter`/`Space` openable).
- Images use `next/image` with `unoptimized: true` for static-export safety.
- Fonts are self-hosted via `next/font` (Manrope for body, Space Grotesk for display).
- `LazyMotion` keeps Framer Motion's bundle slim.

## Project layout

```
portfolio/
├─ app/
│  ├─ globals.css         # Design tokens + all visual styling
│  ├─ layout.tsx          # Fonts + metadata
│  ├─ page.tsx            # Renders <PortfolioSite />
│  └─ not-found.tsx       # Custom 404
├─ components/
│  ├─ PortfolioSite.tsx   # Main orchestrator (sections inline)
│  ├─ sections/
│  │  └─ ProjectCard.tsx  # Bento card with hover-reveal + actions
│  └─ ui/
│     ├─ AmbientOrbs.tsx
│     ├─ CountUp.tsx
│     ├─ CustomCursor.tsx
│     ├─ IntroSplash.tsx
│     ├─ Magnetic.tsx
│     └─ SectionDivider.tsx
├─ data/portfolio.ts      # ← edit your content here
├─ hooks/
│  ├─ useLenis.ts
│  └─ useScrollSpy.ts
├─ lib/motion.ts          # Shared easings, springs, variants
├─ public/portrait.jpg    # ← replace with your portrait
├─ next.config.ts         # Static export + auto basePath
└─ .github/workflows/deploy.yml
```

## Security

- No secrets are bundled or read at build time.
- The contact form uses a plain `mailto:` link — no third-party form services.
- All external links open with `rel="noreferrer"`.

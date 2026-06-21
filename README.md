# Anshuman Singh — Portfolio (v3 · Dark Academia × Glass)

A cinematic, server-first single-page portfolio. Self-hosted Fontshare type, Anime.js entrance reveals, CSS pseudo-isometric depth — all on a static export deployed to GitHub Pages.

Live: <https://anshuman791322.github.io>

## Stack

- **Next.js 15** App Router with `output: "export"` (static)
- **React 19 + TypeScript** — most sections are server components, JS only ships from the four client islands listed below
- **Tailwind CSS v4** + a custom design-token layer in `app/globals.css`
- **Anime.js** for scoped, IntersectionObserver-driven entrance reveals + count-up + one magnetic CTA
- **Lucide React** for icons (MIT)
- **Self-hosted Fontshare** fonts (Gambetta + General Sans, free)

No Framer Motion, no Lenis, no intro splash, no custom cursor — see the v2→v3 changes below.

## What's in this redesign (v2 → v3)

| Out | In | Why |
|---|---|---|
| Framer Motion (~50 kB) | Anime.js (~7 kB) | Brief asked for Anime.js + scoped, minimal motion JS |
| Lenis (~15 kB) | Native `scroll-behavior: smooth` | One less library; same UX |
| `IntroSplash` overlay | Removed | Was delaying perceived load |
| `CustomCursor` global pointer tracker | Removed | Global pointer handler hurt mobile + a11y |
| Hero mouse-spotlight | Removed | Same reason as cursor |
| 600-line client `PortfolioSite.tsx` | 10 RSC sections + 4 client islands | Hydration cost drops; LCP path is pure HTML |
| Bento grid | Editorial hover-preview list **with CSS perspective depth on desktop**, flat on tablet/mobile | Brief asked for pseudo-isometric, mobile flatten |
| Vague one-word nav | Numbered editorial labels (`01 About / 02 Track Record / 03 Stack / 04 Selected Work / 05 Workbench / 06 Contact`) | Brief flagged the old labels as vague |
| Manrope + Space Grotesk (Google CDN) | **Gambetta + General Sans** self-hosted | Dark Academia voice + self-hosted = faster + no CDN dependency |
| Stats animated by Framer | Animated by Anime.js with real values in static HTML | Audit flagged placeholder zeros in rendered output |

### Server-first split

| Component | Where | Hydrates? |
|---|---|---|
| `app/page.tsx` | RSC | no |
| `components/sections/Hero.tsx` | RSC | no (children hydrate) |
| `components/sections/Stats.tsx` | RSC | no (CountUp hydrates) |
| `components/sections/About.tsx` | RSC | no (Reveal hydrates) |
| `components/sections/TrackRecord.tsx` | RSC | no |
| `components/sections/Stack.tsx` | RSC | no |
| `components/sections/MarqueeBand.tsx` | RSC | no — pure CSS `@keyframes` |
| `components/sections/SelectedWork.tsx` | RSC | no (ProjectShowcase hydrates) |
| `components/sections/Workbench.tsx` | RSC | no |
| `components/sections/Contact.tsx` | RSC | no |
| `components/sections/Footer.tsx` | RSC | no |
| `components/Nav.tsx` | client | scroll spy + mobile menu |
| `components/sections/ProjectShowcase.tsx` | client | hover-preview + modal |
| `components/ui/Reveal.tsx` | client | IntersectionObserver + Anime.js entrance |
| `components/ui/CountUp.tsx` | client | Anime.js scalar |
| `components/ui/MagneticCTA.tsx` | client | desktop-only, gated, one CTA |

## External assets used (and why each is free-policy safe)

### Fontshare — Gambetta + General Sans
Both fonts are part of Fontshare's 100% free type catalogue (creator: Indian Type Foundry).
- **Gambetta** — display serif. Carries the Dark Academia editorial voice.
- **General Sans** — modern geometric sans for UI and body.
- WOFF2 files self-hosted at `public/fonts/` (~150 KB total). Loaded via `next/font/local` with `display: swap`. **No CDN dependency at runtime.**
- Pair chosen over Technor + Supreme because Gambetta's transitional serif anchors the Dark Academia mood; Technor reads brutalist/tech and conflicts with the "considered, expensive" tone.

### Anime.js (v3.2.x, MIT)
- Modular import (`import anime from "animejs"`) — only used inside three client islands (Reveal, CountUp, MagneticCTA, ProjectShowcase).
- ~7 KB gzipped. Replaces Framer Motion entirely.

### Lucide React (MIT)
- Tree-shaken icon set; only the icons referenced (`ArrowDown`, `ArrowUpRight`, `Github`, `Mail`, `Menu`, `X`, `ExternalLink`) are bundled.

### React Bits patterns — *recreated by hand*
- Split-text hero reveal, tilt/glass card, magnetic CTA — implemented here from scratch in `Reveal.tsx`, `MagneticCTA.tsx`, and the CSS for `.work-row` + `.identity-card`.
- I do not import React Bits components directly; this eliminates any ambiguity about license terms on individual patterns.

### Iconsax — *deliberately not used*
- The animated-icon set has unclear free status on individual exports. Lucide React (MIT) plus hand-rolled Anime.js gives the same outcome with provable MIT licensing.

## Performance posture

- **First Load JS: 118 kB** (route page 11.8 kB). For comparison, v2 was 159 kB / 56 kB.
- Static export, HTTPS-enforced, served from GitHub Pages CDN.
- Fonts self-hosted with `font-display: swap` — no FOIT.
- Above-the-fold portrait is `<picture>` with AVIF (2.7 KB), WebP (10.6 KB), JPG (52 KB) fallback. `fetchpriority="high"` set on the JPG fallback to lock in the LCP candidate.
- No Framer Motion, no Lenis, no continuous JS animation loops. Marquee is pure CSS.
- Reduced-motion: ambient CSS keyframes are slowed (not killed); JS islands defer to static content.
- Real stat values render in the static HTML so SEO + audit tools see `5`, `4`, `2022`, `100%` — not zeros.

### Verifying Lighthouse / PSI locally

```bash
npm run verify   # lint + build
npx serve out -p 4173
# In another shell:
npx lighthouse http://localhost:4173 --view --preset=desktop
npx lighthouse http://localhost:4173 --view --form-factor=mobile --throttling.cpuSlowdownMultiplier=4
```

Or run `https://pagespeed.web.dev/?url=https://anshuman791322.github.io` directly against the live URL.

## Accessibility

- WCAG AA contrast on body text (muted bumped to `#D4DDE9`, secondary muted to `#9AA9BF`).
- Numbered nav labels are scanned with both the number and the word — clearer than the old one-word labels.
- The high-contrast primary CTA uses a solid orange gradient, not a low-contrast outline.
- Reduced-motion fully respected — `Reveal` and `CountUp` short-circuit on the user's first paint; CSS keyframe ambient is slowed.
- All hover-only details on the showcase rows are also reachable via keyboard (`Tab` to row, `Enter` to open modal). Modal closes on `Esc` and on backdrop click.
- Focus-visible outlines: 2 px orange-soft, 4 px offset.

## Local development

```bash
cd portfolio
npm install
npm run dev      # http://localhost:3000
npm run verify   # lint + build
```

## Editing content

All content lives in one typed file: `data/portfolio.ts`.

- `portfolio.person` — name, role, tagline, bio, location, email, GitHub, handle.
- `portfolio.nav` — numbered nav items (`{ id, index, label }`).
- `portfolio.stats` — animated count-up values.
- `portfolio.skills` — grouped stack chips.
- `portfolio.timeline` — track-record entries.
- `portfolio.projects` — the 5 public repos in the showcase.
- `portfolio.marquee` — strings for the ticker band.
- `portfolio.experiments` — workbench rail.

Replace `public/portrait.jpg` (and `portrait.avif`, `portrait.webp` for modern formats) with your own image.

## Project layout

```
portfolio/
├─ app/
│  ├─ globals.css           # Dark Academia × Glass design system
│  ├─ layout.tsx            # Self-hosted fonts + metadata
│  ├─ page.tsx              # Server composition (RSC)
│  └─ not-found.tsx
├─ components/
│  ├─ Nav.tsx               # client island — scroll spy + mobile menu
│  ├─ sections/             # all RSC except ProjectShowcase
│  │  ├─ Hero.tsx
│  │  ├─ Stats.tsx
│  │  ├─ About.tsx
│  │  ├─ TrackRecord.tsx
│  │  ├─ Stack.tsx
│  │  ├─ MarqueeBand.tsx
│  │  ├─ SelectedWork.tsx
│  │  ├─ ProjectShowcase.tsx    # client island
│  │  ├─ Workbench.tsx
│  │  ├─ Contact.tsx
│  │  └─ Footer.tsx
│  └─ ui/
│     ├─ Reveal.tsx         # client — IntersectionObserver + Anime.js
│     ├─ CountUp.tsx        # client — Anime.js scalar
│     └─ MagneticCTA.tsx    # client — gated to desktop + no reduce-motion
├─ data/portfolio.ts        # ← all content edits go here
├─ hooks/                   # (empty — useLenis / useScrollSpy retired)
├─ lib/anime.ts             # motion tokens (easings, durations, reduced-motion check)
├─ public/
│  ├─ fonts/                # self-hosted Gambetta + General Sans WOFF2
│  ├─ portrait.avif/webp/jpg
│  └─ ...
├─ next.config.ts           # static export + auto basePath
└─ .github/workflows/deploy.yml
```

## Deploying to GitHub Pages

Pushes to `main` redeploy automatically via `.github/workflows/deploy.yml` using `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`. Pages source must be set to **GitHub Actions** in repo settings.

For a custom domain, drop a `CNAME` file into `public/`.

## Security

- No secrets bundled or read at runtime.
- No third-party form services, no analytics scripts, no remote font CDN at runtime.
- All external links open with `rel="noreferrer"`.

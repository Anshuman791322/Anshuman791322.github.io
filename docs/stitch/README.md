# Stitch design reference

These screens were generated in Google Stitch (`stitch.withgoogle.com`) and used as the visual reference for the React implementation. The implementation in `components/PortfolioSite.tsx` faithfully reproduces — and motion-extends — what's pictured here.

## Project & design system

| Asset | ID |
|---|---|
| Project | `projects/11795861637911762179` — "Anshuman Singh Portfolio — Cobalt × Burnt Orange" |
| Design system | `assets/990860009263511179` — "Cobalt × Burnt Orange — Portfolio System" |

The design system encodes the full token sheet from the brief:

- Color mode: Dark, vibrant
- Primary: `#4A90FF` cobalt · Secondary: `#FF8A3D` burnt orange · Tertiary: `#7DB7FF` soft cobalt · Neutral: `#0B1220` midnight navy
- Headline font: Space Grotesk · Body font: Manrope
- Roundness: 12 (cards 18 px, buttons 12 px, chips 999 px)
- A full `design.md` markdown attached with palette rules, glassmorphism rules, motion language, and layout tokens

## Screens

| Screen | ID | Source |
|---|---|---|
| Portfolio Hero | `screens/ae510a58958e446498261f45c57ffd49` | [hero.png](./hero.png) · [hero.html](./hero.html) |
| Projects Grid (Bento) | `screens/dbaec3761a614ee7b614179d682d41cd` | [projects-bento.png](./projects-bento.png) · [projects-bento.html](./projects-bento.html) |
| Contact + Footer | `screens/2ed36e9fd1dc4186b6248dd0633a2275` | [contact-cta.png](./contact-cta.png) · [contact-cta.html](./contact-cta.html) |

The `.html` files are static Stitch mockups; the `.png` files are reference screenshots.

## What the React build adds over the Stitch mockups

Stitch is a static-design tool — these screens are reference frames. The React implementation layers on the motion system the brief asked for:

| Layer | Where |
|---|---|
| Intro splash overlay (Esc/click/auto-dismiss, sessionStorage-gated) | `components/ui/IntroSplash.tsx` |
| Sticky glass nav with `layoutId` active indicator | `components/PortfolioSite.tsx` |
| Custom cursor (hover+fine pointer only, spring-tracked) | `components/ui/CustomCursor.tsx` |
| Ambient drifting orbs (transform-only, reduced-motion aware) | `components/ui/AmbientOrbs.tsx` |
| Hero mouse-follow spotlight | `.spotlight` block inside `PortfolioSite.tsx` |
| Magnetic hover on buttons / chips / nav CTA | `components/ui/Magnetic.tsx` |
| Stats `CountUp` from 0 on inView | `components/ui/CountUp.tsx` |
| Animated SVG section dividers with `pathLength` draw | `components/ui/SectionDivider.tsx` |
| Timeline spine SVG with gradient stroke + `pathLength` | inline in `PortfolioSite.tsx` |
| Project card → modal **shared-element** transition | `layoutId="project-…"` in `ProjectCard.tsx` |
| Reduced-motion fallbacks across every animated layer | `useReducedMotion()` everywhere |

The palette, glass surface rules, typography, and section layout are an exact match to the Stitch reference.

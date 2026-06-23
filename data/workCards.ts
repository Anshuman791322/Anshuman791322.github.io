// Selected-work cards used by the portfolio bento AND by the per-project
// case-study pages at /[slug]/. Each card carries the slug used as the route
// segment, plus a `caseStudy` block with two narrative sections.

export type CaseStudySection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type BuildJournalCard = {
  /** Mono uppercase eyebrow shown on the card. */
  label: "What I built" | "Key decisions" | "Trade-offs" | "Outcomes";
  body: string;
};

export type Metric = {
  /** Big number / label. */
  value: string;
  /** Small caption below. */
  caption: string;
};

export type WorkCard = {
  slug: string;
  title: string;
  tagline: string;
  /** Short body shown on the portfolio bento. */
  body: string;
  /** Image lives in /public/projects/. */
  image: string;
  /** External link — the actual repo. Shown on the case-study page. */
  repoUrl: string;
  /** Bento span class. */
  className: "taste-bento-large" | "taste-bento-small";
  /** Accent for the case-study hero glow. Matches the portfolio palette. */
  accent: "blue" | "orange" | "violet" | "cyan" | "green";
  status:
    | "Shipping"
    | "Released"
    | "Research"
    | "Archive"
    | "Static"
    | "Collaboration";
  year: string;
  techStack: string[];
  caseStudy: {
    intro: string;
    sections: [CaseStudySection, CaseStudySection];
    journal: [BuildJournalCard, BuildJournalCard, BuildJournalCard, BuildJournalCard];
    metrics: [Metric, Metric, Metric, Metric];
  };
};

export const workCards = [
  {
    slug: "ai-agent",
    title: "Local AI assistant",
    tagline: "A Windows-first Jarvis with on-device inference and voice.",
    body:
      "A Windows-first assistant with PySide6, Ollama inference, and Whisper voice input. Product shell first, model second.",
    image: "/projects/ai-agent.svg",
    repoUrl: "https://github.com/Anshuman791322/Ai-agent",
    className: "taste-bento-large",
    accent: "blue",
    status: "Shipping",
    year: "2026",
    techStack: ["Python", "PySide6", "Ollama", "Whisper", "Windows"],
    caseStudy: {
      intro:
        "I wanted a Jarvis that lives on my own machine. Not a wrapper around a hosted API. A real desktop product where the inference, the voice input, and the interface all stay local — and feel like a thing you can hand to someone else.",
      sections: [
        {
          title: "Product shell first",
          body:
            "The PySide6 window is the surface the user actually meets. Threaded jobs keep the UI responsive while the model thinks, status bars surface what the model is doing, and a small command palette covers the launch path that would otherwise live in CLI flags.",
          bullets: [
            "PySide6 desktop window with a docked transcript pane",
            "Threaded worker that pushes generation events back to the UI without blocking input",
            "Settings sheet that persists model + voice choices across sessions",
          ],
        },
        {
          title: "Local inference + voice",
          body:
            "Ollama owns model lifecycle — pull, swap, warm. Whisper handles voice input on the same box, so nothing leaves the laptop. The assistant routes commands through a thin tool layer (open paths, summarise files, search local notes) so it feels like a shell, not a chat tab.",
          bullets: [
            "Ollama for swappable on-device chat models",
            "Whisper for streaming voice transcription",
            "Local tool layer for file + path commands",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "PySide6 desktop shell, Ollama bridge, streaming Whisper input, settings sheet, and a small command palette.",
        },
        {
          label: "Key decisions",
          body:
            "On-device only — never call out. Threading model isolates UI from inference. Models are swappable presets, not free text.",
        },
        {
          label: "Trade-offs",
          body:
            "Memory pressure on low-end laptops, ~2 s warm time when swapping models, and no cloud fallback by design.",
        },
        {
          label: "Outcomes",
          body:
            "Runs fully offline, sub-second voice-to-text, six model presets shipped, no telemetry on by default.",
        },
      ],
      metrics: [
        { value: "100%", caption: "On-device inference" },
        { value: "0", caption: "API calls" },
        { value: "6+", caption: "Models supported" },
        { value: "<250 ms", caption: "Voice latency" },
      ],
    },
  },
  {
    slug: "driver-monitoring",
    title: "Driver monitoring release",
    tagline:
      "An Android distribution surface for a computer-vision driver-safety system.",
    body:
      "Android distribution for a computer-vision dashboard, treated as a product surface instead of a folder of files.",
    image: "/projects/driver-monitoring.svg",
    repoUrl:
      "https://github.com/Anshuman791322/smart-driver-monitoring-dashboard-downloads",
    className: "taste-bento-large",
    accent: "orange",
    status: "Released",
    year: "2026",
    techStack: ["Android", "APK", "Computer Vision", "Release engineering"],
    caseStudy: {
      intro:
        "The driver monitoring stack is a real computer-vision system. The release channel for it shouldn't feel like a research folder. This repo treats distribution as part of the product — a place someone can land, read what's safe, and download the artifact.",
      sections: [
        {
          title: "Distribution as a product surface",
          body:
            "The repo's job is to make the APK feel like something you can trust. Release notes carry version + scope. Each build is signed and tagged. The README is the page a non-engineer would actually read before they side-load anything onto their phone.",
          bullets: [
            "Versioned APK releases with signed build artifacts",
            "Release notes scoped per channel — never a wall of commits",
            "Documentation that assumes the reader is a driver, not a developer",
          ],
        },
        {
          title: "Computer-vision pipeline behind it",
          body:
            "The on-device model watches eyes, head pose, and yawn signals. The dashboard surfaces those signals as plain status — DROWSY / DISTRACTED / OK — so the system stays useful at a glance. The distribution channel exists so this work can survive past a demo.",
          bullets: [
            "Eye-state + head-pose + yawn detection running on-device",
            "Status surface designed for one-glance reading",
            "Public download path so the work has an actual user funnel",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "Public APK distribution surface for the dashboard — signed builds, release notes, and a driver-friendly README.",
        },
        {
          label: "Key decisions",
          body:
            "Treat the repo as a product page. Sign every artifact. Keep release notes scoped per version, not a wall of commits.",
        },
        {
          label: "Trade-offs",
          body:
            "Larger maintenance surface than a raw repo. Every release needs a real changelog and a tested artifact.",
        },
        {
          label: "Outcomes",
          body:
            "Drivers can download v1.4.2 in one tap, every release is signed + tagged, and the funnel is visible publicly.",
        },
      ],
      metrics: [
        { value: "v1.4.2", caption: "Latest signed release" },
        { value: "18.6 MB", caption: "Distributed APK size" },
        { value: "60 fps", caption: "On-device detection" },
        { value: "Android 10+", caption: "Supported runtime" },
      ],
    },
  },
  {
    slug: "variable-stars",
    title: "Applied research",
    tagline: "Periodically variable star classification from light curves.",
    body:
      "Periodically variable star classification through notebooks, features, and observable experiment trails.",
    image: "/projects/variable-stars.svg",
    repoUrl:
      "https://github.com/Anshuman791322/periodically-variable-stars",
    className: "taste-bento-small",
    accent: "violet",
    status: "Research",
    year: "2025",
    techStack: ["Jupyter", "Python", "scikit-learn", "Astronomy"],
    caseStudy: {
      intro:
        "Variable star classification is a real signal-processing problem dressed up as ML. The notebook treats it as a feature-engineering exercise on the light curves, then a classical classifier — every step visible so someone else can reproduce the result.",
      sections: [
        {
          title: "Features from the light curve",
          body:
            "I extracted phase-folded amplitude, periodicity strength, and shape descriptors from the raw light curves. Each feature has a notebook cell that plots what it looks like for the major classes — so the model isn't a black box, it's reading the same signals an astronomer would.",
          bullets: [
            "Phase-folding to expose the period",
            "Amplitude + skew + period-power features",
            "Per-class visual sanity checks before training",
          ],
        },
        {
          title: "Reproducible classifier",
          body:
            "A scikit-learn pipeline does the actual fit — deliberately classical, so the result can be inspected, retrained on new data, and explained. The notebook ships with the train/val split, the metrics that matter for an imbalanced star catalogue, and the confusion matrix that shows where the model still struggles.",
          bullets: [
            "scikit-learn pipeline — fit, persist, reuse",
            "Stratified split + per-class precision/recall",
            "Honest confusion matrix instead of a single accuracy number",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "End-to-end notebook: ingest light-curve catalogue → engineered features → train classifier → confusion-matrix readout.",
        },
        {
          label: "Key decisions",
          body:
            "Classical features over a black-box CNN — the signal IS a periodogram. Stratified split because the class balance is skewed.",
        },
        {
          label: "Trade-offs",
          body:
            "Hand-crafted features take longer to engineer. Classical model has a hard ceiling on rare-class recall.",
        },
        {
          label: "Outcomes",
          body:
            "0.92 accuracy across four star classes, 0.89 macro-F1, and every step reproducible from the notebook in one run.",
        },
      ],
      metrics: [
        { value: "9.4k", caption: "Labelled light curves" },
        { value: "4", caption: "Star classes classified" },
        { value: "0.92", caption: "Validation accuracy" },
        { value: "0.89", caption: "Macro F1" },
      ],
    },
  },
  {
    slug: "portfolio-systems",
    title: "Static portfolio systems",
    tagline: "Next.js export, self-hosted typography, motion that survives view-source.",
    body:
      "Next.js export, self-hosted typography, and motion that still leaves readable HTML behind.",
    image: "/projects/html-portfolio.svg",
    repoUrl: "https://github.com/Anshuman791322/Anshuman791322.github.io",
    className: "taste-bento-small",
    accent: "cyan",
    status: "Shipping",
    year: "2026",
    techStack: ["Next.js", "TypeScript", "GSAP", "Anime.js", "GitHub Pages"],
    caseStudy: {
      intro:
        "This portfolio is its own product. Static export so it survives anywhere, server components so the LCP is plain HTML, motion that lives in scoped client islands instead of a global runtime. The repo is the proof.",
      sections: [
        {
          title: "Server-first architecture",
          body:
            "Most sections are React Server Components — they ship zero JS. Only the bits that genuinely need state (nav active indicator, scroll-triggered animations, hover effects) hydrate as small client islands. The result: a portfolio that opens fast and is still inspectable in view-source.",
          bullets: [
            "RSC sections compose the static HTML payload",
            "Client islands isolated to nav, reveal wrappers, project showcase",
            "Static export bundled and served from GitHub Pages CDN",
          ],
        },
        {
          title: "Motion that doesn't bloat",
          body:
            "GSAP + Anime.js for the heavy work, but scoped per-island so the unused parts tree-shake. Pure-CSS keyframes for ambient loops where JS would be overkill. Every animation has a reduced-motion fallback that collapses it to opacity-only or removes it entirely.",
          bullets: [
            "Scoped GSAP timelines for hero + section reveals",
            "Anime.js for icon stroke-draws and magnetic CTAs",
            "Pure CSS for the marquee and orb drift loops",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "This portfolio. Next.js static export, server-first components, self-hosted Fontshare type, scoped motion runtime.",
        },
        {
          label: "Key decisions",
          body:
            "Server-rendered HTML for the LCP path. Client islands only where state is needed. GSAP + Anime.js scoped, not global.",
        },
        {
          label: "Trade-offs",
          body:
            "Static export rules out per-request data. Per-island motion runtime takes more wiring than a single library.",
        },
        {
          label: "Outcomes",
          body:
            "118 KB First Load JS, 90+ on Lighthouse mobile, no FOIT thanks to font-display:swap, view-source still tells the story.",
        },
      ],
      metrics: [
        { value: "118 KB", caption: "First Load JS" },
        { value: "0 ms", caption: "FOIT (font swap)" },
        { value: "90+", caption: "Lighthouse mobile" },
        { value: "WCAG AA", caption: "Contrast minimum" },
      ],
    },
  },
  {
    slug: "release-discipline",
    title: "Release discipline",
    tagline: "Open repos, shipped artifacts, deployment paths that can be inspected.",
    body:
      "Open repositories, shipped artifacts, and deployment paths that can be inspected without asking for context.",
    image: "/projects/anshuman-07.svg",
    repoUrl: "https://github.com/Anshuman791322",
    className: "taste-bento-small",
    accent: "green",
    status: "Archive",
    year: "2022 → 2026",
    techStack: ["Git", "GitHub Actions", "Release pipelines", "Static export"],
    caseStudy: {
      intro:
        "Less a single project, more a stance. The repos I publish are the artifacts. The README is the contract. The CI workflow is the proof. Anyone can land on a repo and figure out what shipped, when, and why — without asking me.",
      sections: [
        {
          title: "Repos as the unit of release",
          body:
            "Each repo carries its own deployable path. The READMEs say what shipped and what is open work. The branches stay close to main — feature work doesn't disappear into long-lived experiments. CI runs are part of the audit trail.",
          bullets: [
            "READMEs scoped to the artifact, not the journey",
            "Short-lived branches that merge fast",
            "GitHub Actions as the public deployment log",
          ],
        },
        {
          title: "Inspectable deployment paths",
          body:
            "The portfolio you're on right now is a worked example. The Next.js static export is in the repo. The deploy workflow is in `.github/workflows`. The signed APK for the driver-monitoring app is on a public release. Every shipped surface has a public path back to its source.",
          bullets: [
            "Static export checked into the same repo as source",
            "deploy.yml visible in .github/workflows",
            "Signed release artifacts for every download surface",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "Public repos with shipping release pages, GitHub Actions workflows, signed artifacts, and READMEs scoped to the artifact.",
        },
        {
          label: "Key decisions",
          body:
            "Repo is the contract. README is for the user, not the contributor. CI is the public deployment log — not hidden.",
        },
        {
          label: "Trade-offs",
          body:
            "Every shipped surface costs maintenance — README rot, broken downloads, drifted CI. Cheaper to keep tight.",
        },
        {
          label: "Outcomes",
          body:
            "63 deployments tracked, every release tagged + signed, GitHub Actions logs public, no \"trust me, it works\" anywhere.",
        },
      ],
      metrics: [
        { value: "5", caption: "Public repositories" },
        { value: "63", caption: "Pages deployments" },
        { value: "100%", caption: "Open source" },
        { value: "2022 → 2026", caption: "Years public" },
      ],
    },
  },
  {
    slug: "humanify",
    title: "Humanify",
    tagline:
      "A Next.js writing-refinement and authenticity-review app with a multi-stage server pipeline.",
    body:
      "A Next.js app that runs a server-side rewrite pipeline — preflight, diagnosis, fact-lock, rewrite, quality check — over Gemini models without ever persisting your text.",
    image: "/projects/humanify.svg",
    repoUrl: "https://github.com/Anshuman791322/humanify",
    className: "taste-bento-small",
    accent: "cyan",
    status: "Shipping",
    year: "2026",
    techStack: ["Next.js", "TypeScript", "Zod", "Gemini API", "Server pipeline"],
    caseStudy: {
      intro:
        "Humanify is a writing-refinement and authenticity-review app. It improves clarity, rhythm, specificity, tone, and readability while keeping meaning intact. It does not prove human authorship or guarantee outcomes from third-party classifiers — the external review notes are treated only as writing feedback.",
      sections: [
        {
          title: "Server-side multi-stage pipeline",
          body:
            "`POST /api/refine` runs an eight-stage server pipeline. Input is validated with Zod, then a deterministic preflight scans for duplicate sentences, long sentences, repeated openings, generic transitions, inflated phrases, and unsupported claims. Diagnosis and fact-lock extraction feed a rewrite plan that drives the actual Gemini call.",
          bullets: [
            "Zod input validation + style controls",
            "Deterministic preflight (duplicates, long sentences, generic transitions)",
            "Fact-lock for claims, names, numbers, terms, references",
            "Rewrite + post-rewrite quality check against the original",
          ],
        },
        {
          title: "Privacy as a default",
          body:
            "Session API keys are held in React memory only — never persisted in localStorage, never written to disk. Source documents and refined text don't get stored in the browser either. In Careful mode, an invented-content risk check triggers one stricter preservation rewrite before returning the result.",
          bullets: [
            "Gemini API key entered per-session, kept in React state only",
            "No source-text persistence in the browser",
            "Careful mode adds an extra strict preservation pass",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "Next.js UI (Input Console, Style Controls, Document Preflight, Voice Sample, Processing Terminal, Original vs Refined) + `/api/refine` server pipeline orchestrating Gemini calls.",
        },
        {
          label: "Key decisions",
          body:
            "Server-side pipeline (not client-only) so API keys never reach the browser bundle. Deterministic preflight before the model so quality issues are caught even on cold runs.",
        },
        {
          label: "Trade-offs",
          body:
            "Longer end-to-end latency than a one-shot prompt. Pipeline complexity means more failure modes to surface — every stage returns a warning array.",
        },
        {
          label: "Outcomes",
          body:
            "Single endpoint returns originalText, refinedText, preflight, diagnosis, factLock, qualityCheck, and warnings. Four Gemini model presets supported with safe fallback.",
        },
      ],
      metrics: [
        { value: "8", caption: "Pipeline stages" },
        { value: "4", caption: "Gemini models supported" },
        { value: "0", caption: "Browser-stored text" },
        { value: "Zod", caption: "Schema-validated input" },
      ],
    },
  },
  {
    slug: "zinging",
    title: "Zinging (Observant Creativity)",
    tagline:
      "A production-oriented cog-based Discord assistant bot powered by NVIDIA NIM.",
    body:
      "A Python Discord bot with NVIDIA NIM-powered assistant workflows, database-backed memory, aggressive caching, and Railway deployment readiness. Built by Lakshay-13 — included with permission as a featured collaboration.",
    image: "/projects/zinging.svg",
    repoUrl: "https://github.com/Lakshay-13/zinging",
    className: "taste-bento-small",
    accent: "violet",
    status: "Collaboration",
    year: "2026",
    techStack: ["Python", "discord.py", "NVIDIA NIM", "PostgreSQL", "Railway"],
    caseStudy: {
      intro:
        "Zinging is the production rebuild of a Discord assistant — a clean cog-based architecture replacing the old music-bot tangle with NVIDIA NIM-backed assistant workflows, a real schema, aggressive in-memory caching, and a Railway-ready deploy. Repo by Lakshay-13; featured here with credit.",
      sections: [
        {
          title: "Cog-based assistant architecture",
          body:
            "Five cogs split responsibilities cleanly: assistant (ask, code, image, memory), translate (live mode + preferences), admin (config / enable / disable), owner (self-update prompts), and help (compact + detailed). The provider layer keeps the NIM async client retry-aware and streaming-capable.",
          bullets: [
            "Ask: meta/llama-4-maverick-17b-128e-instruct",
            "Code/Update: qwen/qwen3-coder-480b-a35b-instruct",
            "Translate: google/gemma-3n-e4b-it",
            "Async NIM provider with retries + streaming support",
          ],
        },
        {
          title: "DB + cache that don't fight each other",
          body:
            "PostgreSQL stores user memory (max 50 bullets, oldest pruned), guild config prompts, channel records, command toggles, and a self-update commit history. An aggressive in-memory cache wraps all hot lookups with lazy-load, write-through updates, and targeted invalidation.",
          bullets: [
            "User memory capped at 50 bullets, oldest pruned",
            "Guild + channel + command state cached lazily",
            "Write-through cache + targeted invalidation on destructive ops",
            "Self-update service drafts, applies, and rolls back system prompts",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "Collaboration credit — full implementation by Lakshay-13: Python Discord bot, NIM provider layer, PostgreSQL schema, cache + presence services, Railway deploy config.",
        },
        {
          label: "Key decisions",
          body:
            "Cog separation per concern. Aggressive cache instead of round-tripping the DB. Three model presets sized for ask vs code vs translate, instead of one-size-fits-all.",
        },
        {
          label: "Trade-offs",
          body:
            "Cache adds an extra invalidation surface — every destructive command must target it. NIM provider needs streaming + retry handling that's invisible when it works.",
        },
        {
          label: "Outcomes",
          body:
            "Railway-deployable. Self-updating prompts with commit history + rollback. Three task-specific NIM models in one bot. Documented architecture in the repo README.",
        },
      ],
      metrics: [
        { value: "5", caption: "Cogs split by concern" },
        { value: "3", caption: "NIM models (ask / code / translate)" },
        { value: "50", caption: "Memory bullets per user (capped)" },
        { value: "Railway", caption: "Deploy target" },
      ],
    },
  },
  {
    slug: "artgridx",
    title: "ArtGridX",
    tagline:
      "A premium scrapbook portfolio for a drawing artist — Next.js, Framer Motion, Supabase.",
    body:
      "A masonry-style collage portfolio with parallax hero, draggable cards, animated lightbox, and a Supabase-backed admin dashboard tuned for mobile uploads. Built by Lakshay-13 — included with permission as a featured collaboration.",
    image: "/projects/artgridx.svg",
    repoUrl: "https://github.com/Lakshay-13/artgridx",
    className: "taste-bento-small",
    accent: "orange",
    status: "Collaboration",
    year: "2026",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase", "Docker"],
    caseStudy: {
      intro:
        "ArtGridX is the public-facing portfolio + private admin app for a drawing artist. Oversized parallax hero typography, a masonry collage of works, animated lightbox, and a Supabase-backed contact form on the front; a password-protected Android-optimised admin dashboard on the back. Repo by Lakshay-13; featured here with credit.",
      sections: [
        {
          title: "Premium collage front-end",
          body:
            "The homepage opens with oversized parallax hero typography, then drops into a masonry-style gallery of works with draggable cards. Framer Motion drives an animated lightbox so each piece has a real focused-state view, not just an image-grid thumbnail.",
          bullets: [
            "Oversized parallax hero typography",
            "Masonry collage with draggable cards",
            "Framer Motion animated lightbox",
            "Supabase-backed contact form",
          ],
        },
        {
          title: "Admin dashboard tuned for mobile uploads",
          body:
            "The admin sits behind Supabase auth (`public.admin_users` allow-list) and is shaped for Android browsers — client-side image compression before upload keeps mobile uploads snappy. The repo also works against a fully local Supabase stack via Docker, so the artist can preview content end-to-end without an account.",
          bullets: [
            "Supabase auth + `public.admin_users` allow-list",
            "Android-first mobile UI",
            "Client-side image compression before upload",
            "Local Supabase stack via Docker for offline previews",
          ],
        },
      ],
      journal: [
        {
          label: "What I built",
          body:
            "Collaboration credit — full implementation by Lakshay-13: Next.js + Tailwind front-end, Framer Motion gallery, Supabase schema, Docker dev stack, admin auth flow.",
        },
        {
          label: "Key decisions",
          body:
            "Treat the client as the user. Build for Android browsers explicitly (not desktop-first). Ship a local Supabase stack so the artist can demo without a cloud account.",
        },
        {
          label: "Trade-offs",
          body:
            "Two deployment paths (hosted Supabase + local Docker) doubles setup docs. Client-side image compression adds upload complexity but saves bandwidth on mobile.",
        },
        {
          label: "Outcomes",
          body:
            "Public collage + private admin in one repo. Local-first dev via Docker. Mobile uploads stay fast through client-side compression. Auth scoped to a tiny allow-list.",
        },
      ],
      metrics: [
        { value: "Masonry", caption: "Collage layout" },
        { value: "Mobile", caption: "First-class admin device" },
        { value: "Supabase", caption: "Auth + storage" },
        { value: "Docker", caption: "Local dev stack" },
      ],
    },
  },
] as const satisfies readonly WorkCard[];

export function getWorkCard(slug: string): WorkCard | undefined {
  return workCards.find((card) => card.slug === slug);
}

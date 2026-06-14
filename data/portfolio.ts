// Single source of truth for portfolio content.
// Edit name, bio, links, skills, stats, timeline, and projects here.

export type ProjectAccent = "blue" | "orange" | "cyan" | "violet" | "green";

export type Project = {
  title: string;
  repository: string;
  liveUrl?: string;
  description: string;
  impact: string;
  role: string;
  tags: string[];
  year: string;
  featured: boolean;
  archived?: boolean;
  accent: ProjectAccent;
  // Bento span (1-12 column grid). featured cards typically span 7-8.
  span: { col: number; row?: number };
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type TimelineEntry = {
  year: string;
  title: string;
  detail: string;
  meta?: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

export const portfolio = {
  person: {
    name: "Anshuman Singh",
    handle: "Anshuman791322",
    role: "Computer-science engineer & product builder",
    tagline: "I turn technical ideas into working products.",
    bio:
      "I am a B.Tech Computer Science Engineering student building across local AI, computer vision, applied research and the web. My public work focuses on local-first inference, driver-safety tooling, astronomical classification, and front-end experiments — shipped end-to-end on GitHub.",
    location: "India",
    availability: "Open to roles and collaborations",
    email: "anshuman6062@gmail.com",
    github: "https://github.com/Anshuman791322",
    githubHandle: "Anshuman791322",
  },
  nav: ["about", "journey", "skills", "projects", "experiments", "contact"] as const,
  stats: [
    { value: 5, label: "Public repositories" },
    { value: 4, label: "Build domains" },
    { value: 2022, label: "Building since" },
    { value: 100, suffix: "%", label: "Open source" },
  ] satisfies Stat[],
  skills: [
    {
      label: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      label: "AI & ML",
      items: ["Ollama", "Whisper", "PyTorch", "scikit-learn", "Jupyter"],
    },
    {
      label: "App & Web",
      items: ["PySide6", "Next.js", "React", "Tailwind CSS", "Framer Motion"],
    },
    {
      label: "Delivery",
      items: ["Git & GitHub", "GitHub Actions", "Android (APK)", "Static export"],
    },
  ] satisfies SkillGroup[],
  timeline: [
    {
      year: "2026",
      title: "Local-first AI desktop product",
      detail:
        "Designed a Windows-first Jarvis-style assistant on PySide6, with on-device Ollama inference and Whisper voice transcription — privacy without giving up capability.",
      meta: "Ai-agent · Python · PySide6 · Ollama · Whisper",
    },
    {
      year: "2026",
      title: "Driver-safety release channel",
      detail:
        "Shipped the public APK distribution for the Smart Driver Monitoring Dashboard — a real product release surface for an Android computer-vision system.",
      meta: "smart-driver-monitoring-dashboard-downloads",
    },
    {
      year: "2025",
      title: "Applied research — variable stars",
      detail:
        "Authored a notebook-driven classifier for periodically variable stars, blending astronomical features with classical ML workflows.",
      meta: "periodically-variable-stars · Jupyter",
    },
    {
      year: "2024",
      title: "Front-end foundations",
      detail:
        "Built the first iteration of a public HTML portfolio while sharpening layout, typography and motion fundamentals.",
      meta: "html-portfolio",
    },
    {
      year: "2022",
      title: "Public on GitHub",
      detail:
        "Started documenting work publicly and configured a profile presence on GitHub — the long arc began here.",
      meta: "Profile setup",
    },
  ] satisfies TimelineEntry[],

  // Featured projects render in the Bento grid. Order matters: card 1 is the hero card.
  projects: [
    {
      title: "AI Agent",
      repository: "https://github.com/Anshuman791322/Ai-agent",
      description:
        "Windows-first Jarvis redesign with a native PySide6 UI, Ollama-backed local inference and Whisper voice transcription. Built to feel like a desktop product, not a notebook.",
      impact: "Privacy-first desktop AI · local inference · voice interaction",
      role: "Solo build · design, engineering, packaging",
      tags: ["Python", "PySide6", "Ollama", "Whisper", "Desktop"],
      year: "2026",
      featured: true,
      accent: "blue",
      span: { col: 7 },
    },
    {
      title: "Smart Driver Monitoring",
      repository:
        "https://github.com/Anshuman791322/smart-driver-monitoring-dashboard-downloads",
      description:
        "Public APK distribution surface for a smart driver monitoring dashboard — turning a research-grade vision system into a downloadable Android product.",
      impact: "Product delivery · Android release channel",
      role: "Release engineering · distribution",
      tags: ["Android", "APK", "Computer Vision", "Release"],
      year: "2026",
      featured: true,
      accent: "orange",
      span: { col: 5 },
    },
    {
      title: "Periodically Variable Stars",
      repository:
        "https://github.com/Anshuman791322/periodically-variable-stars",
      description:
        "Applied-research notebook that classifies periodically variable stars from their light-curve features — a study in clean feature engineering and reproducibility.",
      impact: "Applied research · astronomical classification",
      role: "Research engineer",
      tags: ["Jupyter", "Python", "ML", "Astronomy"],
      year: "2025",
      featured: true,
      accent: "violet",
      span: { col: 5 },
    },
    {
      title: "HTML Portfolio",
      repository: "https://github.com/Anshuman791322/html-portfolio",
      description:
        "An earlier handcrafted portfolio in pure HTML/CSS — the starting line for the front-end practice this site now carries forward.",
      impact: "Web foundation · portfolio experiment",
      role: "Front-end · solo",
      tags: ["HTML", "CSS", "Web"],
      year: "2024",
      featured: false,
      accent: "cyan",
      span: { col: 4 },
    },
    {
      title: "Anshuman-07",
      repository: "https://github.com/Anshuman791322/Anshuman-07",
      description:
        "Archived configuration files from an earlier GitHub profile setup — kept public for history and continuity.",
      impact: "Developer profile · configuration archive",
      role: "Profile config",
      tags: ["GitHub", "Config", "Archive"],
      year: "2022",
      featured: false,
      archived: true,
      accent: "green",
      span: { col: 3 },
    },
  ] satisfies Project[],

  experiments: [
    {
      label: "Local inference UX",
      detail: "Lessons from packaging an Ollama+Whisper desktop app on Windows.",
    },
    {
      label: "Astro features",
      detail: "Feature-engineering light curves for periodic stars.",
    },
    {
      label: "Static-first motion",
      detail: "Building this portfolio with Framer Motion + Lenis on GitHub Pages.",
    },
    {
      label: "Release pipelines",
      detail: "APK distribution as a product surface, not an afterthought.",
    },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/Anshuman791322" },
    { label: "Email", href: "mailto:anshuman6062@gmail.com" },
  ],
} as const;

export type Portfolio = typeof portfolio;

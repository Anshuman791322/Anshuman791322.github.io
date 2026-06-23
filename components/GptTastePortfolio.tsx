"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Bot,
  CarFront,
  Code2,
  Github,
  LayoutGrid,
  Mail,
  MessageSquareCode,
  Microscope,
  PackageCheck,
  ScanText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useRef } from "react";

import { portfolio } from "@/data/portfolio";
import { workCards as workCardData } from "@/data/workCards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const story =
  "I build software where the interface, model, release channel, and repository all line up. Local AI matters when it is usable. Research matters when someone can reproduce it. Front-end work matters when the details hold up in public.";

// Map each card's slug to the lucide icon used in the bento. (Icons stay in the
// client component because they hydrate; the rest of the project data is the
// authoritative copy in data/workCards.ts.)
const ICONS = {
  "ai-agent": Bot,
  "driver-monitoring": CarFront,
  "variable-stars": Microscope,
  "portfolio-systems": Code2,
  "release-discipline": PackageCheck,
  // 2026 additions
  humanify: ScanText,
  zinging: MessageSquareCode,
  artgridx: LayoutGrid,
} as const;

const workCards = workCardData.map((card) => ({
  title: card.title,
  body: card.body,
  // Card now links into the internal case-study route. The case-study page is
  // the one that links out to the actual GitHub repo.
  href: `/${card.slug}/`,
  image: card.image,
  className: card.className,
  icon: ICONS[card.slug as keyof typeof ICONS] ?? Code2,
}));

const capabilities = [
  "PySide6 desktop UX",
  "Ollama local inference",
  "Whisper voice input",
  "Computer vision releases",
  "Next.js static export",
  "Research notebooks",
  "Anime.js and GSAP motion",
  "GitHub Pages deployment",
];

const stackCards = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "C++", "HTML/CSS"],
    // Themed cover lives in /public/stack — floating bracket glyphs.
    image: "/stack/languages.svg",
  },
  {
    label: "AI & ML",
    items: ["Ollama", "Whisper", "PyTorch", "scikit-learn"],
    // Layered neural network with highlighted central neuron.
    image: "/stack/ai-ml.svg",
  },
  {
    label: "Apps & Web",
    items: ["Next.js", "React", "PySide6", "Anime.js"],
    // Browser frame overlapping a mobile mock.
    image: "/stack/app-web.svg",
  },
  {
    label: "Delivery",
    items: ["GitHub", "Actions", "APK", "Static export"],
    // CODE → BUILD → TEST → SHIP pipeline.
    image: "/stack/delivery.svg",
  },
];

export function GptTastePortfolio() {
  const rootRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLParagraphElement | null>(null);

  const storyWords = useMemo(() => story.split(" "), []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const hash = window.location.hash.replace("#", "");
      if (hash) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ block: "start" });
        }, 120);
      }

      gsap.from(".taste-nav", {
        y: -28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".taste-hero-copy > *", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".taste-hero-terminal", {
        x: 52,
        rotate: 3,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.16,
      });

      gsap.from(".taste-stat", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.28,
      });

      gsap.from(".taste-stat strong", {
        textContent: 0,
        duration: 1.2,
        snap: { textContent: 1 },
        stagger: 0.06,
        ease: "power2.out",
        delay: 0.36,
      });

      gsap.to(".taste-hero-terminal", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: ".taste-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".taste-section-head > *", {
        scrollTrigger: {
          trigger: ".taste-interest",
          start: "top 76%",
        },
        y: 42,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".taste-bento-card", {
        scrollTrigger: {
          trigger: ".taste-interest",
          start: "top 72%",
        },
        y: 64,
        scale: 0.92,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".taste-card-body > *", {
        scrollTrigger: {
          trigger: ".taste-bento",
          start: "top 68%",
        },
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.035,
        ease: "power3.out",
      });

      gsap.to(".taste-card-image", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".taste-bento",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".taste-stack-tile", {
        scrollTrigger: {
          trigger: ".taste-stack-section",
          start: "top 74%",
        },
        y: 60,
        rotateX: -10,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(".taste-stack-tile-media", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".taste-stack-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const words = gsap.utils.toArray<HTMLElement>(".taste-word");
      gsap.fromTo(
        words,
        { opacity: 0.12, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 78%",
            end: "bottom 42%",
            scrub: true,
          },
        },
      );

      // Headline now pins via plain CSS `position: sticky` on .taste-pin —
      // no GSAP pin, no double spacer. The .taste-stack column's natural
      // height drives how long the headline stays put.

      gsap.from(".taste-marquee", {
        scrollTrigger: {
          trigger: ".taste-marquee",
          start: "top 84%",
        },
        scaleX: 0.88,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".taste-action > *", {
        scrollTrigger: {
          trigger: ".taste-action",
          start: "top 78%",
        },
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
      });

      const navLinks = gsap.utils.toArray<HTMLAnchorElement>(".taste-nav div a");
      ["work", "stack", "method", "contact"].forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            const link = navLinks.find((item) => item.getAttribute("href") === `#${id}`);
            if (link) link.classList.toggle("is-active", self.isActive);
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".taste-stack-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 90 + index * 20, scale: 0.86, opacity: 0.45 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 42%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <main className="taste-page" ref={rootRef}>
      <nav className="taste-nav" aria-label="Primary">
        <a className="taste-brand" href="#top" aria-label="Anshuman home">
          <span>AS</span>
          <strong>Anshuman Singh</strong>
        </a>
        <div>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href="#method">Method</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="taste-hero" id="top">
        <div className="taste-hero-copy">
          <h1>Software that feels considered, shipped, and alive.</h1>
          <p>
            A portfolio for local-first AI, computer vision, research notebooks,
            and front-end systems that can be opened, inspected, and run.
          </p>
          <div className="taste-actions">
            <a className="taste-button taste-button-primary" href="#work">
              View selected work
              <ArrowUpRight size={17} />
            </a>
            <a
              className="taste-button taste-button-secondary"
              href={`mailto:${portfolio.person.email}`}
            >
              Get in touch
              <Mail size={16} />
            </a>
          </div>
        </div>
        <div className="taste-hero-art" aria-hidden="true">
          <div className="taste-hero-terminal">
            <div className="taste-terminal-top">
              <span />
              <span />
              <span />
              <strong>local-agent.ts</strong>
            </div>
            <div className="taste-terminal-grid">
              <span className="taste-code-row taste-code-row-one" />
              <span className="taste-code-row taste-code-row-two" />
              <span className="taste-code-row taste-code-row-three" />
              <span className="taste-code-row taste-code-row-four" />
              <div className="taste-signal-map">
                <i />
                <i />
                <i />
                <b />
              </div>
            </div>
            <div className="taste-terminal-footer">
              <span>ollama ready</span>
              <span>voice input</span>
              <span>static export</span>
            </div>
            <span className="taste-scan" />
          </div>
          <span className="taste-hero-chip taste-hero-chip-one">UI</span>
          <span className="taste-hero-chip taste-hero-chip-two">CV</span>
          <span className="taste-hero-chip taste-hero-chip-three">AI</span>
          <div className="taste-orbit taste-orbit-one" />
          <div className="taste-orbit taste-orbit-two" />
        </div>
      </section>

      <section className="taste-stats" aria-label="Portfolio numbers">
        {portfolio.stats.map((stat) => (
          <div className="taste-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.suffix ?? ""}</span>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="taste-interest" id="work" aria-labelledby="work-title">
        <div className="taste-section-head">
          <h2 id="work-title">Selected work with the edges left visible.</h2>
          <p>
            {workCards.length} public repositories across desktop AI, mobile
            distribution, research, writing tooling, Discord bots, and interface
            work — including two collaborations credited to their authors.
          </p>
        </div>

        <div className="taste-bento">
          {workCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                className={`taste-bento-card ${card.className}`}
                href={card.href}
                key={card.title}
              >
                <span
                  className="taste-card-image"
                  style={{ backgroundImage: `url("${card.image}")` }}
                />
                <span className="taste-card-body">
                  <Icon size={22} />
                  <strong>{card.title}</strong>
                  <span>{card.body}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="taste-stack-section" id="stack" aria-labelledby="stack-title">
        <div className="taste-section-head">
          <h2 id="stack-title">Tech stack with the build path visible.</h2>
          <p>
            The tools behind the public repos: local models, native desktop UI,
            static front-end delivery and release packaging.
          </p>
        </div>

        <div className="taste-stack-grid">
          {stackCards.map((card) => (
            <article className="taste-stack-tile" key={card.label}>
              <span
                className="taste-stack-tile-media"
                style={{ backgroundImage: `url("${card.image}")` }}
              />
              <div>
                <p>{card.label}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="taste-desire" id="method">
        <div className="taste-pin" ref={pinRef}>
          <h2>Build the product around the repo, not after it.</h2>
          <p ref={storyRef}>
            {storyWords.map((word, index) => (
              <span className="taste-word" key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        <div className="taste-stack">
          {portfolio.timeline.slice(0, 4).map((entry) => (
            <article className="taste-stack-card" key={`${entry.year}-${entry.title}`}>
              <span>{entry.year}</span>
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="taste-marquee" aria-label="Capabilities">
        <div>
          {[...capabilities, ...capabilities].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="taste-action" id="contact">
        <Sparkles size={34} />
        <h2>Have a hard problem worth building?</h2>
        <p>
          I am open to software roles and product engineering work where the
          implementation has to survive real use.
        </p>
        <div className="taste-actions">
          <a className="taste-button taste-button-primary" href={`mailto:${portfolio.person.email}`}>
            Email me
            <Mail size={16} />
          </a>
          <a
            className="taste-button taste-button-secondary"
            href={portfolio.person.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <Github size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

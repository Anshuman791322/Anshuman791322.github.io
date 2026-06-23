import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Mail } from "lucide-react";

import type { WorkCard } from "@/data/workCards";
import { portfolio } from "@/data/portfolio";
import { CaseSpotlight } from "@/components/ui/CaseSpotlight";
import { CaseMagnet } from "@/components/ui/CaseMagnet";

type Props = {
  card: WorkCard;
};

/**
 * Per-project case-study page rendered at /<slug>/. Server component — the
 * static HTML payload is the entire page. Two small client islands wrap the
 * outro callout (React Bits SpotlightCard pattern, adapted to the case-study
 * accent) and the primary CTA (React Bits Magnet pattern, gated to desktop).
 */
export function CaseStudy({ card }: Props) {
  return (
    <main className={`case-page case-accent-${card.accent}`}>
      {/* Sticky top bar */}
      <header className="case-top">
        <Link href="/" className="case-back" aria-label="Back to portfolio">
          <ArrowLeft size={16} />
          <span>Portfolio</span>
        </Link>
        <a
          href={portfolio.person.github}
          target="_blank"
          rel="noreferrer"
          className="case-top-handle"
        >
          @{portfolio.person.handle}
        </a>
      </header>

      {/* Hero */}
      <section className="case-hero">
        <div className="case-hero-meta">
          <span className="case-status">
            <span className="case-status-dot" />
            {card.status}
          </span>
          <span className="case-year">{card.year}</span>
        </div>

        <h1 className="case-title">{card.title}</h1>
        <p className="case-tagline">{card.tagline}</p>

        <div className="case-actions">
          <CaseMagnet
            href={card.repoUrl}
            external
            className="case-button case-button-primary"
          >
            <Github size={16} />
            Open repository
            <ArrowUpRight size={16} />
          </CaseMagnet>
          <Link className="case-button case-button-secondary" href="/">
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
        </div>

        <div className="case-stack">
          {card.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>

      {/* Hero image */}
      <figure className="case-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt="" loading="eager" decoding="async" />
        <span className="case-image-shade" />
      </figure>

      {/* Intro */}
      <section className="case-intro">
        <p>{card.caseStudy.intro}</p>
      </section>

      {/* Numbered sections */}
      <section className="case-sections" aria-label="How it was built">
        {card.caseStudy.sections.map((section, i) => (
          <article className="case-section" key={section.title}>
            <span className="case-section-num">
              {(i + 1).toString().padStart(2, "0")}
            </span>
            <div className="case-section-body">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Build journal — 2x2 grid of micro-cards */}
      <section className="case-journal" aria-label="Build journal">
        <header className="case-journal-head">
          <span className="case-eyebrow">Build journal</span>
          <h2>What I built, decided, traded, and learned.</h2>
        </header>
        <div className="case-journal-grid">
          {card.caseStudy.journal.map((entry) => (
            <article className="case-journal-card" key={entry.label}>
              <span className="case-journal-label">{entry.label}</span>
              <p>{entry.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Metrics strip */}
      <section className="case-metrics" aria-label="By the numbers">
        {card.caseStudy.metrics.map((metric) => (
          <div className="case-metric" key={metric.caption}>
            <strong>{metric.value}</strong>
            <span>{metric.caption}</span>
          </div>
        ))}
      </section>

      {/* Outro — SpotlightCard pattern (React Bits) */}
      <CaseSpotlight className="case-outro">
        <h2>Want the source?</h2>
        <p>
          Every line is on GitHub — read the commit log, fork it, file an
          issue, send a PR. The repo is the canonical home for {card.title}.
        </p>
        <div className="case-actions">
          <a
            className="case-button case-button-primary"
            href={card.repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} />
            Open repository
            <ArrowUpRight size={16} />
          </a>
          <a
            className="case-button case-button-secondary"
            href={`mailto:${portfolio.person.email}`}
          >
            <Mail size={16} />
            Email me
          </a>
        </div>
      </CaseSpotlight>

      {/* Footer */}
      <footer className="case-foot">
        <div>
          <strong>{portfolio.person.name}</strong>
          <span>{portfolio.person.role}</span>
        </div>
        <nav className="case-foot-links" aria-label="Site links">
          <Link href="/">Portfolio</Link>
          <a
            href={portfolio.person.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href={`mailto:${portfolio.person.email}`}>Email</a>
        </nav>
      </footer>
    </main>
  );
}

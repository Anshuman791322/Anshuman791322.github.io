import { ArrowDown, ArrowUpRight, Github } from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticCTA } from "@/components/ui/MagneticCTA";

// Server component. Static HTML is the LCP path. No JS shipped from this file.
// Only the inner <Reveal> and <MagneticCTA> children are client islands.

const HEADLINE = ["I build software", "that feels considered,", "shipped, and alive."];

export function Hero() {
  return (
    <section className="hero section" id="about" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Reveal from="up" stagger={80} threshold={0.05}>
          <p className="eyebrow">
            <span className="status-dot" /> {portfolio.person.availability}
          </p>
          <h1 id="hero-title">
            {HEADLINE.map((line, idx) => (
              <span className="line" key={line}>
                <span className="word">
                  {idx === HEADLINE.length - 1 ? (
                    <>
                      shipped, and{" "}
                      <span className="accent-orange">alive.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-lede">{portfolio.person.bio}</p>
          <div className="hero-actions">
            <MagneticCTA href="#selected-work" className="btn btn-primary">
              View selected work <ArrowDown size={16} />
            </MagneticCTA>
            <a
              href={`mailto:${portfolio.person.email}`}
              className="btn btn-secondary"
            >
              Get in touch <ArrowUpRight size={16} />
            </a>
          </div>
          <dl className="hero-proof">
            <div>
              <dt>Based</dt>
              <dd>{portfolio.person.location}</dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a
                  href={portfolio.person.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "underline", textUnderlineOffset: 4 }}
                >
                  @{portfolio.person.handle} <Github size={12} style={{ display: "inline" }} />
                </a>
              </dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Local-first AI · CV · Web</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <div className="identity">
        <div className="identity-sheet s2" aria-hidden="true" />
        <div className="identity-sheet" aria-hidden="true" />
        <div className="identity-card">
          <div className="identity-portrait">
            <span className="identity-badge">Available</span>
            <picture>
              <source srcSet="/portrait.avif" type="image/avif" />
              <source srcSet="/portrait.webp" type="image/webp" />
              <img
                src="/portrait.jpg"
                alt={portfolio.person.name}
                width={760}
                height={950}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div className="identity-meta">
            <div>
              <strong>{portfolio.person.name}</strong>
              <span>Computer Science Engineering</span>
            </div>
            <span style={{ color: "var(--orange-soft)" }}>★ 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

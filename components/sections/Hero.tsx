import {
  ArrowDown,
  Code,
  Cpu,
  Eye,
  Global,
  Send2,
  StatusUp,
} from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnet } from "@/components/ui/Magnet";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

// Server component. Static HTML is the LCP path. The text-animation and
// magnetic-CTA bits hydrate as small client islands.

export function Hero() {
  return (
    <section className="hero" id="about" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-bg-grid" />
        <div className="hero-bg-orb hero-bg-orb-blue" />
        <div className="hero-bg-orb hero-bg-orb-orange" />
        <div className="hero-bg-orb hero-bg-orb-violet" />
      </div>

      <div className="hero-rail">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          <span>{portfolio.person.availability}</span>
        </p>

        <h1 id="hero-title" className="hero-headline">
          <span className="hero-line">
            I build software
          </span>
          <span className="hero-line">
            that feels considered,
          </span>
          <span className="hero-line">
            shipped, and{" "}
            <span className="accent-orange">
              alive.
            </span>
          </span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-bottom-left">
            <ScrollReveal from="up" stagger={90} threshold={0.04} preserveInitial>
              <p className="hero-lede">{portfolio.person.bio}</p>

              <div className="hero-actions">
                <Magnet href="#selected-work" className="btn btn-primary" padding={70}>
                  View selected work
                  <AnimatedIcon hover="translate"><ArrowDown size={16} color="currentColor" /></AnimatedIcon>
                </Magnet>
                <Magnet
                  href={`mailto:${portfolio.person.email}`}
                  external
                  className="btn btn-secondary"
                  padding={60}
                >
                  <AnimatedIcon hover="rotate"><Send2 size={16} color="currentColor" /></AnimatedIcon>
                  Get in touch
                </Magnet>
              </div>

              <dl className="hero-proof">
                <div>
                  <span className="hero-proof-icon">
                    <Global size={14} color="currentColor" />
                  </span>
                  <dt>Based</dt>
                  <dd>{portfolio.person.location}</dd>
                </div>
                <div>
                  <span className="hero-proof-icon">
                    <Code size={14} color="currentColor" />
                  </span>
                  <dt>Stack</dt>
                  <dd>Python · TypeScript · React</dd>
                </div>
                <div>
                  <span className="hero-proof-icon">
                    <Eye size={14} color="currentColor" />
                  </span>
                  <dt>Focus</dt>
                  <dd>Local AI · CV · Web</dd>
                </div>
                <div>
                  <span className="hero-proof-icon">
                    <Cpu size={14} color="currentColor" />
                  </span>
                  <dt>GitHub</dt>
                  <dd>
                    <a href={portfolio.person.github} target="_blank" rel="noreferrer">
                      @{portfolio.person.handle}
                    </a>
                  </dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>

          <ScrollReveal
            from="left"
            className="hero-bottom-right"
            stagger={0}
            threshold={0.05}
            preserveInitial
          >
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
                  <span className="identity-meta-icon">
                    <StatusUp size={20} variant="Bold" color="currentColor" />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

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
import { SplitText } from "@/components/ui/SplitText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Magnet } from "@/components/ui/Magnet";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

// Server component. Content is static HTML for the LCP path. The text-animation
// and magnetic-CTA bits are isolated client islands.

export function Hero() {
  return (
    <section className="hero section-band" id="about" aria-labelledby="hero-title">
      {/* Background ribbon — extends the section visually to the viewport edges
          while keeping the inner content max-width-bounded. */}
      <div className="hero-ribbon" aria-hidden="true">
        <div className="hero-ribbon-grid" />
        <div className="hero-ribbon-orb hero-ribbon-orb-blue" />
        <div className="hero-ribbon-orb hero-ribbon-orb-orange" />
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <ScrollReveal from="up" stagger={70} threshold={0.04}>
            <p className="eyebrow">
              <span className="status-dot" />
              <AnimatedIcon hover="rotate"><StatusUp size={14} /></AnimatedIcon>
              <span>{portfolio.person.availability}</span>
            </p>

            <h1 id="hero-title" className="hero-headline">
              <SplitText
                text="I build software"
                as="span"
                immediate
                delay={26}
                startDelay={100}
              />
              <br />
              <SplitText
                text="that feels considered,"
                as="span"
                immediate
                delay={26}
                startDelay={420}
              />
              <br />
              <SplitText
                text="shipped, and "
                as="span"
                immediate
                delay={26}
                startDelay={760}
              />
              <SplitText
                text="alive."
                as="span"
                immediate
                delay={32}
                startDelay={1080}
                className="accent-orange"
              />
            </h1>

            <p className="hero-lede">{portfolio.person.bio}</p>

            <div className="hero-actions">
              <Magnet href="#selected-work" className="btn btn-primary" padding={70}>
                View selected work
                <AnimatedIcon hover="translate" draw={false}><ArrowDown size={16} /></AnimatedIcon>
              </Magnet>
              <Magnet
                href={`mailto:${portfolio.person.email}`}
                external
                className="btn btn-secondary"
                padding={60}
              >
                <AnimatedIcon hover="rotate" draw={false}><Send2 size={16} /></AnimatedIcon>
                Get in touch
              </Magnet>
            </div>

            <dl className="hero-proof">
              <div>
                <AnimatedIcon><Global size={16} /></AnimatedIcon>
                <dt>Based</dt>
                <dd>{portfolio.person.location}</dd>
              </div>
              <div>
                <AnimatedIcon><Code size={16} /></AnimatedIcon>
                <dt>Stack</dt>
                <dd>Python · TypeScript · React</dd>
              </div>
              <div>
                <AnimatedIcon><Eye size={16} /></AnimatedIcon>
                <dt>Focus</dt>
                <dd>Local AI · CV · Web</dd>
              </div>
              <div>
                <AnimatedIcon><Cpu size={16} /></AnimatedIcon>
                <dt>GitHub</dt>
                <dd>
                  <a
                    href={portfolio.person.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{portfolio.person.handle}
                  </a>
                </dd>
              </div>
            </dl>
          </ScrollReveal>
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
              <AnimatedIcon hover="rotate"><StatusUp size={20} variant="Bold" /></AnimatedIcon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

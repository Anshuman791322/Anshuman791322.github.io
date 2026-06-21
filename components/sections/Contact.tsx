import { Github, Mail } from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticCTA } from "@/components/ui/MagneticCTA";

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <Reveal from="up">
          <p className="eyebrow">
            <span className="num">06</span> Contact
          </p>
          <h2 id="contact-title">
            Have a hard problem <span className="accent-orange">worth building?</span>
          </h2>
          <p>
            I&apos;m open to software roles, research collaborations, and
            product engineering work — especially anything that puts
            local-first AI, computer vision, or considered front-end in front
            of a real user.
          </p>
          <div className="hero-actions">
            <MagneticCTA
              href={`mailto:${portfolio.person.email}`}
              external
              className="btn btn-primary"
            >
              <Mail size={16} /> Email me
            </MagneticCTA>
            <a
              href={portfolio.person.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
          <div className="contact-meta">
            <span>
              Email ·{" "}
              <a href={`mailto:${portfolio.person.email}`}>
                {portfolio.person.email}
              </a>
            </span>
            <span>
              GitHub ·{" "}
              <a
                href={portfolio.person.github}
                target="_blank"
                rel="noreferrer"
              >
                @{portfolio.person.handle}
              </a>
            </span>
            <span>Based · {portfolio.person.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowRight, Location, Send2, Sms } from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlurText } from "@/components/ui/BlurText";
import { Magnet } from "@/components/ui/Magnet";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Contact() {
  return (
    <section className="contact section-band" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <ScrollReveal from="up" stagger={90}>
          <p className="eyebrow">
            <span className="num">06</span>
            <AnimatedIcon hover="rotate"><Send2 size={14} /></AnimatedIcon>
            <span>Contact</span>
          </p>
          <BlurText
            as="h2"
            id="contact-title"
            text="Have a hard problem worth building?"
            accent="building?"
          />
          <p>
            I&apos;m open to software roles, research collaborations, and
            product engineering work — especially anything that puts
            local-first AI, computer vision, or considered front-end in front
            of a real user.
          </p>
          <div className="hero-actions">
            <Magnet
              href={`mailto:${portfolio.person.email}`}
              external
              className="btn btn-primary"
              padding={90}
            >
              <AnimatedIcon hover="rotate" draw={false}><Sms size={16} variant="Bold" /></AnimatedIcon>
              Email me
              <ArrowRight size={14} variant="Linear" />
            </Magnet>
            <Magnet
              href={portfolio.person.github}
              external
              className="btn btn-secondary"
              padding={70}
            >
              <GithubIcon size={16} />
              GitHub
            </Magnet>
          </div>
          <div className="contact-meta">
            <span>
              <AnimatedIcon><Sms size={14} /></AnimatedIcon>
              Email ·{" "}
              <a href={`mailto:${portfolio.person.email}`}>
                {portfolio.person.email}
              </a>
            </span>
            <span>
              <GithubIcon size={14} />
              GitHub ·{" "}
              <a
                href={portfolio.person.github}
                target="_blank"
                rel="noreferrer"
              >
                @{portfolio.person.handle}
              </a>
            </span>
            <span>
              <AnimatedIcon><Location size={14} /></AnimatedIcon>
              Based · {portfolio.person.location}
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

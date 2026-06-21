import {
  ArrowSquareRight,
  Cpu,
  DocumentText1,
  MagicStar,
  RecoveryConvert,
} from "iconsax-react";

import { BlurText } from "@/components/ui/BlurText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const PRINCIPLES = [
  {
    num: "01",
    icon: Cpu,
    title: "Local-first AI",
    body: "Tools that keep inference and interaction close to the user. No round trips to a cloud you didn't ask for.",
  },
  {
    num: "02",
    icon: DocumentText1,
    title: "Applied research",
    body: "Classification work grounded in notebooks and observable data. Reproducible from the README.",
  },
  {
    num: "03",
    icon: RecoveryConvert,
    title: "Real distribution",
    body: "From interface to a public release channel real people can install and run today.",
  },
  {
    num: "04",
    icon: MagicStar,
    title: "Crafted surfaces",
    body: "Motion, type, and detail held to a higher bar than the brief demands.",
  },
];

export function About() {
  return (
    <section className="section about-section" aria-labelledby="about-title">
      <div className="about">
        <ScrollReveal from="up">
          <div className="section-head">
            <p className="eyebrow">
              <span className="num">01</span>
              <AnimatedIcon hover="translate"><ArrowSquareRight size={14} /></AnimatedIcon>
              <span>About</span>
            </p>
            <BlurText
              as="h2"
              id="about-title"
              text="Curiosity, shipped."
              accent="shipped."
            />
            <p className="lede">
              I treat ideas as products from day one — design, build, package,
              publish. The four principles below shape every repo on this site.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal from="up" stagger={90}>
          <div className="principles">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <SpotlightCard
                  key={p.num}
                  className="principle"
                  spotlightColor="rgba(74, 144, 255, 0.18)"
                >
                  <div className="principle-top">
                    <span className="num">{p.num}</span>
                    <span className="principle-icon">
                      <AnimatedIcon><Icon size={22} variant="Bulk" /></AnimatedIcon>
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </SpotlightCard>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

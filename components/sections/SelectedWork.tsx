import { ArrowRight, Briefcase, Bubble } from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlurText } from "@/components/ui/BlurText";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";

export function SelectedWork() {
  return (
    <section
      className="selected-work"
      id="selected-work"
      aria-labelledby="work-title"
    >
      <ScrollReveal from="up">
        <div className="work-head">
          <div>
            <p className="eyebrow">
              <span className="num">04</span>
              <AnimatedIcon hover="rotate"><Briefcase size={14} /></AnimatedIcon>
              <span>Selected Work</span>
            </p>
            <BlurText
              as="h2"
              id="work-title"
              text="Every repository, in one place."
              accent="place."
            />
          </div>
          <p className="work-head-lede">
            All {portfolio.projects.length} public repositories on GitHub.
            Tilt to feel the depth, hover for the spotlight, click any card
            for the full record.
          </p>
        </div>
      </ScrollReveal>

      <ProjectShowcase projects={portfolio.projects} />

      <a
        className="work-link"
        href={`${portfolio.person.github}?tab=repositories`}
        target="_blank"
        rel="noreferrer"
      >
        <AnimatedIcon hover="rotate"><Bubble size={16} variant="Bulk" /></AnimatedIcon>
        View all repositories on GitHub
        <ArrowRight size={16} variant="Linear" />
      </a>
    </section>
  );
}

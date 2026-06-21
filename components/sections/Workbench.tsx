import {
  ArrowRight,
  Bezier,
  Code1,
  Microscope,
  Send2,
  Setting2,
} from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlurText } from "@/components/ui/BlurText";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

const BENCH_ICONS = [Code1, Microscope, Bezier, Setting2];

export function Workbench() {
  return (
    <section className="section workbench-section" id="workbench" aria-labelledby="bench-title">
      <div className="bench">
        <ScrollReveal from="up">
          <div className="section-head">
            <p className="eyebrow">
              <span className="num">05</span>
              <AnimatedIcon hover="rotate"><Setting2 size={14} /></AnimatedIcon>
              <span>Workbench</span>
            </p>
            <BlurText
              as="h2"
              id="bench-title"
              text="Notes from the workbench."
              accent="workbench."
            />
            <p className="lede">
              Smaller threads pulled on between releases — self-imposed prompts
              that turn into shipping work later.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal from="up" stagger={90}>
          <div className="bench-rail">
            {portfolio.experiments.map((experiment, i) => {
              const Icon = BENCH_ICONS[i] ?? Code1;
              return (
                <div key={experiment.label} className="bench-row">
                  <div className="bench-row-mark">
                    <span className="bench-prompt" aria-hidden="true">
                      &gt;_
                    </span>
                    <AnimatedIcon><Icon size={18} variant="Bulk" /></AnimatedIcon>
                  </div>
                  <div className="bench-row-body">
                    <strong>{experiment.label}</strong>
                    <span>{experiment.detail}</span>
                  </div>
                  <div className="bench-row-status" aria-hidden="true">
                    <span className="bench-pulse" />
                    <span className="bench-status-label">running</span>
                  </div>
                  <ArrowRight size={18} variant="Linear" className="bench-row-arrow" />
                </div>
              );
            })}
            <div className="bench-cmd" aria-hidden="true">
              <span>$</span> ssh anshuman@portfolio.dev{" "}
              <span className="bench-cursor" />
              <AnimatedIcon><Send2 size={14} variant="Bulk" /></AnimatedIcon>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function Workbench() {
  return (
    <section className="section" id="workbench" aria-labelledby="bench-title">
      <div className="bench">
        <Reveal from="up">
          <div className="section-head">
            <p className="eyebrow">
              <span className="num">05</span> Workbench
            </p>
            <h2 id="bench-title">
              Notes from the <span className="accent-blue serif">workbench.</span>
            </h2>
            <p className="lede">
              Smaller threads pulled on between releases — self-imposed prompts
              that turn into shipping work later.
            </p>
          </div>
        </Reveal>

        <Reveal from="up" stagger={60}>
          <div className="bench-rail">
            {portfolio.experiments.map((experiment) => (
              <div key={experiment.label} className="bench-row">
                <div>
                  <strong>{experiment.label}</strong>
                  <span>{experiment.detail}</span>
                </div>
                <ArrowUpRight size={18} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

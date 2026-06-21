import { Calendar, MagicStar } from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlurText } from "@/components/ui/BlurText";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

export function TrackRecord() {
  return (
    <section className="section" id="track-record" aria-labelledby="track-title">
      <div className="track">
        <aside className="track-left">
          <ScrollReveal from="up">
            <p className="eyebrow">
              <span className="num">02</span>
              <AnimatedIcon><Calendar size={14} /></AnimatedIcon>
              <span>Track Record</span>
            </p>
            <BlurText
              as="h2"
              id="track-title"
              text="A public build history."
              accent="build"
            />
            <p>
              Five years of commits across local AI, computer vision, applied
              research and front-end. Every milestone maps to a repository
              that is still online.
            </p>
            <p className="track-meter">
              <AnimatedIcon><MagicStar size={14} variant="Bulk" /></AnimatedIcon>
              <span className="track-meter-value">2022 → 2026</span>
              <span className="track-meter-label">Years public</span>
            </p>
          </ScrollReveal>
        </aside>

        <ScrollReveal from="up" stagger={90} threshold={0.05}>
          <ol className="track-list">
            {portfolio.timeline.map((item, index) => (
              <li
                key={`${item.year}-${item.title}`}
                className="track-row"
              >
                <div className="track-mark" aria-hidden="true">
                  <span className="track-index">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="track-tick" />
                </div>
                <div className="track-body">
                  <span className="track-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  {item.meta && <span className="track-meta">{item.meta}</span>}
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}

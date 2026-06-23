import {
  Box,
  Brush2,
  Code,
  Cpu,
  Game,
} from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BlurText } from "@/components/ui/BlurText";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

const GROUP_ICONS = [Code, Cpu, Brush2, Box];

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="stack">
        <ScrollReveal from="up">
          <div className="section-head">
            <p className="eyebrow">
              <span className="num">03</span>
              <AnimatedIcon hover="rotate"><Game size={14} /></AnimatedIcon>
              <span>Stack</span>
            </p>
            <BlurText
              as="h2"
              id="stack-title"
              text="Tools selected for the problem."
              accent="problem."
            />
            <p className="lede">
              A grouped view of the technology I reach for — picked because it
              shipped, not because it was trending.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal from="up" stagger={100}>
          <div className="stack-groups">
            {portfolio.skills.map((group, i) => {
              const Icon = GROUP_ICONS[i] ?? Box;
              return (
                <div key={group.label} className="stack-group">
                  {group.image && (
                    <div className="stack-group-image" aria-hidden="true">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={group.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="stack-group-image-shade" />
                    </div>
                  )}
                  <span className="stack-group-label">
                    <AnimatedIcon><Icon size={16} variant="Bulk" /></AnimatedIcon>
                    {group.label}
                  </span>
                  <div className="stack-chips">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        <span className="chip-dot" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

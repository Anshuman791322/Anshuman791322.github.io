import { Calendar, Hashtag, Layer, Star1 } from "iconsax-react";

import { portfolio } from "@/data/portfolio";
import { CountUp } from "@/components/ui/CountUp";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";

// Server. Real stat values render in the static HTML; CountUp upgrades to anime.js.

const ICONS = [Hashtag, Layer, Calendar, Star1];

export function Stats() {
  return (
    <section className="stats-band" aria-label="Portfolio statistics">
      <div className="stats">
        {portfolio.stats.map((stat, i) => {
          const Icon = ICONS[i] ?? Hashtag;
          const suffix = "suffix" in stat ? stat.suffix : undefined;
          return (
            <div className="stat" key={stat.label}>
              <span className="stat-icon">
                <AnimatedIcon><Icon size={18} variant="Bulk" /></AnimatedIcon>
              </span>
              <div className="stat-value">
                <CountUp to={stat.value} />
                {suffix ? <span className="suffix">{suffix}</span> : null}
              </div>
              <span className="stat-label">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

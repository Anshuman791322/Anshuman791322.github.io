import { portfolio } from "@/data/portfolio";
import { CountUp } from "@/components/ui/CountUp";

// Server component. Renders real stat values in the static HTML so audits / SEO
// tools see them; the CountUp client island upgrades to an animated number once
// the section enters view.

export function Stats() {
  return (
    <section className="stats" aria-label="Portfolio statistics">
      {portfolio.stats.map((stat) => {
        const suffix = "suffix" in stat ? stat.suffix : undefined;
        return (
          <div className="stat" key={stat.label}>
            <div className="stat-value">
              <CountUp to={stat.value} />
              {suffix ? <span className="suffix">{suffix}</span> : null}
            </div>
            <span className="stat-label">{stat.label}</span>
          </div>
        );
      })}
    </section>
  );
}

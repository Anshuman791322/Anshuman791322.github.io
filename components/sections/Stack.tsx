import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="stack">
        <Reveal from="up">
          <div className="section-head">
            <p className="eyebrow">
              <span className="num">03</span> Stack
            </p>
            <h2 id="stack-title">
              Tools selected for the <span className="accent-blue serif">problem.</span>
            </h2>
            <p className="lede">
              A grouped view of the technology I reach for — picked because it
              shipped, not because it was trending.
            </p>
          </div>
        </Reveal>

        <Reveal from="up" stagger={70}>
          <div className="stack-groups">
            {portfolio.skills.map((group) => (
              <div key={group.label} className="stack-group">
                <span className="stack-group-label">{group.label}</span>
                <div className="stack-chips">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

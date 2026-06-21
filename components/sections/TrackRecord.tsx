import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function TrackRecord() {
  return (
    <section className="section" id="track-record" aria-labelledby="track-title">
      <div className="track">
        <aside className="track-left">
          <Reveal from="up">
            <p className="eyebrow">
              <span className="num">02</span> Track Record
            </p>
            <h2 id="track-title">
              A public <span className="accent-blue serif">build history.</span>
            </h2>
            <p>
              Five years of commits across local AI, computer vision, applied
              research and front-end. Every milestone maps to a repository
              that is still online.
            </p>
            <p className="track-meter">
              <span>2022 → 2026</span> · Years public
            </p>
          </Reveal>
        </aside>

        <Reveal from="up" stagger={70} threshold={0.05}>
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
        </Reveal>
      </div>
    </section>
  );
}

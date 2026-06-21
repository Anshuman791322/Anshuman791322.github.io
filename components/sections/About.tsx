import { Reveal } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    num: "01",
    title: "Local-first AI",
    body: "Tools that keep inference and interaction close to the user.",
  },
  {
    num: "02",
    title: "Applied research",
    body: "Classification work grounded in notebooks and observable data.",
  },
  {
    num: "03",
    title: "Real distribution",
    body: "From interface to a public release channel people can actually access.",
  },
  {
    num: "04",
    title: "Crafted surfaces",
    body: "Motion and detail held to a higher bar than the brief demands.",
  },
];

export function About() {
  return (
    <section className="section about-section">
      <div className="about">
        <Reveal from="up">
          <div className="section-head">
            <p className="eyebrow">
              <span className="num">01</span> About
            </p>
            <h2>
              Curiosity, <span className="accent-blue serif">shipped.</span>
            </h2>
            <p className="lede">
              I treat ideas as products from day one — design, build, package,
              publish. The four principles below shape every repo on this site.
            </p>
          </div>
        </Reveal>

        <Reveal from="up" stagger={70}>
          <div className="principles">
            {PRINCIPLES.map((p) => (
              <article key={p.num} className="principle">
                <span className="num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { portfolio } from "@/data/portfolio";

// Server component. Pure CSS @keyframes animation — no JS bundle cost.
// Doubled list creates the seamless infinite loop.

export function MarqueeBand() {
  const items = portfolio.marquee;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, idx) => (
          <span key={`${item}-${idx}`} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
      <div className="marquee-fade left" />
      <div className="marquee-fade right" />
    </div>
  );
}

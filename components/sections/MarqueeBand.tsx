import { portfolio } from "@/data/portfolio";

// Server component. CSS @keyframes ticker — zero JS animation cost.
// Inspired by React Bits LogoLoop, recreated to support text strings instead of logos.

export function MarqueeBand() {
  const items = portfolio.marquee;
  return (
    <div className="marquee-band-outer" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-track">
          {[...items, ...items].map((item, idx) => (
            <span key={`${item}-${idx}`} className="marquee-item">
              <span className="marquee-dot" />
              {item}
              <span className="marquee-slash">/</span>
            </span>
          ))}
        </div>
        <div className="marquee-fade left" />
        <div className="marquee-fade right" />
      </div>
    </div>
  );
}

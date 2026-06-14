"use client";

import { m, useReducedMotion } from "framer-motion";

type Props = {
  items: readonly string[];
  /** Seconds per full loop. Lower = faster. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
};

/** Infinite-loop horizontal ticker. Transform-only animation, no layout thrash. */
export function Marquee({ items, speed = 38, reverse = false }: Props) {
  const reducedMotion = useReducedMotion();
  const loop = reverse ? ["-50%", "0%"] : ["0%", "-50%"];

  return (
    <div className="marquee-band" aria-hidden="true">
      <m.div
        className="marquee-track"
        animate={reducedMotion ? undefined : { x: loop }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, idx) => (
          <span key={`${item}-${idx}`} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </m.div>
      <div className="marquee-fade marquee-fade-left" />
      <div className="marquee-fade marquee-fade-right" />
    </div>
  );
}

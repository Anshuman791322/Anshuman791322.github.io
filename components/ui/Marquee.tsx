"use client";

import { m, useReducedMotion } from "framer-motion";

type Props = {
  items: readonly string[];
  /** Seconds per full loop. Lower = faster. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
};

/** Infinite-loop horizontal ticker. Transform-only animation, no layout thrash.
 *  Under reduced motion the loop continues at half speed — a gentle drift that
 *  doesn't trigger vestibular issues but keeps the page feeling alive on phones
 *  with Reduce Motion / Low Power enabled. */
export function Marquee({ items, speed = 38, reverse = false }: Props) {
  const reducedMotion = useReducedMotion();
  const loop = reverse ? ["-50%", "0%"] : ["0%", "-50%"];
  const duration = reducedMotion ? speed * 2.4 : speed;

  return (
    <div className="marquee-band" aria-hidden="true">
      <m.div
        className="marquee-track"
        animate={{ x: loop }}
        transition={{
          duration,
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

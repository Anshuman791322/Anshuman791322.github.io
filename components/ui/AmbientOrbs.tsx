"use client";

import { m, useReducedMotion } from "framer-motion";

// Two large blurred orbs that drift slowly behind the entire page.
// Pure transform + opacity animation, GPU-friendly.
// Under reduced motion we slow the drift and shrink amplitude — never fully kill it,
// so the design language survives on phones with Low Power / Reduce Motion enabled.
export function AmbientOrbs() {
  const reducedMotion = useReducedMotion();
  const ampX = reducedMotion ? 10 : 30;
  const ampY = reducedMotion ? 8 : 20;
  const duration = reducedMotion ? 36 : 18;

  return (
    <div className="ambient-orbs" aria-hidden="true">
      <m.div
        className="ambient-orb orb-blue"
        animate={{ x: [0, ampX, -ampX / 3, 0], y: [0, -ampY, ampY / 2, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="ambient-orb orb-orange"
        animate={{ x: [0, -ampX * 0.7, ampX * 0.7, 0], y: [0, ampY * 0.75, -ampY / 2, 0] }}
        transition={{ duration: duration + 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

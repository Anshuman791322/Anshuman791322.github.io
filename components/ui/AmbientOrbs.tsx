"use client";

import { m, useReducedMotion } from "framer-motion";

// Two large blurred orbs that drift slowly behind the entire page.
// Pure transform + opacity animation, GPU-friendly.
export function AmbientOrbs() {
  const reducedMotion = useReducedMotion();
  const float = reducedMotion
    ? undefined
    : { x: [0, 30, -10, 0], y: [0, -20, 10, 0] };

  return (
    <div className="ambient-orbs" aria-hidden="true">
      <m.div
        className="ambient-orb orb-blue"
        animate={float}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="ambient-orb orb-orange"
        animate={reducedMotion ? undefined : { x: [0, -20, 20, 0], y: [0, 15, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

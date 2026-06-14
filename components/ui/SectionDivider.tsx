"use client";

import { m, useReducedMotion } from "framer-motion";

import { drawPath, easeInOut } from "@/lib/motion";

type Props = {
  /** Unique id for the gradient ref so multiple dividers don't collide. */
  id: string;
};

export function SectionDivider({ id }: Props) {
  const reducedMotion = useReducedMotion();
  const gradientId = `dividerGradient-${id}`;

  return (
    <svg
      className="section-divider"
      viewBox="0 0 1180 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#7DB7FF" stopOpacity="0" />
          <stop offset="20%" stopColor="#7DB7FF" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#FF8A3D" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7DB7FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <m.path
        d="M0 40 C 240 8, 480 64, 720 32 S 1180 12, 1180 36"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.4}
        variants={reducedMotion ? undefined : drawPath}
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.4 }}
        animate={reducedMotion ? { pathLength: 1, opacity: 1 } : undefined}
      />

      <m.circle
        cx={170}
        cy={28}
        r={3}
        className="node"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5, ease: easeInOut }}
      />
      <m.circle
        cx={1000}
        cy={32}
        r={3}
        className="node"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5, ease: easeInOut }}
      />
    </svg>
  );
}

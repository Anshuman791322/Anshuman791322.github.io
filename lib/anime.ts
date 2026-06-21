import { cubicBezier } from "animejs";

// Shared motion tokens. Keep this file framework-agnostic so it can be re-used
// by anime.js, CSS variables, and direct DOM listeners without importing React.

export const EASE = {
  // Inspired by cubic-bezier(0.16, 1, 0.3, 1) — calm but confident easing.
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
} as const;

export const DURATIONS = {
  fast: 320,
  base: 540,
  slow: 900,
} as const;

export const SMOOTH_EASE = cubicBezier(0.16, 1, 0.3, 1);

/** True when the user has requested reduced motion. SSR-safe (returns false on server). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

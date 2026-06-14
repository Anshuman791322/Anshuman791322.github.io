import type { Transition, Variants } from "framer-motion";

// Shared easings and timings — keep the entire site on the same motion language.
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const spring = {
  soft: { type: "spring", stiffness: 220, damping: 26 } as const,
  snappy: { type: "spring", stiffness: 360, damping: 28 } as const,
  cursor: { type: "spring", stiffness: 520, damping: 38 } as const,
} as const;

export const durations = {
  fast: 0.35,
  base: 0.65,
  slow: 1.0,
} as const;

const baseTransition: Transition = {
  duration: durations.base,
  ease: easeOut,
};

export const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { ...baseTransition, duration: 0.8 } },
};

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base, ease: easeOut } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

export const staggerTight: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: easeInOut },
  },
};

// Reduced-motion friendly fade — same shape as `reveal` so consumers can swap.
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

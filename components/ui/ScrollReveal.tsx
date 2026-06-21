"use client";

import { animate, onScroll, stagger as staggerDelay } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion, SMOOTH_EASE } from "@/lib/anime";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  /** Stagger across direct children (in ms). 0 = animate the wrapper only. */
  stagger?: number;
  from?: "up" | "down" | "left" | "right";
  distance?: number;
  preserveInitial?: boolean;
};

/** Free port of the React Bits AnimatedContent / ScrollReveal pattern.
 *  Anime.js drives a timeline on intersect; respects reduced motion. */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 720,
  threshold = 0.1,
  stagger = 80,
  from = "up",
  distance = 32,
  preserveInitial = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const targets = stagger
      ? (Array.from(node.children) as HTMLElement[])
      : [node];
    if (targets.length === 0) return;

    const reduced = prefersReducedMotion();
    targets.forEach((t) => {
      t.style.opacity = reduced || preserveInitial ? "1" : "0";
      t.style.willChange = "transform, opacity";
    });

    if (reduced) return;

    const xOff = from === "left" ? distance : from === "right" ? -distance : 0;
    const yOff = from === "up" ? distance : from === "down" ? -distance : 0;
    if (!preserveInitial) {
      targets.forEach((t) => {
        t.style.transform = `translate3d(${xOff}px, ${yOff}px, 0)`;
      });
    }

    const scrollObserver = onScroll({
      target: node,
      enter: `${Math.round(threshold * 100)}% bottom`,
      leave: "bottom top",
      repeat: false,
      onEnter: () => {
        animate(targets, {
          opacity: preserveInitial ? [1, 1] : [0, 1],
          translateX: from === "left" || from === "right" ? [xOff, 0] : 0,
          translateY: from === "up" || from === "down" ? [yOff, 0] : 0,
          duration,
          delay: staggerDelay(stagger, { start: delay }),
          ease: SMOOTH_EASE,
        });
      },
    });
    const fallback = window.setTimeout(() => {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
    }, delay + duration + targets.length * stagger + 800);
    return () => {
      window.clearTimeout(fallback);
      scrollObserver.revert();
    };
  }, [delay, duration, threshold, stagger, from, distance, preserveInitial]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

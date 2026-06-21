"use client";

import anime from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

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
      t.style.opacity = reduced ? "1" : "0";
      t.style.willChange = "transform, opacity";
    });

    if (reduced) return;

    const xOff = from === "left" ? distance : from === "right" ? -distance : 0;
    const yOff = from === "up" ? distance : from === "down" ? -distance : 0;
    targets.forEach((t) => {
      t.style.transform = `translate3d(${xOff}px, ${yOff}px, 0)`;
    });

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !played) {
          played = true;
          anime({
            targets,
            opacity: [0, 1],
            translateX: from === "left" || from === "right" ? [xOff, 0] : 0,
            translateY: from === "up" || from === "down" ? [yOff, 0] : 0,
            duration,
            delay: anime.stagger(stagger, { start: delay }),
            easing: "cubicBezier(0.16, 1, 0.3, 1)",
          });
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, duration, threshold, stagger, from, distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

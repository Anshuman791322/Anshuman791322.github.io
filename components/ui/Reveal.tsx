"use client";

import anime from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

import { DURATIONS, prefersReducedMotion } from "@/lib/anime";

type Direction = "up" | "down" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  /** Direction the element enters from. Defaults to "up". */
  from?: Direction;
  /** Stagger amount in ms between children. */
  stagger?: number;
  /** Delay in ms before the first child animates. */
  delay?: number;
  /** Duration in ms. */
  duration?: number;
  /** Amount of element (0–1) that must be in view to trigger. */
  threshold?: number;
  /** Optional className to forward to the wrapper. */
  className?: string;
};

const OFFSET = 28;

function translateFor(direction: Direction): [string, [number, number]] {
  switch (direction) {
    case "down":
      return ["translateY", [-OFFSET, 0]];
    case "left":
      return ["translateX", [OFFSET, 0]];
    case "right":
      return ["translateX", [-OFFSET, 0]];
    case "fade":
      return ["translateY", [0, 0]];
    case "up":
    default:
      return ["translateY", [OFFSET, 0]];
  }
}

/**
 * Animates direct DOM children into view with anime.js. Pure transform + opacity.
 * Triggered by IntersectionObserver, fires once per element. Under reduced motion
 * it sets opacity to 1 immediately with no movement.
 */
export function Reveal({
  children,
  from = "up",
  stagger = 80,
  delay = 0,
  duration = DURATIONS.base,
  threshold = 0.12,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.children) as HTMLElement[];
    if (targets.length === 0) return;

    const reduced = prefersReducedMotion();

    targets.forEach((node) => {
      node.style.opacity = reduced ? "1" : "0";
      node.style.willChange = "transform, opacity";
    });

    if (reduced) return;

    const [prop, range] = translateFor(from);
    targets.forEach((node) => {
      node.style.transform = `${prop}(${range[0]}px)`;
    });

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            anime({
              targets,
              opacity: [0, 1],
              [prop]: range,
              delay: anime.stagger(stagger, { start: delay }),
              duration,
              easing: "cubicBezier(0.16, 1, 0.3, 1)",
            });
            observer.disconnect();
            return;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [from, stagger, delay, duration, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

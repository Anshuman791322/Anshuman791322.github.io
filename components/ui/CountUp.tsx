"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

import { DURATIONS, prefersReducedMotion } from "@/lib/anime";

type Props = {
  to: number;
  duration?: number;
  format?: (value: number) => string;
};

/**
 * Animates a number from 0 → `to` once the element scrolls into view.
 * Anime.js drives the scalar; we write the formatted output into a ref-bound
 * span so React does not re-render every frame.
 */
export function CountUp({ to, duration = DURATIONS.slow, format }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fmt = format ?? ((v: number) => Math.round(v).toString());

    if (prefersReducedMotion()) {
      node.textContent = fmt(to);
      return;
    }

    node.textContent = fmt(0);
    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played) {
            played = true;
            const obj = { value: 0 };
            animate(obj, {
              value: to,
              round: 1,
              duration,
              ease: "cubicBezier(0.16, 1, 0.3, 1)",
              onUpdate: () => {
                node.textContent = fmt(obj.value);
              },
            });
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration, format]);

  return <span ref={ref}>0</span>;
}

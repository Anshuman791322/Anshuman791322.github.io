"use client";

import { type ReactNode, type MouseEvent, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * React Bits SpotlightCard pattern adapted for the case-study outro.
 * Pure CSS-vars approach — no JS animation runtime needed. Mousemove writes
 * --case-mx / --case-my; the ::before pseudo paints a radial gradient at that
 * coordinate. Falls back to a static glow on touch.
 *
 * https://reactbits.dev/components/spotlight-card
 */
export function CaseSpotlight({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--case-mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--case-my", `${event.clientY - rect.top}px`);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className={`case-spotlight ${className}`}
    >
      {children}
    </section>
  );
}

"use client";

import { type ReactNode, useEffect, useRef } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  /** Distance in px around the element that triggers the magnet. */
  padding?: number;
  /** Cursor offset / strength. 2 = half the distance to centre. */
  strength?: number;
};

/**
 * React Bits Magnet pattern adapted for the case-study primary CTA.
 * Gated to (hover: hover) + (pointer: fine) and prefers-reduced-motion: no-preference
 * so touch and accessibility-conscious viewers get a plain button.
 *
 * https://reactbits.dev/animations/magnet
 */
export function CaseMagnet({
  href,
  children,
  className = "",
  external = false,
  padding = 80,
  strength = 2,
}: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wantsMotion = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!wantsMotion.matches) return;

    const el = ref.current;
    if (!el) return;

    function handleMove(event: PointerEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const inside =
        Math.abs(dx) < rect.width / 2 + padding &&
        Math.abs(dy) < rect.height / 2 + padding;
      if (inside) {
        node.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        node.style.transition = "transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)";
      } else if (node.style.transform) {
        node.style.transform = "translate3d(0, 0, 0)";
        node.style.transition = "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)";
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [padding, strength]);

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={{ willChange: "transform" }}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </a>
  );
}

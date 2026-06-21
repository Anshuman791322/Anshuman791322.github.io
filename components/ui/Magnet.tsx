"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  /** Activation radius in px around the element. */
  padding?: number;
  /** Higher = less travel. Default 2 (so cursor offset / 2). */
  strength?: number;
  /** Internal hash link uses next/link; external opens in new tab. */
  external?: boolean;
  ariaLabel?: string;
};

/** Free port of the React Bits Magnet pattern. Global mousemove with a
 *  proximity radius — when the pointer enters the radius, the inner element
 *  follows it with a soft transform; outside, it springs back. */
export function Magnet({
  href,
  className,
  children,
  padding = 80,
  strength = 2.2,
  external,
  ariaLabel,
}: Props) {
  const innerRef = useRef<HTMLSpanElement | null>(null);
  const outerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    function handleMove(event: MouseEvent) {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const rect = outer.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.abs(cx - event.clientX);
      const dy = Math.abs(cy - event.clientY);
      if (dx < rect.width / 2 + padding && dy < rect.height / 2 + padding) {
        const ox = (event.clientX - cx) / strength;
        const oy = (event.clientY - cy) / strength;
        inner.style.transition = "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)";
        inner.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      } else {
        inner.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        inner.style.transform = "translate3d(0, 0, 0)";
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [padding, strength]);

  const inner = (
    <span
      ref={innerRef}
      style={{ display: "inline-flex", willChange: "transform" }}
    >
      {children}
    </span>
  );

  if (external) {
    return (
      <a
        ref={outerRef}
        href={href}
        className={className}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noreferrer"
        aria-label={ariaLabel}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link ref={outerRef} href={href} className={className} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}

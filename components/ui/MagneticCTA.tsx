"use client";

import anime from "animejs";
import Link from "next/link";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  /** External link opens in new tab; internal hash links use Link. */
  external?: boolean;
};

/**
 * Hand-rolled magnetic button (React Bits pattern, recreated to dodge licensing
 * ambiguity). Gated to large screens + non-reduced motion. Anime.js drives the
 * spring, no continuous rAF loop.
 */
export function MagneticCTA({ href, className, children, external }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    if (!mq.matches) return;

    function handleMove(event: PointerEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.22;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
      anime.remove(node);
      anime({
        targets: node,
        translateX: x,
        translateY: y,
        duration: 220,
        easing: "easeOutQuad",
      });
    }

    function handleLeave() {
      const node = ref.current;
      if (!node) return;
      anime.remove(node);
      anime({
        targets: node,
        translateX: 0,
        translateY: 0,
        duration: 420,
        easing: "easeOutElastic(1, 0.6)",
      });
    }

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      anime.remove(el);
    };
  }, []);

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href} className={className}>
      {children}
    </Link>
  );
}

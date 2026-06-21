"use client";

import anime from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stroke-draw inner SVG paths on intersect. */
  draw?: boolean;
  /** Continuous gentle spin on the SVG (decorative, opt-in). */
  spin?: boolean;
  /** Hover micro-motion on the SVG. */
  hover?: "rotate" | "translate" | "scale" | "none";
};

/**
 * Wraps any SVG (typically an iconsax-react icon rendered as a child by the
 * server) and applies Anime.js animations. By taking children instead of an
 * icon component prop, this stays safe across the RSC/Client boundary.
 *
 * Animations applied:
 *  - draw: stroke-dashoffset reveal via getTotalLength()
 *  - hover: small rotate/translate/scale on enter, elastic settle on leave
 *  - spin: gentle continuous rotation (CSS-driven; opt-in)
 */
export function AnimatedIcon({
  children,
  className = "",
  draw = true,
  spin = false,
  hover = "rotate",
}: Props) {
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const svg = wrapper.querySelector<SVGSVGElement>("svg");
    if (!svg) return;

    const reduced = prefersReducedMotion();
    const cleanupFns: Array<() => void> = [];

    if (draw && !reduced) {
      const paths = Array.from(
        svg.querySelectorAll<SVGGeometryElement>(
          "path, line, rect, polyline, polygon, circle",
        ),
      );
      paths.forEach((p) => {
        try {
          const len = p.getTotalLength?.();
          if (len && len > 0) {
            p.style.strokeDasharray = `${len}`;
            p.style.strokeDashoffset = `${len}`;
          }
        } catch {
          /* element doesn't support getTotalLength */
        }
      });

      let played = false;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting) && !played) {
            played = true;
            anime({
              targets: paths,
              strokeDashoffset: [anime.setDashoffset, 0],
              duration: 900,
              delay: anime.stagger(40),
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(wrapper);
      cleanupFns.push(() => observer.disconnect());
    }

    if (hover !== "none" && !reduced) {
      const handleEnter = () => {
        anime.remove(svg);
        const target =
          hover === "rotate"
            ? { rotate: 12 }
            : hover === "translate"
              ? { translateY: -3 }
              : { scale: 1.12 };
        anime({ targets: svg, duration: 220, easing: "easeOutQuad", ...target });
      };
      const handleLeave = () => {
        anime.remove(svg);
        anime({
          targets: svg,
          duration: 420,
          easing: "easeOutElastic(1, 0.6)",
          rotate: 0,
          translateY: 0,
          scale: 1,
        });
      };
      wrapper.addEventListener("mouseenter", handleEnter);
      wrapper.addEventListener("mouseleave", handleLeave);
      cleanupFns.push(() => {
        wrapper.removeEventListener("mouseenter", handleEnter);
        wrapper.removeEventListener("mouseleave", handleLeave);
      });
    }

    cleanupFns.push(() => anime.remove(svg));
    return () => cleanupFns.forEach((fn) => fn());
  }, [draw, hover]);

  return (
    <span
      ref={wrapperRef}
      className={`animated-icon ${spin ? "spin" : ""} ${className}`}
      style={{ display: "inline-flex" }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

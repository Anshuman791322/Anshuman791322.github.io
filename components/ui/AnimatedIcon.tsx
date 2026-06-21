"use client";

import { animate, stagger, svg as animeSvg, utils } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stroke-draw inner SVG paths on intersect. Default OFF — most Iconsax
   *  variants (Bulk/Bold) are fill-based, where dasharray tricks make icons
   *  look broken. Opt in only on stroke-only Linear/Outline icons. */
  draw?: boolean;
  /** Continuous gentle CSS spin (decorative, opt-in). */
  spin?: boolean;
  /** Hover micro-motion on the SVG. */
  hover?: "rotate" | "translate" | "scale" | "none";
};

/** Wraps any SVG (typically an Iconsax-React icon rendered as a child by the
 *  server) and applies Anime.js micro-motion. Taking children (not an icon
 *  component) keeps this safe across the RSC/Client boundary. */
export function AnimatedIcon({
  children,
  className = "",
  draw = false,
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
      ).filter((p) => {
        // Only animate paths that actually have a stroke (skip fill-only).
        const stroke = window.getComputedStyle(p).stroke;
        return stroke && stroke !== "none";
      });

      if (paths.length > 0) {
        let played = false;
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting) && !played) {
              played = true;
              animate(animeSvg.createDrawable(paths), {
                draw: ["0 0", "0 1"],
                duration: 900,
                delay: stagger(40),
                ease: "outCubic",
              });
              observer.disconnect();
            }
          },
          { threshold: 0.4 },
        );
        observer.observe(wrapper);
        cleanupFns.push(() => observer.disconnect());
      }
    }

    if (hover !== "none" && !reduced) {
      const handleEnter = () => {
        utils.remove(svg);
        const target =
          hover === "rotate"
            ? { rotate: 12 }
            : hover === "translate"
              ? { translateY: -3 }
              : { scale: 1.12 };
        animate(svg, { duration: 220, ease: "outQuad", ...target });
      };
      const handleLeave = () => {
        utils.remove(svg);
        animate(svg, {
          duration: 420,
          ease: "outElastic(1, .6)",
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

    cleanupFns.push(() => utils.remove(svg));
    return () => cleanupFns.forEach((fn) => fn());
  }, [draw, hover]);

  return (
    <span
      ref={wrapperRef}
      className={`animated-icon ${spin ? "spin" : ""} ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

"use client";

import anime from "animejs";
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
                complete: () => {
                  // Remove dasharray once done so the icon stays clean.
                  paths.forEach((p) => {
                    p.style.strokeDasharray = "";
                    p.style.strokeDashoffset = "";
                  });
                },
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
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

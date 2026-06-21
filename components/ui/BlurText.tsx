"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";

import { prefersReducedMotion, SMOOTH_EASE } from "@/lib/anime";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  duration?: number;
  threshold?: number;
  accent?: string;
  id?: string;
};

/** Free recreation of the React Bits BlurText pattern (original uses motion/react).
 *  Each word eases from filter: blur(10px) to blur(0). Preserves whitespace
 *  with non-breaking spaces between words so the flex container doesn't
 *  collapse spacing. */
export function BlurText({
  text,
  className = "",
  as: As = "span",
  delay = 90,
  duration = 720,
  threshold = 0.1,
  accent,
  id,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const items = Array.from(node.querySelectorAll<HTMLElement>(".blur-item"));
    if (items.length === 0) return;

    const reduced = prefersReducedMotion();
    items.forEach((item) => {
      item.style.opacity = reduced ? "1" : "0";
      item.style.filter = reduced ? "none" : "blur(10px)";
      item.style.transform = reduced ? "none" : "translateY(20px)";
      item.style.willChange = "transform, opacity, filter";
    });
    if (reduced) return;

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !played) {
          played = true;
          animate(items, {
            opacity: [0, 1],
            translateY: [20, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration,
            delay: stagger(delay),
            ease: SMOOTH_EASE,
          });
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, delay, duration, threshold]);

  // Split on whitespace, keep words. Append non-breaking space after each
  // non-last word so the inline-block words don't collapse together.
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <As
      ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`blur-parent ${className}`}
      id={id}
    >
      {words.map((word, i) => {
        const isAccent = accent && word.toLowerCase() === accent.toLowerCase();
        return (
          <span
            key={`${word}-${i}`}
            className={`blur-item ${isAccent ? "accent-orange" : ""}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </As>
  );
}

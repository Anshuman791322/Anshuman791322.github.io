"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  duration?: number;
  /** Split by words (default) or chars. */
  by?: "words" | "chars";
  threshold?: number;
  accent?: string;
  id?: string;
};

/** Free recreation of the React Bits BlurText pattern (which uses motion/react).
 *  Each word eases from filter: blur(10px) to blur(0). Triggered on intersect.
 *  Preserves semantic text and respects reduced motion. */
export function BlurText({
  text,
  className = "",
  as: As = "span",
  delay = 90,
  duration = 720,
  by = "words",
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
          anime({
            targets: items,
            opacity: [0, 1],
            translateY: [20, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration,
            delay: anime.stagger(delay),
            easing: "cubicBezier(0.16, 1, 0.3, 1)",
          });
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, by, delay, duration, threshold]);

  function renderTokens(input: string, mode: "words" | "chars") {
    const tokens = mode === "words" ? input.split(/(\s+)/) : Array.from(input);
    return tokens.map((token, i) => {
      if (mode === "words" && /^\s+$/.test(token)) return token;
      const isAccent = accent && token.toLowerCase() === accent.toLowerCase();
      return (
        <span
          key={`${token}-${i}`}
          className={`blur-item ${isAccent ? "accent-orange" : ""}`}
          style={{ display: "inline-block" }}
        >
          {token}
        </span>
      );
    });
  }

  return (
    <As
      ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      id={id}
    >
      {renderTokens(text, by)}
    </As>
  );
}

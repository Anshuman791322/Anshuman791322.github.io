"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Stagger delay between chars in ms. */
  delay?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Trigger immediately on mount; otherwise via IntersectionObserver. */
  immediate?: boolean;
  threshold?: number;
  /** Initial delay before first char (ms). */
  startDelay?: number;
};

/** Free recreation of the React Bits SplitText pattern.
 *  Word-safe: each WORD is an inline-block container with white-space: nowrap,
 *  so the browser only breaks BETWEEN words, never inside them. Characters
 *  within each word are inline-block spans that anime.js can animate
 *  independently. Preserves semantic text (still selectable + accessible). */
export function SplitText({
  text,
  className = "",
  as: As = "span",
  delay = 26,
  duration = 720,
  immediate = false,
  threshold = 0.1,
  startDelay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const chars = Array.from(
      node.querySelectorAll<HTMLElement>(".split-char"),
    );
    if (chars.length === 0) return;

    const reduced = prefersReducedMotion();
    if (reduced) {
      chars.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }

    chars.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(50%) rotate(4deg)";
      c.style.willChange = "transform, opacity";
    });

    function play() {
      anime({
        targets: chars,
        translateY: ["50%", "0%"],
        rotate: [4, 0],
        opacity: [0, 1],
        duration,
        delay: anime.stagger(delay, { start: startDelay }),
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    if (immediate) {
      if (document.fonts?.status === "loaded") {
        play();
      } else if (document.fonts?.ready) {
        document.fonts.ready.then(play);
      } else {
        play();
      }
      return;
    }

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !played) {
          played = true;
          play();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, delay, duration, immediate, threshold, startDelay]);

  // Word-safe splitting. Each word stays together; chars inside animate
  // individually. Whitespace tokens are preserved as text nodes between words.
  const tokens = text.split(/(\s+)/);

  return (
    <As
      ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`split-parent ${className}`}
    >
      {tokens.map((token, ti) => {
        if (/^\s+$/.test(token)) {
          // Preserve whitespace as a regular text node so the browser
          // can break between words naturally.
          return <span key={`s${ti}`}>{token}</span>;
        }
        return (
          <span
            key={`w${ti}`}
            className="split-word"
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            {Array.from(token).map((ch, ci) => (
              <span
                key={`c${ti}-${ci}`}
                className="split-char"
                style={{ display: "inline-block" }}
              >
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </As>
  );
}

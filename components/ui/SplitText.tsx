"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  text: string;
  className?: string;
  /** Visual element tag — h1, h2, span, p, etc. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Stagger delay between chars in ms. */
  delay?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Trigger immediately on mount (true) or via IntersectionObserver (false). */
  immediate?: boolean;
  /** Threshold for IntersectionObserver (0-1). */
  threshold?: number;
  /** Initial delay before first char (ms). */
  startDelay?: number;
  /** Highlight word as accent (renders inside <span class="accent-orange">). */
  accent?: string;
};

/** Free recreation of the React Bits SplitText pattern (which uses GSAP SplitText).
 *  Splits text into per-character spans and reveals them via anime.js stagger.
 *  Preserves semantic text (still readable + selectable in DOM). */
export function SplitText({
  text,
  className = "",
  as: As = "span",
  delay = 28,
  duration = 720,
  immediate = false,
  threshold = 0.1,
  startDelay = 0,
  accent,
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
      c.style.transform = "translateY(40%)";
      c.style.willChange = "transform, opacity";
    });

    let played = false;

    function play() {
      if (played) return;
      played = true;
      anime({
        targets: chars,
        translateY: ["40%", "0%"],
        opacity: [0, 1],
        duration,
        delay: anime.stagger(delay, { start: startDelay }),
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }

    if (immediate) {
      // Wait for fonts so we don't get layout jump on play.
      if (document.fonts?.status === "loaded") {
        play();
      } else {
        document.fonts?.ready.then(play);
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, accent, delay, duration, immediate, threshold, startDelay]);

  // Split into chars preserving spaces. The accent word, if present and found,
  // gets wrapped in a span so the accent style applies — chars still individual.
  function renderChars(input: string, accentWord?: string) {
    if (accentWord) {
      const lc = input.toLowerCase();
      const idx = lc.indexOf(accentWord.toLowerCase());
      if (idx >= 0) {
        const before = input.slice(0, idx);
        const accentText = input.slice(idx, idx + accentWord.length);
        const after = input.slice(idx + accentWord.length);
        return (
          <>
            {renderCharsRaw(before)}
            <span className="accent-orange">{renderCharsRaw(accentText)}</span>
            {renderCharsRaw(after)}
          </>
        );
      }
    }
    return renderCharsRaw(input);
  }

  function renderCharsRaw(input: string) {
    return Array.from(input).map((ch, i) => (
      <span
        className="split-char"
        key={`${ch}-${i}`}
        style={{ display: "inline-block", whiteSpace: "pre" }}
      >
        {ch}
      </span>
    ));
  }

  // Reflow each line by splitting on \n.
  const lines = text.split("\n");

  return (
    <As
      ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`split-parent ${className}`}
    >
      {lines.map((line, i) => (
        <span className="split-line" key={i} style={{ display: "block", overflow: "hidden" }}>
          {renderChars(line, accent)}
        </span>
      ))}
    </As>
  );
}

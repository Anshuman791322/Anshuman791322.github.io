"use client";

import { animate, type JSAnimation } from "animejs";
import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

/** Edge-to-edge ambient backdrop. Three drifting glow orbs animated with
 *  Anime.js, plus a CSS-vars-based cursor glow that follows the pointer on
 *  desktop only (hover + fine pointer). Pure transform + opacity. */
export function Ambient() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const reduced = prefersReducedMotion();

    // Drift the orbs slowly. Anime.js loops with yoyo for a gentle figure-eight.
    const orbs = Array.from(
      layer.querySelectorAll<HTMLElement>(".ambient-orb"),
    );

    const tweens: JSAnimation[] = [];
    if (!reduced && orbs.length > 0) {
      orbs.forEach((orb, i) => {
        const ampX = 60 + i * 14;
        const ampY = 40 + i * 10;
        const duration = 14000 + i * 5000;
        const tween = animate(orb, {
          translateX: [
            { to: ampX, duration, ease: "inOutSine" },
            { to: -ampX * 0.7, duration: duration + 2000, ease: "inOutSine" },
            { to: 0, duration, ease: "inOutSine" },
          ],
          translateY: [
            { to: -ampY, duration, ease: "inOutSine" },
            { to: ampY * 0.8, duration: duration + 2000, ease: "inOutSine" },
            { to: 0, duration, ease: "inOutSine" },
          ],
          loop: true,
          delay: i * 800,
        });
        tweens.push(tween);
      });
    }

    // Cursor-follow glow — desktop only, no element rendered, just CSS vars.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    let removeCursor: (() => void) | null = null;
    if (mq.matches && !reduced) {
      const handleMove = (event: PointerEvent) => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      };
      window.addEventListener("pointermove", handleMove, { passive: true });
      document.documentElement.classList.add("has-cursor-glow");
      removeCursor = () => {
        window.removeEventListener("pointermove", handleMove);
        document.documentElement.classList.remove("has-cursor-glow");
      };
    }

    return () => {
      tweens.forEach((t) => t.pause());
      if (removeCursor) removeCursor();
    };
  }, []);

  return (
    <div className="ambient" ref={layerRef} aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orb orb-blue" />
      <div className="ambient-orb orb-orange" />
      <div className="ambient-orb orb-violet" />
      <div className="cursor-glow" />
    </div>
  );
}

"use client";

import { animate, utils } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  children: ReactNode;
  className?: string;
  /** Tilt amplitude in degrees at the corners. */
  amplitude?: number;
  /** Scale on hover. */
  scaleOnHover?: number;
  /** Glare overlay opacity on hover (0–1). 0 disables glare. */
  glare?: number;
};

/** Free port of React Bits TiltedCard (original uses motion/react springs).
 *  Pure DOM transforms — anime.js eases the transform on enter/leave only.
 *  Mousemove writes the transform directly for zero-latency tracking. */
export function TiltCard({
  children,
  className = "",
  amplitude = 10,
  scaleOnHover = 1.02,
  glare = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Gate to hover+fine pointer + no reduced motion.
    if (prefersReducedMotion()) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const el = ref.current;
    const glareEl = glareRef.current;
    if (!el) return;
    const state = { rotateX: 0, rotateY: 0, scale: 1 };

    function writeTransform(node: HTMLElement) {
      node.style.transform = `perspective(900px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale(${state.scale})`;
    }

    function handleMove(event: MouseEvent) {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
      const rotX = -offsetY * amplitude;
      const rotY = offsetX * amplitude;
      state.rotateX = rotX;
      state.rotateY = rotY;
      state.scale = scaleOnHover;
      writeTransform(node);
      if (glareEl) {
        const px = (offsetX + 0.5) * 100;
        const py = (offsetY + 0.5) * 100;
        glareEl.style.background = `radial-gradient(420px circle at ${px}% ${py}%, rgba(167, 243, 208, ${glare}), transparent 60%)`;
        glareEl.style.opacity = "1";
      }
    }

    function handleEnter() {
      const node = ref.current;
      if (!node) return;
      utils.remove(state);
      animate(state, {
        duration: 200,
        ease: "outQuad",
        scale: scaleOnHover,
        onUpdate: () => writeTransform(node),
      });
    }

    function handleLeave() {
      const node = ref.current;
      if (!node) return;
      utils.remove(state);
      animate(state, {
        duration: 600,
        ease: "outElastic(1, .6)",
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        onUpdate: () => writeTransform(node),
      });
      if (glareEl) {
        glareEl.style.opacity = "0";
      }
    }

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      utils.remove(state);
    };
  }, [amplitude, scaleOnHover, glare]);

  return (
    <div ref={ref} className={`tilt-card ${className}`}>
      {children}
      {glare > 0 && (
        <div
          ref={glareRef}
          className="tilt-card-glare"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

"use client";

import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 38 });
  const springY = useSpring(y, { stiffness: 520, damping: 38 });

  useEffect(() => {
    if (reducedMotion) return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 11);
      y.set(event.clientY - 11);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor]")));
    };

    update();
    query.addEventListener("change", update);
    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reducedMotion, x, y]);

  if (!enabled) return null;
  return (
    <m.div
      aria-hidden="true"
      className="custom-cursor"
      style={{ x: springX, y: springY }}
      animate={{ scale: active ? 2.2 : 1, opacity: active ? 0.55 : 0.95 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    />
  );
}

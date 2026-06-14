"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  duration?: number;
  format?: (value: number) => string;
};

export function CountUp({ to, duration = 1.6, format }: Props) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) =>
    format ? format(latest) : Math.round(latest).toString(),
  );

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, to, duration, value, reducedMotion]);

  // Write the formatted string into the span via onChange.
  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = latest;
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref}>
      {format ? format(0) : "0"}
    </span>
  );
}

"use client";

import { useEffect } from "react";

import Lenis from "lenis";

/** Initialize Lenis smooth scrolling once per mount; respects reduced-motion. */
export function useLenis(reducedMotion: boolean | null) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.2,
      smoothWheel: !reducedMotion,
      lerp: 0.1,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);
}

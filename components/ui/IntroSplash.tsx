"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "intro-shown";
const AUTO_DISMISS_MS = 1700;

export function IntroSplash() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show once per browser session.
    const shown = sessionStorage.getItem(STORAGE_KEY);
    if (!shown) setVisible(true);
  }, []);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, dismiss]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="intro-splash"
          role="dialog"
          aria-label="Intro overlay"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          onClick={dismiss}
        >
          <div className="intro-mark">
            <m.div
              className="intro-glyph"
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              AS
            </m.div>
            <div className="intro-meta">
              <span>Anshuman</span>
              <div className="intro-bar" aria-hidden="true">
                <m.div
                  className="intro-bar-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: reducedMotion ? 0 : (AUTO_DISMISS_MS - 200) / 1000,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <span>Singh</span>
            </div>
          </div>
          <button type="button" className="intro-skip" onClick={dismiss}>
            Skip · Esc
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}

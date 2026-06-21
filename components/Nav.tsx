"use client";

import { animate, stagger, utils } from "animejs";
import {
  ArrowUp,
  Briefcase,
  CloseSquare,
  Element4,
  Send2,
  TextalignJustifycenter,
} from "iconsax-react";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { portfolio } from "@/data/portfolio";
import { prefersReducedMotion, SMOOTH_EASE } from "@/lib/anime";

const NAV = portfolio.nav;
const ITEM_IDS = NAV.map((n) => n.id);

/** PillNav-inspired (React Bits, https://reactbits.dev/components/pill-nav)
 *  re-implementation in Anime.js:
 *  - Animated active pill that slides between nav items
 *  - Hover circle bloom on each item
 *  - Mobile: staggered menu open via anime.js timeline */
export function Nav() {
  const [active, setActive] = useState<string>(NAV[0].id);
  const [open, setOpen] = useState(false);

  const railRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileListRef = useRef<HTMLUListElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  // Scroll spy
  useEffect(() => {
    const sections = ITEM_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const marker = window.innerHeight * 0.38;
      let next = sections[0].id;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= marker && rect.bottom > 96) {
          next = section.id;
        }
      }
      setActive((current) => (current === next ? current : next));
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, []);

  // Position/animate the active pill indicator
  const positionIndicator = useCallback(
    (instant = false) => {
      const rail = railRef.current;
      const indicator = indicatorRef.current;
      const itemEl = itemRefs.current[active];
      if (!rail || !indicator || !itemEl) return;
      const railRect = rail.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();
      const w = Math.min(itemRect.width, rail.clientWidth);
      const x = Math.max(
        0,
        Math.min(itemRect.left - railRect.left, rail.clientWidth - w),
      );
      const reduced = prefersReducedMotion();
      if (instant || reduced) {
        indicator.style.transform = `translate3d(${x}px, 0, 0)`;
        indicator.style.width = `${w}px`;
        indicator.style.opacity = "1";
        return;
      }
      utils.remove(indicator);
      animate(indicator, {
        translateX: x,
        width: `${w}px`,
        opacity: 1,
        duration: 460,
        ease: SMOOTH_EASE,
      });
    },
    [active],
  );

  useLayoutEffect(() => {
    positionIndicator(true);
    const onResize = () => positionIndicator(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionIndicator]);

  useEffect(() => {
    positionIndicator();
  }, [active, positionIndicator]);

  // Mobile menu open/close animations
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const list = mobileListRef.current;
    const hamburger = hamburgerRef.current;
    if (!menu || !list || !hamburger) return;
    const reduced = prefersReducedMotion();
    const lines = Array.from(hamburger.querySelectorAll<HTMLElement>(".ham-line"));
    const items = Array.from(list.children) as HTMLElement[];

    if (open) {
      menu.style.visibility = "visible";
      if (reduced) {
        menu.style.opacity = "1";
        items.forEach((i) => (i.style.opacity = "1"));
      } else {
        animate(menu, {
          opacity: [0, 1],
          translateY: [-10, 0],
          duration: 280,
          ease: SMOOTH_EASE,
        });
        animate(items, {
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 360,
          delay: stagger(60, { start: 120 }),
          ease: SMOOTH_EASE,
        });
        animate(lines[0], { rotate: 45, translateY: 4, duration: 240, ease: "outQuad" });
        animate(lines[1], { rotate: -45, translateY: -4, duration: 240, ease: "outQuad" });
      }
    } else {
      if (reduced) {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        items.forEach((i) => (i.style.opacity = "0"));
      } else {
        animate(menu, {
          opacity: [1, 0],
          translateY: [0, -10],
          duration: 200,
          ease: "inQuad",
          onComplete: () => {
            menu.style.visibility = "hidden";
          },
        });
        animate(lines[0], { rotate: 0, translateY: 0, duration: 200, ease: "outQuad" });
        animate(lines[1], { rotate: 0, translateY: 0, duration: 200, ease: "outQuad" });
      }
    }
  }, [open]);

  // Hover-circle bloom for desktop pill items (React Bits PillNav inspiration)
  function handleEnter(event: React.MouseEvent<HTMLAnchorElement>) {
    if (prefersReducedMotion()) return;
    const circle = event.currentTarget.querySelector<HTMLSpanElement>(".pill-bloom");
    if (!circle) return;
    utils.remove(circle);
    animate(circle, {
      scale: [0, 1.4],
      opacity: [0.35, 0],
      duration: 600,
      ease: "outQuad",
    });
  }

  return (
    <header className="nav" role="banner">
      <a href="#about" className="brand" aria-label={`${portfolio.person.name} — home`}>
        <span className="brand-glyph">
          <Element4 size={18} variant="Bold" color="#7db7ff" />
        </span>
        <span className="brand-text">
          {portfolio.person.name}
          <span className="brand-sub">{portfolio.person.role}</span>
        </span>
      </a>

      <div className="nav-items" ref={railRef} aria-label="Primary navigation" role="navigation">
        <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            ref={(el) => {
              itemRefs.current[item.id] = el;
            }}
            className="nav-item"
            aria-current={active === item.id ? "true" : undefined}
            onMouseEnter={handleEnter}
          >
            <span className="pill-bloom" aria-hidden="true" />
            <span className="nav-num">{item.index}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      <a href="#contact" className="nav-cta">
        <Send2 size={14} variant="Bold" />
        Let&apos;s talk
        <ArrowUp size={12} variant="Linear" style={{ transform: "rotate(45deg)" }} />
      </a>

      <button
        type="button"
        ref={hamburgerRef}
        className="menu-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? (
          <CloseSquare size={20} variant="Linear" color="currentColor" />
        ) : (
          <TextalignJustifycenter size={20} variant="Linear" color="currentColor" />
        )}
        <span className="ham-line" />
        <span className="ham-line" />
      </button>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="mobile-menu"
        aria-label="Mobile navigation"
        style={{ visibility: "hidden", opacity: 0 } as CSSProperties}
      >
        <ul ref={mobileListRef}>
          {NAV.map((item) => (
            <li key={item.id} style={{ opacity: 0 } as CSSProperties}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
              >
                <span className="nav-num">{item.index}</span>
                <span>{item.label}</span>
                <Briefcase size={14} variant="Linear" />
              </a>
            </li>
          ))}
          <li style={{ opacity: 0 } as CSSProperties}>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              style={{ color: "var(--orange-soft)" }}
            >
              <span>Let&apos;s talk</span>
              <Send2 size={14} variant="Bold" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

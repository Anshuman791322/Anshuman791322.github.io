"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { portfolio } from "@/data/portfolio";

const NAV = portfolio.nav;
const ITEM_IDS = NAV.map((n) => n.id);

export function Nav() {
  const [active, setActive] = useState<string>(NAV[0].id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = ITEM_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav" role="banner">
      <a href="#about" className="brand" aria-label={`${portfolio.person.name} — home`}>
        <span className="brand-glyph">AS</span>
        <span>
          {portfolio.person.name}
          <span className="brand-sub">{portfolio.person.role}</span>
        </span>
      </a>

      <nav className="nav-items" aria-label="Primary navigation">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="nav-item"
            aria-current={active === item.id ? "true" : undefined}
          >
            <span className="nav-num">{item.index}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <a href="#contact" className="nav-cta">
        Let&apos;s talk <ArrowUpRight size={14} />
      </a>

      <button
        type="button"
        className="menu-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === item.id ? "true" : undefined}
          >
            <span>{item.label}</span>
            <span className="nav-num">{item.index}</span>
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          style={{ color: "var(--orange-soft)" }}
        >
          <span>Let&apos;s talk</span>
          <ArrowUpRight size={14} />
        </a>
      </nav>
    </header>
  );
}

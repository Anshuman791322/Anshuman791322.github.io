"use client";

import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import anime from "animejs";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Project } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/anime";

type Props = {
  projects: readonly Project[];
};

const PREVIEW_W = 340;
const PREVIEW_H = 290;
const OFFSET_X = 28;
const OFFSET_Y = 36;

export function ProjectShowcase({ projects }: Props) {
  const [active, setActive] = useState<Project | null>(null);
  const [hovering, setHovering] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLOListElement | null>(null);

  // Cursor-anchored preview position — directly mutates transform, no React
  // re-renders on pointer move.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const card = cursorRef.current;
    if (!card) return;

    function move(event: PointerEvent) {
      const cardEl = cursorRef.current;
      if (!cardEl) return;
      const maxX = window.innerWidth - PREVIEW_W - 16;
      const x = Math.min(event.clientX + OFFSET_X, maxX);
      let y = event.clientY - PREVIEW_H - OFFSET_Y;
      if (y < 16) y = event.clientY + OFFSET_Y;
      cardEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Scroll-triggered stagger reveal for rows.
  useEffect(() => {
    const root = rowsRef.current;
    if (!root) return;
    const rows = Array.from(root.children) as HTMLElement[];
    if (rows.length === 0) return;

    const reduced = prefersReducedMotion();
    rows.forEach((row) => {
      row.style.opacity = reduced ? "1" : "0";
    });
    if (reduced) return;

    rows.forEach((row) => {
      row.style.transform = "translateY(24px)";
    });

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !played) {
          played = true;
          anime({
            targets: rows,
            opacity: [0, 1],
            translateY: [24, 0],
            delay: anime.stagger(90),
            duration: 540,
            easing: "cubicBezier(0.16, 1, 0.3, 1)",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Body lock + Escape handling for modal.
  useEffect(() => {
    if (!selected) return;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  function handleEnter(project: Project) {
    setActive(project);
    setHovering(true);
  }

  function handleLeave() {
    setHovering(false);
  }

  function handleOpen(project: Project) {
    setSelected(project);
    setHovering(false);
  }

  function handleKey(event: ReactKeyboardEvent<HTMLLIElement>, project: Project) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen(project);
    }
  }

  return (
    <div className="work-stage" ref={stageRef} onMouseLeave={handleLeave}>
      <ol className="work-list" ref={rowsRef}>
        {projects.map((project, index) => (
          <li
            key={project.title}
            className={`work-row project-${project.accent} ${
              project.featured ? "featured" : ""
            } ${project.archived ? "archived" : ""}`}
            onMouseEnter={() => handleEnter(project)}
            onFocus={() => handleEnter(project)}
            onClick={() => handleOpen(project)}
            onKeyDown={(event) => handleKey(event, project)}
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${project.title}`}
          >
            <span className="work-index">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <div className="work-head-cell">
              <h3 className="work-title">{project.title}</h3>
              <span className="work-tags">
                {project.tags.slice(0, 3).join(" · ")}
              </span>
            </div>
            <span className="work-year">{project.year}</span>
            <span className="work-arrow" aria-hidden="true">
              <ArrowUpRight size={20} />
            </span>
          </li>
        ))}
      </ol>

      {/* Cursor-anchored preview. Aria-hidden — all data is in the modal too. */}
      <div
        ref={cursorRef}
        className={`work-cursor ${active?.accent ?? ""} ${
          active?.featured ? "featured" : ""
        } ${hovering ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {active && (
          <>
            <div className="work-cursor-top">
              <span className="work-status">
                <span className="dot" />
                {active.archived
                  ? "Archived"
                  : active.featured
                    ? "Featured"
                    : "Public"}
              </span>
              <span className="work-cursor-year">{active.year}</span>
            </div>
            <h4>{active.title}</h4>
            <p>{active.description}</p>
            <div className="tags">
              {active.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="impact">{active.impact}</p>
            <p className="role">{active.role}</p>
          </>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <article
            className={`modal-card project-${selected.accent}`}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <p className="eyebrow">
              <span className="num">{selected.year}</span>
              {selected.archived ? "Archived" : "Public repository"}
            </p>
            <h2 id="modal-title">{selected.title}</h2>
            <p className="lede">{selected.description}</p>
            <p className="impact">{selected.impact}</p>
            <p className="role">Role · {selected.role}</p>
            <div className="tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="modal-actions">
              <a
                className="btn btn-primary"
                href={selected.repository}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> Open source
              </a>
              {selected.liveUrl && (
                <a
                  className="btn btn-secondary"
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live <ExternalLink size={14} />
                </a>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

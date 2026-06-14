"use client";

import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Project } from "@/data/portfolio";

type Props = {
  projects: readonly Project[];
  onOpen: (project: Project) => void;
};

const PREVIEW_W = 360;
const PREVIEW_H = 300;
const OFFSET_X = 28;
const OFFSET_Y_ABOVE = 36;

export function ProjectShowcase({ projects, onOpen }: Props) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);

  // Cursor-anchored preview position with spring damping.
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 240, damping: 28, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 240, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reducedMotion) return;
    function move(event: PointerEvent) {
      const x = event.clientX;
      const y = event.clientY;
      // Float top-right of cursor, clamped to viewport
      const maxX = window.innerWidth - PREVIEW_W - 16;
      const targetX = Math.min(x + OFFSET_X, maxX);
      // Try to position the preview ABOVE the cursor
      let targetY = y - PREVIEW_H - OFFSET_Y_ABOVE;
      if (targetY < 16) {
        // If no room above, drop below
        targetY = y + OFFSET_Y_ABOVE;
      }
      mx.set(targetX);
      my.set(targetY);
    }
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [reducedMotion, mx, my]);

  function handleRowHover(project: Project) {
    setActive(project);
    setIsHovering(true);
  }

  function handleLeave() {
    setIsHovering(false);
  }

  return (
    <div
      className="showcase-shell"
      onMouseLeave={handleLeave}
      data-active={isHovering ? "true" : "false"}
    >
      <ol className="showcase-list" ref={listRef}>
        {projects.map((project, index) => {
          const isActive = active?.title === project.title && isHovering;
          const isDimmed = isHovering && !isActive;
          return (
            <m.li
              key={project.title}
              className={`showcase-row project-${project.accent} ${
                project.featured ? "featured" : ""
              } ${project.archived ? "archived" : ""}`}
              onMouseEnter={() => handleRowHover(project)}
              onClick={() => onOpen(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onOpen(project);
                }
              }}
              animate={{
                opacity: isDimmed ? 0.32 : 1,
                x: isActive && !reducedMotion ? 16 : 0,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="button"
              tabIndex={0}
              aria-label={`Open details for ${project.title}`}
              data-cursor
            >
              <span className="showcase-index">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div className="showcase-headline">
                <m.h3
                  layoutId={`project-title-${project.title}`}
                  className="showcase-title"
                >
                  {project.title}
                </m.h3>
                <span className="showcase-tags">
                  {project.tags.slice(0, 3).join(" · ")}
                </span>
              </div>
              <span className="showcase-year">{project.year}</span>
              <span className="showcase-arrow" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
              <span className="showcase-rail" aria-hidden="true" />
            </m.li>
          );
        })}
      </ol>

      {/* Cursor-anchored preview — desktop, hover, no reduced motion */}
      <AnimatePresence>
        {isHovering && active && !reducedMotion && (
          <m.div
            className={`showcase-preview project-${active.accent} ${
              active.featured ? "is-featured" : ""
            }`}
            style={{ x: sx, y: sy, width: PREVIEW_W }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
            key={active.title}
          >
            <div className="showcase-preview-top">
              <span className="project-status">
                <span className="dot" />
                {active.archived
                  ? "Archived"
                  : active.featured
                    ? "Featured"
                    : "Public"}
              </span>
              <span className="showcase-preview-year">{active.year}</span>
            </div>
            <h4>{active.title}</h4>
            <p>{active.description}</p>
            <div className="tag-list">
              {active.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="impact">{active.impact}</p>
            <p className="project-role">{active.role}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

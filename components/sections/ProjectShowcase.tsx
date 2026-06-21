"use client";

import anime from "animejs";
import {
  ArrowRight,
  ArrowSquareRight,
  Box,
  CloseCircle,
  Code,
  ExportSquare,
  Eye,
  Folder2,
} from "iconsax-react";
import { useEffect, useRef, useState } from "react";

import type { Project } from "@/data/portfolio";
import { prefersReducedMotion } from "@/lib/anime";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import { GithubIcon } from "@/components/ui/GithubIcon";

type Props = {
  projects: readonly Project[];
};

const SPOTLIGHT_COLOR: Record<string, string> = {
  blue: "rgba(74, 144, 255, 0.18)",
  orange: "rgba(255, 138, 61, 0.20)",
  violet: "rgba(178, 155, 255, 0.18)",
  cyan: "rgba(140, 229, 255, 0.18)",
  green: "rgba(141, 239, 176, 0.16)",
};

const PROJECT_ICONS: Record<string, typeof Folder2> = {
  blue: Code,
  orange: Box,
  violet: Eye,
  cyan: Folder2,
  green: Folder2,
};

export function ProjectShowcase({ projects }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Scroll-triggered stagger reveal for the grid.
  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".work-tile"));
    if (cards.length === 0) return;

    const reduced = prefersReducedMotion();
    cards.forEach((c) => {
      c.style.opacity = reduced ? "1" : "0";
    });
    if (reduced) return;

    cards.forEach((c) => {
      c.style.transform = "translateY(36px)";
    });

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !played) {
          played = true;
          anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [36, 0],
            duration: 720,
            delay: anime.stagger(110),
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

  // Modal handling
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

  return (
    <div className="work-grid" ref={gridRef}>
      {projects.map((project, index) => {
        const Icon = PROJECT_ICONS[project.accent] ?? Folder2;
        const span =
          project.featured && index === 0
            ? "wide tall"
            : project.featured
              ? "wide"
              : project.archived
                ? "tiny"
                : "";
        return (
          <div key={project.title} className={`work-tile-wrap ${span}`}>
            <TiltCard amplitude={8} scaleOnHover={1.02} glare={0.14}>
              <SpotlightCard
                className={`work-tile project-${project.accent} ${
                  project.featured ? "featured" : ""
                } ${project.archived ? "archived" : ""}`}
                spotlightColor={
                  SPOTLIGHT_COLOR[project.accent] ?? SPOTLIGHT_COLOR.blue
                }
                as="button"
                onClick={() => setSelected(project)}
                ariaLabel={`Open details for ${project.title}`}
              >
                <div className="work-tile-top">
                  <span className="work-tile-index">
                    {(index + 1).toString().padStart(2, "0")} / 0{projects.length}
                  </span>
                  <span className="work-status">
                    <span className="dot" />
                    {project.archived
                      ? "Archived"
                      : project.featured
                        ? "Featured"
                        : "Public"}
                  </span>
                </div>

                <span className="work-tile-icon" aria-hidden="true">
                  <AnimatedIcon><Icon size={project.featured ? 26 : 22} variant="Bulk" /></AnimatedIcon>
                </span>

                <div className="work-tile-body">
                  <h3 className="work-tile-title">{project.title}</h3>
                  <p className="work-tile-desc">{project.description}</p>
                  <div className="work-tile-tags">
                    {project.tags
                      .slice(0, project.featured ? 5 : 3)
                      .map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                  </div>
                  {project.featured && (
                    <p className="work-tile-impact">{project.impact}</p>
                  )}
                </div>

                <div className="work-tile-footer">
                  <span className="work-tile-year">{project.year}</span>
                  <span className="work-tile-arrow">
                    <ArrowSquareRight size={20} variant="Linear" />
                  </span>
                </div>
              </SpotlightCard>
            </TiltCard>
          </div>
        );
      })}

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
              <CloseCircle size={20} variant="Linear" />
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
                <GithubIcon size={16} />
                Open source
                <ArrowRight size={14} variant="Linear" />
              </a>
              {selected.liveUrl && (
                <a
                  className="btn btn-secondary"
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live <ExportSquare size={14} variant="Linear" />
                </a>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Github } from "lucide-react";

import { reveal } from "@/lib/motion";
import type { Project } from "@/data/portfolio";

type Props = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, index, onOpen }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <m.article
      layoutId={`project-${project.title}`}
      variants={reveal}
      className={`project-card project-${project.accent} ${
        project.featured ? "featured" : ""
      }`}
      data-span={project.span.col}
      style={{ gridColumn: `span ${project.span.col}` }}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -8, rotateX: 1.4, rotateY: index % 2 ? -1.4 : 1.4 }
      }
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onClick={() => onOpen(project)}
      data-cursor
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="project-topline">
        <span>{project.year}</span>
        <span className="project-status">
          <span className="dot" />
          {project.archived
            ? "Archived"
            : project.featured
              ? "Featured"
              : "Public"}
        </span>
      </div>

      <div className="project-mark" aria-hidden="true">
        <Code2 size={project.featured ? 30 : 24} />
      </div>

      <div className="project-content">
        <m.h3 layoutId={`project-title-${project.title}`}>{project.title}</m.h3>
        <p>{project.description}</p>
        <div className="tag-list" aria-label="Technologies">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="impact">{project.impact}</p>
        <p className="project-role">{project.role}</p>
      </div>

      <div className="project-actions">
        <button
          type="button"
          className="text-button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(project);
          }}
          aria-label={`View details for ${project.title}`}
        >
          Details <ArrowUpRight size={16} />
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              onClick={(event) => event.stopPropagation()}
              aria-label={`Open ${project.title} live link`}
            >
              <ExternalLink size={18} />
            </a>
          )}
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            onClick={(event) => event.stopPropagation()}
            aria-label={`Open ${project.title} source on GitHub`}
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </m.article>
  );
}

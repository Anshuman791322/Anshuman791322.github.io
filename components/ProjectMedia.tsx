"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import type { ProjectImage } from "@/data/workCards";

type Props = {
  title: string;
  video?: string;
  note?: string;
  gallery?: readonly ProjectImage[];
};

export function ProjectMedia({ title, video, note, gallery = [] }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (activeIndex === null || gallery.length === 0) return;

    const previousOverflow = document.body.style.overflow;
    const close = () => setActiveIndex(null);
    const move = (step: number) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + step + gallery.length) % gallery.length;
      });
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (!document.activeElement?.closest("[data-project-lightbox]")) {
        returnFocusRef.current?.focus();
      }
    };
  }, [activeIndex, gallery.length]);

  if (!video && gallery.length === 0) return null;

  const activeImage = activeIndex === null ? null : gallery[activeIndex];

  return (
    <div className="case-project-media">
      {video && (
        <section className="case-media-section" aria-labelledby="case-video-title">
          <header className="case-media-head">
            <span className="case-eyebrow">Project walkthrough</span>
            <h2 id="case-video-title">A look inside {title}.</h2>
          </header>
          <div className="case-video-frame">
            <video
              className="case-video"
              controls
              playsInline
              preload="metadata"
              poster={gallery[0]?.src}
              aria-label={`${title} showcase video`}
            >
              <source src={video} type="video/webm" />
              Your browser does not support the embedded video.
            </video>
          </div>
          <p className="case-media-note">{note || "Recorded from the running project interface."}</p>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="case-media-section" aria-labelledby="case-gallery-title">
          <header className="case-media-head">
            <span className="case-eyebrow">Interface captures</span>
            <h2 id="case-gallery-title">Screens from the build.</h2>
          </header>
          <div className="case-gallery-grid">
            {gallery.map((image, index) => (
              <figure className="case-gallery-item" key={image.src}>
                <button
                  className="case-gallery-button"
                  type="button"
                  aria-label={`Open image ${index + 1}: ${image.alt}`}
                  onClick={(event) => {
                    returnFocusRef.current = event.currentTarget;
                    setActiveIndex(index);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                  <span className="case-gallery-open" aria-hidden="true">View image</span>
                </button>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {activeImage && activeIndex !== null && (
        <div
          className="case-lightbox-backdrop"
          data-project-lightbox
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div
            className="case-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image gallery`}
            tabIndex={-1}
            ref={dialogRef}
          >
            <button
              className="case-lightbox-close"
              type="button"
              aria-label="Close image"
              onClick={() => setActiveIndex(null)}
            >
              <X size={19} />
            </button>
            {gallery.length > 1 && (
              <>
                <button
                  className="case-lightbox-nav case-lightbox-prev"
                  type="button"
                  aria-label="Previous image"
                  onClick={() => setActiveIndex((current) =>
                    current === null ? 0 : (current - 1 + gallery.length) % gallery.length
                  )}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  className="case-lightbox-nav case-lightbox-next"
                  type="button"
                  aria-label="Next image"
                  onClick={() => setActiveIndex((current) =>
                    current === null ? 0 : (current + 1) % gallery.length
                  )}
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="case-lightbox-image" src={activeImage.src} alt={activeImage.alt} />
            <p className="case-lightbox-caption">{activeImage.caption}</p>
            <span className="case-lightbox-count">
              {activeIndex + 1} / {gallery.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { embedUrl, type Project } from "@/lib/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export function VideoModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const embed = embedUrl(project);
  const isVertical = project.aspect === "9:16";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/95 text-foreground shadow-lg transition-transform hover:scale-105 sm:right-8 sm:top-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div
        className={`relative w-full ${isVertical ? "max-w-sm" : "max-w-5xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {embed ? (
          <div
            className={`relative overflow-hidden rounded-lg bg-black shadow-2xl ${
              isVertical ? "aspect-[9/16]" : "aspect-video"
            }`}
          >
            <iframe
              src={embed}
              title={project.title}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : (
          <div className="rounded-lg bg-background p-8 text-center shadow-2xl">
            <h3 className="font-serif text-2xl text-foreground">
              {project.title || "Instagram Reel"}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Instagram doesn&apos;t allow inline playback here. Open the reel directly:
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
            >
              Open on Instagram
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-background">
          <div className="min-w-0">
            {project.title && (
              <h3 className="font-serif text-xl leading-tight">{project.title}</h3>
            )}
            {project.description && (
              <p className="mt-1 max-w-2xl text-sm text-background/75">
                {project.description}
              </p>
            )}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.14em] text-background/80 hover:text-background"
          >
            Open original ↗
          </a>
        </div>
      </div>
    </div>
  );
}

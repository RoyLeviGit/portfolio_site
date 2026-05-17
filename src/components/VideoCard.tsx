"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

const platformLabel: Record<Project["platform"], string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  gdrive: "Google Drive",
};

export function VideoCard({ project, onOpen }: Props) {
  const isVertical = project.aspect === "9:16";

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group block w-full text-left focus:outline-none"
    >
      <div
        className={`relative overflow-hidden rounded-md bg-neutral-100 ring-1 ring-border transition-all duration-300 group-hover:ring-foreground/30 ${
          isVertical ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes={isVertical ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/95 shadow-lg backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-5 w-5 fill-foreground"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-foreground/80 backdrop-blur-sm">
          {project.duration}
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium leading-snug text-foreground">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
        <span className="mt-0.5 shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted">
          {platformLabel[project.platform]}
        </span>
      </div>
    </button>
  );
}

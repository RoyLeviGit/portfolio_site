"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { embedUrl, groups, showreel, type Project } from "@/lib/projects";

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  const shortform = groups.find((g) => g.id === "shortform");
  const otherGroups = groups.filter((g) => g.id !== "shortform");

  return (
    <main className="mx-auto max-w-6xl px-6 pb-32 pt-6 sm:px-10 sm:pt-24">
      <Header />

      <Hero onPlay={() => setActive(showreel)} />

      {shortform && <ProjectGroupSection group={shortform} onOpen={setActive} />}

      {otherGroups.map((group) => (
        <ProjectGroupSection key={group.id} group={group} onOpen={setActive} />
      ))}

      <Showreel onPlay={() => setActive(showreel)} />

      <Contact />
      <Footer />

      <VideoModal project={active} onClose={() => setActive(null)} />
    </main>
  );
}

function ProjectGroupSection({
  group,
  onOpen,
}: {
  group: (typeof groups)[number];
  onOpen: (p: Project) => void;
}) {
  return (
    <Section id={group.id}>
      <SectionHeader title={group.title} blurb={group.blurb} />
      {group.layout === "reels" ? (
        <div className="space-y-8 sm:space-y-10">
          <div className="grid grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-10">
            {group.projects.slice(0, 3).map((p) => (
              <VideoCard key={p.id} project={p} onOpen={onOpen} />
            ))}
          </div>
          {group.projects.length > 3 && (
            <div className="grid grid-cols-4 gap-x-2 gap-y-8 sm:gap-x-6 sm:gap-y-10">
              {group.projects.slice(3).map((p) => (
                <VideoCard key={p.id} project={p} onOpen={onOpen} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          {group.projects.map((p) => (
            <VideoCard key={p.id} project={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </Section>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-end">
      <nav className="hidden gap-7 text-sm text-muted sm:flex">
        <a href="#shortform" className="transition-colors hover:text-foreground">
          Work
        </a>
        <a href="#about" className="transition-colors hover:text-foreground">
          About
        </a>
        <a href="#contact" className="transition-colors hover:text-foreground">
          Contact
        </a>
      </nav>
    </header>
  );
}

function Hero({ onPlay }: { onPlay: () => void }) {
  return (
    <section id="top" className="mt-6 grid gap-12 sm:mt-32 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div className="flex flex-col justify-center">
        <p className="text-sm uppercase tracking-[0.18em] text-muted">
          Animation · Motion · Video
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Arina <br />
          Gusak
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80">
          Creating visual stories —<br className="sm:hidden" /> from script to
          final cut.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onPlay}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-opacity hover:opacity-90"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-background">
              <path d="M8 5v14l11-7z" />
            </svg>
            Animation showreel
          </button>
          <a
            href="#contact"
            className="text-sm uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:text-foreground"
          >
            Get in touch →
          </a>
        </div>
      </div>

      <div id="about" className="grid grid-cols-[auto_1fr] items-start gap-4 md:grid-cols-1 md:gap-6">
        <div className="relative aspect-[4/5] w-20 overflow-hidden rounded-md bg-neutral-100 ring-1 ring-border md:ml-auto md:w-full md:max-w-48">
          <Image
            src="/images/headshot.jpg"
            alt="Portrait of Arina Gusak"
            fill
            sizes="(max-width: 768px) 80px, 192px"
            className="object-cover"
            priority
          />
        </div>
        <div className="min-w-0 text-xs leading-relaxed text-muted sm:text-sm md:ml-auto md:max-w-sm">
          <p>Hi! :)</p>
          <p className="mt-3 md:mt-4">
            I am an animation graduate from Bezalel Academy of Arts and Design
            with experience creating short animated films, educational content,
            and social-media videos for creators and brands.
          </p>
          <p className="mt-3 md:mt-4">
            I specialize in animation, motion design, and video editing, and
            I&apos;m a big lover of creative challenges and visual storytelling.
          </p>
          <p className="mt-3 md:mt-4">
            Comfortable working independently across the full production
            pipeline — script, production, post-production, sound, and editing.
          </p>
        </div>
      </div>
    </section>
  );
}

function Showreel({ onPlay }: { onPlay: () => void }) {
  const yt = embedUrl(showreel);
  return (
    <section id="animation-showreel" className="mt-32 sm:mt-40">
      <SectionHeader
        title="Animation Showreel"
        blurb="A short compilation of 2D and After Effects animation work."
      />
      <div className="relative">
        <div className="overflow-hidden rounded-md bg-black shadow-sm ring-1 ring-border">
          <div className="aspect-video">
            {yt && (
              <iframe
                src={yt}
                title="Animation Showreel"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onPlay}
          className="mt-3 text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
        >
          Open fullscreen ↗
        </button>
      </div>
    </section>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-32 sm:mt-40">
      {children}
    </section>
  );
}

function SectionHeader({ title, blurb }: { title: string; blurb?: string }) {
  return (
    <div className="mb-12 flex flex-col gap-4 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {blurb && (
        <p className="max-w-md text-sm leading-relaxed text-muted">{blurb}</p>
      )}
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="mt-32 sm:mt-40">
      <div className="grid gap-12 border-t border-border pt-16 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Get in touch
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Have a project, an idea, or a question? <span className="italic text-accent">Say hello.</span>
          </h2>
        </div>
        <ul className="flex flex-col gap-4 text-base md:items-end">
          <li>
            <a
              href="mailto:arisha1999@gmail.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              arisha1999@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:+972547807420" className="text-muted transition-colors hover:text-foreground">
              +972 54-780-7420
            </a>
          </li>
          <li className="text-muted">Tel Aviv, Israel</li>
          <li>
            <a
              href="https://www.instagram.com/arishagusak/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
            >
              @arishagusak ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center">
      <p>© {new Date().getFullYear()} Arina Gusak. All work shown here is © its respective owners.</p>
      <p className="uppercase tracking-[0.16em]">
        Thanks for scrolling through! Feel free to point out any typos :)
      </p>
    </footer>
  );
}

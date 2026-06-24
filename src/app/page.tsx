"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import {
  embedUrl,
  groups,
  shortformShowreel,
  showreel,
  type Project,
} from "@/lib/projects";

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const shortform = groups.find((g) => g.id === "shortform");
  const aiAssisted = groups.find((g) => g.id === "ai-assisted");
  const otherGroups = groups.filter(
    (g) => g.id !== "shortform" && g.id !== "ai-assisted",
  );

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-6 sm:px-10 sm:pt-16">
      <Header />

      <Hero />

      <About />

      {shortform && (
        <>
          <ProjectGroupSection group={shortform} onOpen={setActive} />
          {aiAssisted && (
            <AiAssistedSubsection group={aiAssisted} onOpen={setActive} />
          )}
        </>
      )}

      {otherGroups.map((group) => (
        <ProjectGroupSection key={group.id} group={group} onOpen={setActive} />
      ))}

      <ShortformShowreelSection
        onPlay={() => setActive(shortformShowreel)}
      />
      <Showreel onPlay={() => setActive(showreel)} />

      <Contact />
      <Footer />

      <VideoModal project={active} onClose={() => setActive(null)} />
    </main>
  );
}

function AiAssistedSubsection({
  group,
  onOpen,
}: {
  group: (typeof groups)[number];
  onOpen: (p: Project) => void;
}) {
  return (
    <section id={group.id} className="mt-12 sm:mt-14">
      <h3 className="mb-6 font-serif text-2xl leading-tight tracking-tight sm:mb-8 sm:text-3xl">
        {group.title}
      </h3>
      <div className="grid grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-8 sm:gap-y-10">
        {group.projects.map((p) => (
          <VideoCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
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
            <div className="-mx-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10 sm:pb-4 sm:[scrollbar-color:rgb(0_0_0/0.25)_transparent] sm:[scrollbar-width:thin] sm:[&::-webkit-scrollbar-thumb:hover]:bg-foreground/45 sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-thumb]:bg-foreground/25 sm:[&::-webkit-scrollbar-track]:bg-transparent sm:[&::-webkit-scrollbar]:block sm:[&::-webkit-scrollbar]:h-1.5">
              <div className="flex gap-3 sm:gap-6">
                {group.projects.slice(3).map((p) => (
                  <div key={p.id} className="w-[25%] shrink-0 sm:w-[22%]">
                    <VideoCard project={p} onOpen={onOpen} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : group.layout === "compact" ? (
        <div className="flex flex-wrap gap-3 sm:gap-6">
          {group.projects.map((p) => (
            <div key={p.id} className="w-[25%] sm:w-[22%]">
              <VideoCard project={p} onOpen={onOpen} />
            </div>
          ))}
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

function Hero() {
  return (
    <section
      id="top"
      className="mt-4 grid grid-cols-[1fr_auto] gap-5 sm:mt-12 sm:gap-10 md:grid-cols-[1.5fr_auto] md:items-center md:gap-16"
    >
      <div className="flex flex-col">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted sm:text-sm">
          Animation · Motion · Video
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-[0.95] tracking-tight sm:mt-5 sm:text-6xl md:text-7xl">
          Arina <br />
          Gusak
        </h1>

        <p className="mt-5 text-xs leading-relaxed text-foreground/80 sm:mt-8 sm:max-w-md sm:text-lg">
          Creating visual stories —<br className="sm:hidden" /> from script to final cut.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-8 sm:max-w-xs sm:gap-3">
          <a
            href="#shortform-showreel"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-foreground px-2 py-2 text-xs text-background transition-opacity hover:opacity-90 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <PlayIcon />
            Short-Form Showreel
          </a>
          <a
            href="#animation-showreel"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-foreground px-2 py-2 text-xs text-background transition-opacity hover:opacity-90 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <PlayIcon />
            Animation Showreel
          </a>
        </div>

        <a
          href="#contact"
          className="mt-3 inline-block text-[10px] uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground sm:mt-5 sm:text-sm sm:tracking-[0.16em]"
        >
          Get in touch →
        </a>
      </div>

      <div className="shrink-0">
        <HeroVideoLoop />
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 fill-background sm:h-3.5 sm:w-3.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function HeroVideoLoop() {
  return (
    <div className="relative aspect-[9/16] w-[140px] overflow-hidden rounded-md bg-black shadow-sm ring-1 ring-border sm:w-[240px] md:w-[320px]">
      <video
        src="/videos/short-form-showreel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mt-10 sm:mt-14">
      <div className="grid grid-cols-[auto_1fr] items-start gap-5 sm:gap-10">
        <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100 ring-1 ring-border sm:w-40">
          <Image
            src="/images/headshot.jpg"
            alt="Portrait of Arina Gusak"
            fill
            sizes="(max-width: 640px) 96px, 160px"
            className="object-cover"
            priority
          />
        </div>
        <div className="min-w-0 text-sm leading-relaxed text-muted sm:text-base">
          <p>Hi! :)</p>
          <p className="mt-3 sm:mt-4">
            I am an animation graduate from Bezalel Academy of Arts and Design
            with experience creating short animated films, educational content,
            and social-media videos for creators and brands.
          </p>
          <p className="mt-3 sm:mt-4">
            I specialize in animation, motion design, and video editing, and
            I&apos;m a big lover of creative challenges and visual storytelling.
          </p>
          <p className="mt-3 sm:mt-4">
            Comfortable working independently across the full production
            pipeline — script, production, post-production, sound, and editing.
          </p>
        </div>
      </div>
    </section>
  );
}

function ShortformShowreelSection({ onPlay }: { onPlay: () => void }) {
  return (
    <section id="shortform-showreel" className="mt-20 sm:mt-24">
      <SectionHeader
        title="Short-Form Showreel"
        blurb="A short-form showreel featuring AI-assisted production, motion design, video editing, and animation."
      />
      <div className="relative">
        <div className="mx-auto max-w-[320px] overflow-hidden rounded-md bg-black shadow-sm ring-1 ring-border sm:max-w-[360px]">
          <div className="aspect-[9/16]">
            <video
              src="/videos/short-form-showreel.mp4"
              poster="/thumbnails/short-form-showreel-poster.jpg"
              controls
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={onPlay}
            className="text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            Open fullscreen ↗
          </button>
        </div>
      </div>
    </section>
  );
}

function Showreel({ onPlay }: { onPlay: () => void }) {
  const yt = embedUrl(showreel);
  return (
    <section id="animation-showreel" className="mt-20 sm:mt-24">
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
    <section id={id} className="mt-20 sm:mt-24">
      {children}
    </section>
  );
}

function SectionHeader({ title, blurb }: { title: string; blurb?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
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
    <section id="contact" className="mt-20 sm:mt-24">
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
    <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center">
      <p>© {new Date().getFullYear()} Arina Gusak. All work shown here is © its respective owners.</p>
      <p className="uppercase tracking-[0.16em]">
        Thanks for scrolling through! Feel free to point out any typos :)
      </p>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { VideoCard } from "@/components/VideoCard";
import { VideoModal } from "@/components/VideoModal";
import { embedUrl, groups, showreel, type Project } from "@/lib/projects";

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-32 pt-16 sm:px-10 sm:pt-24">
      <Header />

      <Hero onPlay={() => setActive(showreel)} />

      <Showreel onPlay={() => setActive(showreel)} />

      {groups.map((group) => (
        <Section key={group.id} id={group.id}>
          <SectionHeader title={group.title} blurb={group.blurb} />
          {group.layout === "reels" ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
              {group.projects.map((p) => (
                <VideoCard key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {group.projects.map((p) => (
                <VideoCard key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
          )}
        </Section>
      ))}

      <Contact />
      <Footer />

      <VideoModal project={active} onClose={() => setActive(null)} />
    </main>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <a href="#top" className="font-serif text-lg tracking-tight">
        Arina Gusak
      </a>
      <nav className="hidden gap-7 text-sm text-muted sm:flex">
        <a href="#work" className="transition-colors hover:text-foreground">
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
    <section id="top" className="mt-20 grid gap-12 sm:mt-32 md:grid-cols-[1.4fr_1fr] md:gap-16">
      <div className="flex flex-col justify-center">
        <p className="text-sm uppercase tracking-[0.18em] text-muted">
          Animation · Motion · Video
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Arina <br />
          <span className="italic">Gusak</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80">
          Animation student at Bezalel working with 2D animation, motion design,
          and video editing — from script to final cut.
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
            Watch showreel
          </button>
          <a
            href="#contact"
            className="text-sm uppercase tracking-[0.16em] text-foreground/70 transition-colors hover:text-foreground"
          >
            Get in touch →
          </a>
        </div>
      </div>

      <div id="about" className="flex flex-col gap-6">
        <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md bg-neutral-100 ring-1 ring-border md:ml-auto">
          <Image
            src="/images/headshot.jpg"
            alt="Portrait of Arina Gusak"
            fill
            sizes="(max-width: 768px) 90vw, 320px"
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-sm text-sm leading-relaxed text-muted md:ml-auto">
          <p>
            Based in Tel Aviv. Fourth-year animation student at Bezalel
            Academy. I&apos;ve worked on short animated films, educational
            content for the Hebrew University and the IDF, and social-media
            video with creators and brands.
          </p>
          <p className="mt-4">
            Comfortable working solo end-to-end — script, illustration, sound,
            edit. Languages: English, Hebrew, Russian.
          </p>
        </div>
      </div>
    </section>
  );
}

function Showreel({ onPlay }: { onPlay: () => void }) {
  const yt = embedUrl(showreel);
  return (
    <section id="work" className="mt-32 sm:mt-40">
      <SectionHeader
        title="Showreel"
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
              href="https://www.instagram.com/arinagusakstudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
            >
              @arinagusakstudio ↗
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
      <p className="uppercase tracking-[0.16em]">Made with care in Tel Aviv</p>
    </footer>
  );
}

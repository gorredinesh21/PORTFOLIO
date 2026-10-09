import Link from "next/link";
import {
  featuredProjects,
  homeStats,
  projects,
  profile,
  workLoop,
} from "@/lib/data";
import { HowItWorks } from "@/components/how-it-works";
import { Hero3d } from "@/components/hero3d";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Constellation3d } from "@/components/constellation3d";
import { CountUp } from "@/components/countup";
import { Magnetic } from "@/components/magnetic";
import { MarqueeBand } from "@/components/marquee";

export default function Home() {
  const teaser = projects
    .filter((p) => !p.featured)
    .slice(0, 5);

  return (
    <>
      {/* ── Hero over generated art ─────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-art">
          <Hero3d />
          <div className="nebula" aria-hidden="true" />
          <span className="hero-drag-hint" aria-hidden="true">drag the knot ↻</span>
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-14 w-full">
          <p className="eyebrow mb-4">{profile.location} · {profile.roleLine}</p>
          <h1 className="home-hero-name">
            <span className="ln"><span>I build AI systems</span></span>
            <span className="ln"><span className="grad-ink">and ship them live.</span></span>
          </h1>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
            {profile.tagline} Right now that means a live home-food
            marketplace I build and operate — 40–50 orders a day through web,
            apps and a WhatsApp AI agent — agent and retrieval infrastructure
            in Go and Python, and enterprise data platforms at Reliance.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/projects" className="pill solid">
                Explore the work →
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="pill">
                Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="pill">
                {profile.email}
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ── Marquee band ────────────────────────────────────────────────── */}
      <MarqueeBand>
        <div className="mq-track-inner" style={{ display: "inline-flex" }}>
          {[0, 1].map((k) => (
            <span key={k} style={{ display: "inline-flex" }}>
              <b>Forward deployed</b>
              <span>20 systems live in production</span>
              <b>WhatsApp AI ordering</b>
              <span>40–50 orders a day</span>
              <b>Payments · messaging · maps</b>
              <span>Python · Go · LangGraph</span>
              <b>Build → integrate → operate</b>
              <span>IIT (ISM) Dhanbad CSE</span>
            </span>
          ))}
        </div>
      </MarqueeBand>

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <section className="section !pt-12 !pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="stat-grid">
            {homeStats.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <div className="stat-tile">
                  <div className="v"><CountUp v={s.v} /></div>
                  <div className="k">{s.k}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How I work ──────────────────────────────────────────────────── */}
      <section className="section !pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-6">
              <p className="eyebrow mb-2">01 · How I work</p>
              <h2 className="page-title" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.3rem)" }}>
                From fuzzy problem to <span className="grad">system in production</span>
              </h2>
            </div>
            <HowItWorks d={workLoop} />
          </Reveal>
        </div>
      </section>

      {/* ── Featured 4 ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="eyebrow mb-2">02 · Featured work</p>
                <h2 className="page-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                  Four systems I keep <span className="grad">running</span>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <ProjectCard p={p} feat index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Everything else teaser ──────────────────────────────────────── */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="eyebrow mb-2">03 · The rest of the constellation</p>
                <h2 className="page-title" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.3rem)" }}>
                  <span className="grad">{projects.length} projects</span>, most of them live
                </h2>
              </div>
              <Link
                href="/projects"
                className="pill shrink-0 hidden sm:inline-flex"
              >
                All projects →
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <Constellation3d projects={projects} />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teaser.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProjectCard p={p} index={i} />
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <Link
                href="/projects"
                className="card flex flex-col items-start justify-center gap-3 p-6 h-full min-h-[16rem] group"
              >
                <span className="font-display font-bold text-2xl tracking-tight">
                  + {projects.length - 4 - teaser.length} more
                </span>
                <span className="text-muted text-sm">
                  Agents, benchmarks, systems — each with its own page and a
                  picture of it working.
                </span>
                <span className="text-accent text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Browse everything <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          </div>
          <div className="mt-6 sm:hidden">
            <Link href="/projects" className="pill">
              All projects →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

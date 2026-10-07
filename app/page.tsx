import Link from "next/link";
import {
  featuredProjects,
  homeStats,
  projects,
  profile,
} from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export default function Home() {
  const teaser = projects
    .filter((p) => !p.featured)
    .slice(0, 5);

  return (
    <>
      {/* ── Hero over generated art ─────────────────────────────────────── */}
      <section className="home-hero">
        <div className="home-hero-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/art/hero.jpg" alt="" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-14 w-full">
          <p className="eyebrow mb-4">{profile.location} · {profile.roleLine}</p>
          <h1 className="home-hero-name">
            I build AI systems
            <br />
            <span className="page-title grad">and ship them live.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted">
            {profile.tagline} Right now that means a home-food startup doing
            40–50 orders a day, agents and retrieval engines in Go and Python,
            and data platforms at Reliance.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="pill solid">
              Explore the work →
            </Link>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="pill">
              Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="pill"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <section className="section !pt-12 !pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="stat-grid">
            {homeStats.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <div className="stat-tile">
                  <div className="v">{s.v}</div>
                  <div className="k">{s.k}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured 4 ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <p className="eyebrow mb-2">Featured work</p>
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
                <p className="eyebrow mb-2">The rest of the constellation</p>
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

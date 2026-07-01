import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Database, Braces } from "lucide-react";
import { Github } from "@/components/brand-icons";
import { TypingRoles } from "@/components/typing-roles";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/project-card";
import { profile, projects } from "@/lib/data";

const heroTags = [
  "Next.js",
  "React",
  "LangGraph",
  "Spring Boot",
  "Databricks",
  "PyTorch",
];

const pillars = [
  {
    icon: Sparkles,
    title: "Generative AI",
    body: "Agentic systems, RAG & GraphRAG, LangChain / LangGraph, MCP, and LLM pipelines — from prototype to shipped product.",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: Layers,
    title: "Full-Stack Web",
    body: "MERN storefronts, Spring Boot APIs, React + Redux frontends, payments, auth and Web3 DApps — the whole product, not just the model.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Database,
    title: "Data & ML",
    body: "Databricks, PySpark and ADF pipelines, plus deep-learning and ML work across CV, NLP and tabular problems.",
    gradient: "from-sky-500 to-cyan-500",
  },
];

const stats = [
  { value: "15+", label: "Projects shipped" },
  { value: "3", label: "Domains — AI · Web · Data" },
  { value: "Top 200", label: "Amazon ML Challenge" },
  { value: "IIT (ISM)", label: "CSE '25" },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero */}
      <section className="pt-6 sm:pt-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            Available for interesting problems · {profile.location}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            Hi, I&apos;m Dinesh —
            <br className="hidden sm:block" /> I build{" "}
            <TypingRoles />
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn btn-primary">
              View my work <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn btn-ghost">
              About me
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-2">
              <Braces size={14} /> stack
            </span>
            {heroTags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Pillars — the all-rounder story */}
      <section>
        <Reveal>
          <div className="mb-8">
            <div className="text-sm font-semibold uppercase tracking-wider text-accent">
              What I do
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              An engineer across three worlds
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              I don&apos;t box myself into one lane. I go deep where it matters
              and pick up whatever a good idea needs — then ship it end to end.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card card-hover h-full p-6">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-lg shadow-black/5`}
                >
                  <p.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-accent">
                Selected work
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Featured projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent"
            >
              See all
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section>
        <Reveal>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
              {stats.map((s) => (
                <div key={s.label} className="p-6 text-center sm:p-8">
                  <div className="gradient-text text-2xl font-extrabold sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted sm:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section>
        <Reveal>
          <div className="card relative overflow-hidden p-8 text-center sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(40rem 20rem at 50% -30%, rgba(79,70,229,0.12), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Have an idea worth building?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted">
                I love turning problems into working products — across AI, the
                web, and data. Let&apos;s talk.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Get in touch <ArrowRight size={16} />
                </Link>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Download résumé
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

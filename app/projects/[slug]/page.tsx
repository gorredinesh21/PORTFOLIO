import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Github } from "@/components/brand-icons";
import { SectionCard } from "@/components/section-card";
import { DomainBadge } from "@/components/domain-badge";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/tag";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project — Dinesh" };
  return {
    title: `${project.name} — Dinesh`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.domain === project.domain)
    .slice(0, 3);
  const fallback = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  return (
    <div>
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={15} /> Back to projects
      </Link>

      {/* Hero */}
      <Reveal>
        <div className="card relative overflow-hidden p-7 sm:p-9">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(30rem 16rem at 100% -20%, rgba(79,70,229,0.10), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <DomainBadge domain={project.domain} />
              <span className="text-xs text-muted-2">{project.period}</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              {project.tagline}
            </p>
            <p className="mt-5 max-w-3xl leading-relaxed text-foreground/85">
              {project.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7"
            >
              <Github size={16} /> View on GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <Reveal delay={0.05}>
            <SectionCard eyebrow="Problem">
              <p className="leading-relaxed text-foreground/85">
                {project.problem}
              </p>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionCard eyebrow="Approach">
              <ol className="space-y-4">
                {project.approach.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-xs font-semibold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed text-foreground/85">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionCard eyebrow="Highlights">
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span className="text-foreground/85">{h}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </Reveal>
        </div>

        <aside className="space-y-6">
          <Reveal delay={0.1}>
            <SectionCard eyebrow="At a glance">
              <ul className="space-y-4">
                {project.metrics.map((m) => (
                  <li key={m.label}>
                    <div className="text-xs uppercase tracking-wider text-muted-2">
                      {m.label}
                    </div>
                    <div className="mt-0.5 text-lg font-bold text-foreground">
                      {m.value}
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionCard eyebrow="More projects">
              <div className="space-y-3">
                {suggestions.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:border-accent hover:bg-accent-soft/40"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-foreground group-hover:text-accent">
                        {p.name}
                      </div>
                      <div className="truncate text-xs text-muted">
                        {p.tagline}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="ml-auto shrink-0 text-muted-2 group-hover:text-accent"
                    />
                  </Link>
                ))}
              </div>
            </SectionCard>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}

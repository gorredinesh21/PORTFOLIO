import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Github } from "@/components/brand-icons";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
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
  if (!project) return { title: "project — dinesh" };
  return {
    title: `${project.name} — dinesh`,
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

  return (
    <div>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent mb-6"
      >
        <ArrowLeft size={14} /> cd ..
      </Link>

      <PageHeader command={`cat projects/${project.slug}.md`} />

      <div className="grid lg:grid-cols-[1.6fr,1fr] gap-6 items-start">
        <div className="space-y-5">
          <SectionCard filename={`${project.slug}/README.md`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  <span className="text-accent-2">./</span>
                  {project.name}
                </h1>
                <p className="mt-2 text-muted">{project.tagline}</p>
              </div>
              <div className="text-xs text-muted shrink-0">
                <span className="text-accent-2">[</span>
                {project.period}
                <span className="text-accent-2">]</span>
              </div>
            </div>

            <p className="mt-5 text-foreground/90 leading-relaxed">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded border border-border px-3 py-1.5 text-sm hover:border-accent hover:text-accent"
            >
              <Github size={14} /> view on github
            </a>
          </SectionCard>

          <SectionCard filename="problem.md">
            <div className="text-xs text-muted mb-2">
              <span className="text-accent-2"># </span>problem
            </div>
            <p className="text-foreground/90 leading-relaxed">{project.problem}</p>
          </SectionCard>

          <SectionCard filename="approach.md">
            <div className="text-xs text-muted mb-3">
              <span className="text-accent-2"># </span>approach
            </div>
            <ol className="space-y-3">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-accent shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-foreground/90 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard filename="highlights.md">
            <div className="text-xs text-muted mb-3">
              <span className="text-accent-2"># </span>highlights
            </div>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-accent-2 mt-0.5">✓</span>
                  <span className="text-foreground/90">{h}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <aside className="space-y-5">
          <SectionCard filename="metrics.json">
            <ul className="space-y-3">
              {project.metrics.map((m) => (
                <li key={m.label}>
                  <div className="text-xs text-muted">{m.label}</div>
                  <div className="text-lg text-accent font-semibold">
                    {m.value}
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard filename="stack.txt">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </SectionCard>

          <SectionCard filename="related.md">
            <div className="space-y-2">
              {projects
                .filter((p) => p.slug !== project.slug)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="block group"
                  >
                    <div className="text-sm text-foreground group-hover:text-accent">
                      <span className="text-accent-2">./</span>
                      {p.name}
                    </div>
                    <div className="text-xs text-muted">{p.tagline}</div>
                  </Link>
                ))}
            </div>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}

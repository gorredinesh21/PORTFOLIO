import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Tag } from "@/components/tag";
import { DomainBadge } from "@/components/domain-badge";
import { Tilt } from "@/components/tilt";
import type { Domain } from "@/lib/data";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  domain: Domain;
  period: string;
  stack: string[];
  summary: string;
  liveUrl?: string;
  featured?: boolean;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt>
    <div
      className={`card card-hover group flex flex-col p-6 relative ${
        project.liveUrl
          ? "ring-2 ring-green-500/50 dark:ring-green-500/40"
          : ""
      }`}
    >
      {/* Live badge */}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute -top-2.5 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-green-500 transition-colors"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-200 animate-pulse" />
          Live — try it
          <ExternalLink size={11} className="opacity-80" />
        </a>
      )}

      <Link href={`/projects/${project.slug}`} className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <DomainBadge domain={project.domain} />
          <ArrowUpRight
            size={18}
            className="text-muted-2 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </div>

        <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-muted">{project.tagline}</p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5 pt-4">
          {project.stack.slice(0, 5).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
          {project.stack.length > 5 && <Tag>+{project.stack.length - 5}</Tag>}
        </div>

        <div className="mt-4 text-xs text-muted-2">{project.period}</div>
      </Link>
    </div>
    </Tilt>
  );
}

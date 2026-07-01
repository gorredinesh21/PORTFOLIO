import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Tag } from "@/components/tag";
import { DomainBadge } from "@/components/domain-badge";
import type { Domain } from "@/lib/data";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  domain: Domain;
  period: string;
  stack: string[];
  summary: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card card-hover group flex flex-col p-6"
    >
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
  );
}

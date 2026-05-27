import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tag } from "@/components/tag";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  stack: string[];
  summary: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-md border border-border bg-background-alt/60 p-5 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_0_1px_rgba(88,166,255,0.35),0_8px_30px_-12px_rgba(88,166,255,0.45)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-muted">{project.period}</div>
          <h3 className="mt-1 text-lg font-semibold text-foreground group-hover:text-accent">
            <span className="text-accent-2">./</span>
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
        </div>
        <ArrowRight
          size={16}
          className="mt-1 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
        />
      </div>

      <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        {project.stack.length > 6 && (
          <Tag>+{project.stack.length - 6} more</Tag>
        )}
      </div>
    </Link>
  );
}

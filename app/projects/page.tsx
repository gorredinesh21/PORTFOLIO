import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/data";

export const metadata = { title: "projects — dinesh" };

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        command="ls -la ./projects"
        description="A selection of projects I have built end-to-end — from problem statement to working artifact."
      />

      <div className="mb-6 rounded-md border border-border bg-background-alt/40 p-4 text-xs sm:text-sm text-muted font-mono">
        <div>
          <span className="text-accent-2">drwxr-xr-x</span>{" "}
          <span className="text-muted">dinesh</span>{" "}
          <span className="text-muted">staff</span>{" "}
          <span className="text-foreground">{projects.length} projects</span>
        </div>
        <div className="text-muted">total {projects.length}</div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { Tag } from "@/components/tag";
import { experience } from "@/lib/data";

export const metadata = { title: "experience — dinesh" };

export default function ExperiencePage() {
  return (
    <div>
      <PageHeader
        command="git log --experience"
        description="Where I work, what I ship, and the stack I work with day to day."
      />

      <div className="space-y-6">
        {experience.map((job, idx) => (
          <SectionCard
            key={idx}
            filename={`${job.company
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}.md`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {job.role}
                </h2>
                <div className="text-sm text-accent mt-1">@ {job.company}</div>
                <div className="text-xs text-muted mt-1">{job.location}</div>
              </div>
              <div className="text-xs sm:text-sm text-muted shrink-0">
                <span className="text-accent-2">[</span>
                {job.period}
                <span className="text-accent-2">]</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>

            <ol className="mt-6 space-y-5 relative border-l border-border ml-2 pl-5">
              {job.highlights.map((h, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent-2 ring-4 ring-background-alt" />
                  <div className="text-sm font-semibold text-foreground">
                    <span className="text-accent">→ </span>
                    {h.title}
                  </div>
                  <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">
                    {h.body}
                  </p>
                </li>
              ))}
            </ol>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

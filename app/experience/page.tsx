import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/tag";
import { experience } from "@/lib/data";

export const metadata = { title: "Experience — Dinesh" };

export default function ExperiencePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Experience"
        title="Where I work & what I ship"
        description="My professional journey and the stack I work with day to day."
      />

      <div className="space-y-6">
        {experience.map((job, idx) => (
          <Reveal key={idx} delay={idx * 0.06}>
            <article className="card p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    {job.role}
                  </h2>
                  <div className="mt-1 font-medium text-accent">
                    {job.company}
                  </div>
                  <div className="mt-0.5 text-sm text-muted">
                    {job.location}
                  </div>
                </div>
                <span className="inline-flex h-fit shrink-0 items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {job.period}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <ol className="relative mt-7 space-y-6 border-l border-border pl-6">
                {job.highlights.map((h, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[30px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-accent" />
                    <div className="font-semibold text-foreground">
                      {h.title}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {h.body}
                    </p>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

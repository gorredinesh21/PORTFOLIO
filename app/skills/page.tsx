import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/tag";
import { skills } from "@/lib/data";

export const metadata = { title: "Skills — Dinesh" };

export default function SkillsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Skills"
        title="The tools I build with"
        description="Some are daily drivers, others are things I picked up to ship a specific project. I add to this list whenever an idea demands it."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.06}>
            <div className="card h-full p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-violet" />
                <h2 className="text-base font-bold tracking-tight">
                  {group.label}
                </h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item} className="!text-[0.8rem] !py-1 !px-2.5">
                    {item}
                  </Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="card mt-6 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Philosophy
          </div>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-foreground/85">
            I aim for T-shaped range — deep enough in Data Engineering and Gen AI
            to ship production systems, broad enough across full-stack web, ML,
            DL, CV and NLP to pick the right tool for the problem. When something
            new is needed, I learn it on demand and build with it.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

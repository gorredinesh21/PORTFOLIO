import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { Tag } from "@/components/tag";
import { skills } from "@/lib/data";

export const metadata = { title: "skills — dinesh" };

const labels: Record<string, string> = {
  languages: "languages & databases",
  data_engineering: "data engineering",
  gen_ai: "generative ai",
  ml_and_dl: "ml & deep learning",
};

export default function SkillsPage() {
  return (
    <div>
      <PageHeader
        command="cat skills.toml"
        description="The stack I work with. Some are daily drivers, others are tools I have shipped real projects with."
      />

      <div className="grid md:grid-cols-2 gap-5">
        {skills.map((group) => (
          <SectionCard key={group.category} filename={`${group.category}.toml`}>
            <div className="mb-3 text-xs">
              <span className="text-accent-2">[</span>
              <span className="text-magenta">{labels[group.category] ?? group.category}</span>
              <span className="text-accent-2">]</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Tag key={item} className="text-sm py-1 px-2.5">
                  {item}
                </Tag>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>

      <div className="mt-8 rounded-md border border-border bg-background-alt/40 p-5 text-sm text-muted">
        <span className="text-accent-2">$</span> note --philosophy
        <p className="mt-2 leading-relaxed text-foreground/85">
          I prefer building T-shaped knowledge — deep enough in Data Engineering and Gen AI to ship production systems,
          broad enough across ML, DL, CV and NLP to choose the right tool when the problem calls for it.
        </p>
      </div>
    </div>
  );
}

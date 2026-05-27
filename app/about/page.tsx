import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { Tag } from "@/components/tag";
import { aboutBio, education, achievements } from "@/lib/data";

export const metadata = { title: "about — dinesh" };

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        command="cat about.md"
        description="A short story of how I got here, and what I am thinking about right now."
      />

      <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6 items-start">
        <div className="space-y-5">
          {aboutBio.map((block) => (
            <SectionCard key={block.heading} filename={block.heading}>
              <div className="space-y-3 text-foreground/90">
                {block.content.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    <span className="text-accent-2 select-none"># </span>
                    {p}
                  </p>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>

        <aside className="space-y-5">
          <SectionCard filename="education.json">
            <div className="space-y-2">
              <div>
                <div className="text-foreground font-semibold">
                  {education.school}
                </div>
                <div className="text-sm text-muted">{education.degree}</div>
                <div className="text-xs text-muted mt-0.5">
                  {education.period}
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="text-xs text-muted mb-2">
                  <span className="text-accent-2">{"//"}</span> relevant
                  coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard filename="achievements.log">
            <ul className="space-y-2 text-foreground/90">
              {achievements.map((a, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent-2 mt-0.5">✓</span>
                  <span className="text-sm">{a}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard filename="quick.facts">
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted">location</span>
                <span className="float-right text-foreground">Mumbai, IN</span>
              </li>
              <li>
                <span className="text-muted">years_coding</span>
                <span className="float-right text-foreground">4+</span>
              </li>
              <li>
                <span className="text-muted">focus</span>
                <span className="float-right text-accent">Data · AI · GenAI</span>
              </li>
              <li>
                <span className="text-muted">status</span>
                <span className="float-right text-accent-2">● open to chat</span>
              </li>
            </ul>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}

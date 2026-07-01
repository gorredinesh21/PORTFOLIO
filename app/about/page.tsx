import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { Reveal } from "@/components/reveal";
import { Tag } from "@/components/tag";
import { MapPin, Compass, CircleDot } from "lucide-react";
import { aboutBio, education, achievements } from "@/lib/data";

export const metadata = { title: "About — Dinesh" };

const facts = [
  { icon: MapPin, label: "Location", value: "Mumbai, India" },
  { icon: Compass, label: "Focus", value: "AI · Web · Data" },
  { icon: CircleDot, label: "Status", value: "Open to chat" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="A builder who refuses to pick just one lane"
        description="A short story of how I got here, how I work, and what I am building right now."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {aboutBio.map((block, i) => (
            <Reveal key={block.heading} delay={i * 0.06}>
              <SectionCard eyebrow={block.heading}>
                <div className="space-y-3">
                  {block.content.map((p, j) => (
                    <p key={j} className="leading-relaxed text-foreground/85">
                      {p}
                    </p>
                  ))}
                </div>
              </SectionCard>
            </Reveal>
          ))}
        </div>

        <aside className="space-y-6">
          <Reveal delay={0.05}>
            <SectionCard eyebrow="Education" title={education.school}>
              <div className="text-sm text-muted">{education.degree}</div>
              <div className="mt-0.5 text-xs text-muted-2">
                {education.period}
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-2">
                  Relevant coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              </div>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionCard eyebrow="Achievements">
              <ul className="space-y-2.5">
                {achievements.map((a, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span className="text-sm text-foreground/85">{a}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </Reveal>

          <Reveal delay={0.15}>
            <SectionCard eyebrow="Quick facts">
              <ul className="space-y-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                      <Icon size={15} />
                    </span>
                    <span className="text-muted">{label}</span>
                    <span className="ml-auto font-medium text-foreground">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}

import { awards, oss } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";

export function Awards() {
  return (
    <section id="awards" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="AWARDS & OPEN SOURCE"
          title="Receipts outside the résumé."
          lede=""
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col divide-y divide-border">
            {awards.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.05}>
                <div className="py-5 flex items-start justify-between gap-6">
                  <div>
                    <div className="font-display text-[1.02rem] font-semibold leading-snug">
                      {a.title}
                    </div>
                    <p className="mt-1 text-[0.84rem] text-muted leading-relaxed">
                      {a.detail}
                    </p>
                  </div>
                  <span className="font-mono text-[0.72rem] text-muted-2 flex-none pt-1">
                    {a.year}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            {oss.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <a
                  href={o.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card block p-6 group"
                >
                  <div className="eyebrow !text-[0.62rem] mb-2">{o.tag}</div>
                  <div className="font-display text-[1.02rem] font-semibold flex items-center gap-2 group-hover:text-accent transition-colors">
                    {o.title}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      ↗
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.84rem] text-muted leading-relaxed">
                    {o.body}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

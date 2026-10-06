import { approach } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";

export function Approach() {
  return (
    <section id="approach" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="APPROACH"
          title="How the work gets done."
          lede="Three habits that survived every project on this page — from a first-year C++ snake game to a marketplace doing daily orders."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal key={a.step} delay={i * 0.08}>
              <div className="card h-full p-7 flex flex-col gap-4">
                <div className="font-display text-[2.6rem] font-extrabold leading-none text-transparent"
                  style={{ WebkitTextStroke: "1px var(--border-strong)" }}
                >
                  {a.step}
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {a.title}
                </h3>
                <p className="text-[0.88rem] leading-relaxed text-muted">
                  {a.body}
                </p>
                <div className="mt-auto pt-3 flex flex-col gap-2 border-t border-border">
                  {a.pairs.map(([x, y]) => (
                    <div key={x} className="cp !text-[0.8rem]">
                      <b className="!font-normal !text-muted-2 line-through decoration-border-strong">
                        {x}
                      </b>
                      <span className="arr">→</span>
                      <span className="!text-foreground">{y}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

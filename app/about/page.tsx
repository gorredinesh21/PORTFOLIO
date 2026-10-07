import type { Metadata } from "next";
import Link from "next/link";
import { aboutBio, approach, profile, skills } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About — Dinesh Gorre",
  description: profile.intro,
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <p className="eyebrow mb-3">About</p>
          <h1 className="page-title">
            Learn on demand.
            <br />
            <span className="grad">Ship what I learn.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            {profile.roleLine} · {profile.location}
          </p>
        </div>
      </section>

      {/* Bio — compact cards instead of walls of text */}
      <section className="section !pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-5 md:grid-cols-3">
          {aboutBio.map((b, i) => (
            <Reveal key={b.heading} delay={i * 0.07}>
              <div className="card p-6 h-full">
                <p className="eyebrow mb-3">{b.heading}</p>
                <div className="flex flex-col gap-3">
                  {b.content.map((c, j) => (
                    <p key={j} className="text-[0.9rem] leading-relaxed text-muted">
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills as visual chips */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-4">Toolbox</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="card p-5 h-full">
                  <p className="font-display font-bold text-[1.05rem] tracking-tight mb-3">
                    {s.label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How I build — three principle cards */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-4">How I build</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {approach.map((a, i) => (
              <Reveal key={a.step} delay={i * 0.07}>
                <div className="card p-6 h-full flex flex-col gap-3">
                  <span className="font-display font-bold text-2xl text-accent">
                    {a.step}
                  </span>
                  <p className="font-display font-bold text-lg tracking-tight">
                    {a.title}
                  </p>
                  <p className="text-[0.88rem] leading-relaxed text-muted">{a.body}</p>
                  <div className="mt-auto pt-3 concept-pairs !gap-2">
                    {a.pairs.map(([l, r]) => (
                      <div key={l} className="cp !text-[0.8rem]">
                        <span>{l}</span>
                        <span className="arr">→</span>
                        <b>{r}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 text-center">
              <Link href="/projects" className="pill solid">
                See it applied → the projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

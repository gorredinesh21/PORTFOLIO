import type { Metadata } from "next";
import Link from "next/link";
import { aboutBio, approach, journey, profile, skills } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import {
  CodeGlyph,
  SparkGlyph,
  DbGlyph,
  CloudGlyph,
  RocketGlyph,
  RulerGlyph,
  SatelliteGlyph,
} from "@/components/glyphs";

export const metadata: Metadata = {
  title: "About — Dinesh Gorre",
  description: profile.intro,
};

const skillIcons = [CodeGlyph, SparkGlyph, DbGlyph, CloudGlyph];
const approachIcons = [RocketGlyph, RulerGlyph, SatelliteGlyph];

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
        </div>
      </section>

      {/* The setup — image beside the facts */}
      <section className="section !pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-6 lg:grid-cols-[1fr_1.25fr] items-stretch">
          <Reveal>
            <div className="imgcard h-full min-h-[19rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/workspace.jpg" alt="One engineer, many live systems — an illustrated night workspace" />
              <div className="cap">
                <span>by day · data + RAG @ reliance</span>
                <span>by night · homaatri orders</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {aboutBio.map((b, i) => (
              <Reveal key={b.heading} delay={0.06 + i * 0.06}>
                <div className="card p-5 sm:p-6">
                  <p className="eyebrow mb-2.5">{b.heading}</p>
                  <div className="flex flex-col gap-2.5">
                    {b.content.map((c, j) => (
                      <p key={j} className="text-[0.88rem] leading-relaxed text-muted">
                        {c}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline graphic */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-6">The journey</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card !bg-transparent !border-0 p-0">
              <div className="journey" role="img" aria-label="Journey timeline from 2021 to 2026">
                {journey.map((j) => (
                  <div key={j.year} className="j-node">
                    <span className="j-dot" aria-hidden="true" />
                    <span className="j-year">{j.year}</span>
                    <b>{j.title}</b>
                    <span>{j.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills with icons */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-4">Toolbox</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => {
              const Icon = skillIcons[i % skillIcons.length];
              return (
                <Reveal key={s.label} delay={i * 0.06}>
                  <div className="card p-5 h-full">
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <span className="gchip">
                        <Icon size={20} />
                      </span>
                      <p className="font-display font-bold text-[1.05rem] tracking-tight">
                        {s.label}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <span key={it} className="chip">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How I build — iconed principle cards */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-4">How I build</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {approach.map((a, i) => {
              const Icon = approachIcons[i % approachIcons.length];
              return (
                <Reveal key={a.step} delay={i * 0.07}>
                  <div className="card p-6 h-full flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="gchip">
                        <Icon size={22} />
                      </span>
                      <span className="font-display font-bold text-xl text-accent">
                        {a.step}
                      </span>
                    </div>
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
              );
            })}
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

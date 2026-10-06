"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";

const pairs: [string, string][] = [
  ["A vague idea", "smallest real version"],
  ["A clever model", "a page you can use"],
  ["“it feels better”", "a measured number"],
  ["The LLM dies", "the product doesn't"],
];

export function Hero() {
  const [ti, setTi] = useState(0);
  const tagline = profile.taglines[ti];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="nebula" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Reveal>
          <div className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent/60" />
            {profile.orbitLine}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="font-display font-extrabold tracking-tight leading-[0.98] text-[clamp(2.6rem,7.2vw,5.4rem)] max-w-4xl">
            Gorre Dinesh
            <br />
            <span className="text-accent">Chandan Reddy</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <button
            type="button"
            className="tagline-btn font-display font-semibold text-[clamp(1.3rem,3vw,2rem)] mt-6 text-amber"
            onClick={() => setTi((i) => (i + 1) % profile.taglines.length)}
            title="Click for the next one"
          >
            “{tagline}”
            <span className="swap-hint block mt-2 !text-[0.62rem]">
              a little like my day job — give it a click
            </span>
          </button>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-8 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="pill solid">
              See the work
            </a>
            <a
              href="https://homatri.com"
              target="_blank"
              rel="noreferrer"
              className="pill"
            >
              homatri.com ↗
            </a>
            <a href={profile.resumeUrl} className="pill" target="_blank">
              Résumé ↧
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-14 pt-8 border-t border-border">
            <div className="concept-pairs">
              {pairs.map(([a, b]) => (
                <div key={a} className="cp">
                  <b>{a}</b>
                  <span className="arr">→</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* planet horizon peeking from the bottom edge */}
      <svg
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[130%] max-w-none opacity-90 pointer-events-none"
        viewBox="0 0 1200 190"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="horizon" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#8f88e8" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#3c3a70" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#08080f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="600" cy="200" rx="640" ry="150" fill="url(#horizon)" />
        <path
          d="M -40 200 Q 600 52 1240 200"
          stroke="rgba(179,173,255,0.5)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </section>
  );
}

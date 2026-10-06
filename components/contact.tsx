"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";

// Frontend-only: drafts an email in your own client. Nothing is sent or
// stored by this site — same contract as the reference portfolio.
export function Contact() {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const draft = () => {
    const subject = encodeURIComponent(`Hello from your portfolio, ${profile.shortName}`);
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Opening your mail client — nothing is sent until you press send.");
  };

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="CONTACT"
          title="Say hello."
          lede="The fastest route is email; I read everything. Especially interested in AI systems that have to survive real users."
        />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="card p-7">
              <label htmlFor="contact-msg" className="eyebrow !text-[0.62rem] block mb-3">
                Draft a message
              </label>
              <textarea
                id="contact-msg"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={5}
                placeholder="Hi Dinesh — saw the WhatsApp agent…"
                className="w-full rounded-lg bg-[rgba(255,255,255,0.03)] border border-border p-3.5 text-[0.92rem] text-foreground placeholder:text-muted-2 focus:outline-none focus:border-accent/60 resize-y"
              />
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  onClick={draft}
                  disabled={!msg.trim()}
                  className="pill solid disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Draft email →
                </button>
                {status && (
                  <span className="text-[0.76rem] text-muted-2">{status}</span>
                )}
              </div>
              <p className="mt-4 text-[0.72rem] text-muted-2">
                This form never sends anything by itself — it just opens a draft
                in your mail client. Nothing is sent or stored by this site.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3 h-full justify-center">
              <a href={`mailto:${profile.email}`} className="card p-5 flex items-center justify-between group">
                <span className="text-[0.94rem]">{profile.email}</span>
                <span className="text-muted-2 group-hover:text-accent transition-colors">↗</span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="card p-5 flex items-center justify-between group">
                <span className="text-[0.94rem]">github.com/gorredinesh21</span>
                <span className="text-muted-2 group-hover:text-accent transition-colors">↗</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="card p-5 flex items-center justify-between group">
                <span className="text-[0.94rem]">in/gorredinesh21</span>
                <span className="text-muted-2 group-hover:text-accent transition-colors">↗</span>
              </a>
              <a href={profile.resumeUrl} target="_blank" className="card p-5 flex items-center justify-between group">
                <span className="text-[0.94rem]">Résumé (PDF)</span>
                <span className="text-muted-2 group-hover:text-accent transition-colors">↧</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { Github, Linkedin } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact — Dinesh Gorre",
  description: "Email, GitHub, LinkedIn and resume.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="page-title">
            Building something?
            <br />
            <span className="grad">Say hello.</span>
          </h1>
        </div>
      </section>

      <section className="section !pt-6 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-5 md:grid-cols-2">
          <Reveal>
            <a href={`mailto:${profile.email}`} className="card p-8 h-full block group">
              <p className="eyebrow mb-3">Email — fastest</p>
              <p className="font-display font-bold text-2xl sm:text-3xl tracking-tight group-hover:text-accent transition-colors break-all">
                {profile.email}
              </p>
              <p className="mt-3 text-muted text-[0.9rem]">
                Roles, collaborations, or a Homaatri order you want catered —
                it all lands here.
              </p>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card p-8 h-full flex flex-col gap-4">
              <p className="eyebrow">Elsewhere</p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[1.05rem] hover:text-accent transition-colors"
              >
                <Github size={19} /> github.com/gorredinesh21 ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[1.05rem] hover:text-accent transition-colors"
              >
                <Linkedin size={19} /> linkedin.com/in/gorredinesh21 ↗
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[1.05rem] hover:text-accent transition-colors"
              >
                📄 Resume (PDF) ↗
              </a>
              <p className="mt-auto text-muted text-[0.84rem]">
                {profile.location} · usually replies within a day
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

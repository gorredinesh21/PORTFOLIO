import Link from "next/link";
import { ArrowRight, Mail, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { TerminalWindow } from "@/components/terminal-window";
import { Typewriter } from "@/components/typewriter";
import { Tag } from "@/components/tag";
import { profile, projects, skills } from "@/lib/data";

const heroLines = [
  "$ whoami",
  "  → Gorre Dinesh Chandan Reddy",
  "  → Data / AI Engineer @ Reliance Industries",
  "  → IIT (ISM) Dhanbad, CSE '25",
  "",
  "$ cat focus.txt",
  "  Data Engineering · Machine Learning · Deep Learning · Generative AI",
  "",
  "$ status",
  "  → currently shipping RAG & Genie systems on Databricks",
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid lg:grid-cols-[1.4fr,1fr] gap-8 items-start">
        <div>
          <div className="text-sm text-muted mb-3">
            <span className="text-accent-2">●</span> online · {profile.location}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            <span className="text-muted">&gt; </span>
            <span className="text-foreground">Hi, I&apos;m </span>
            <span className="text-accent glow-text">Dinesh</span>
            <span className="cursor-blink">&nbsp;</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/85 max-w-xl leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              "Databricks",
              "PySpark",
              "LangGraph",
              "RAG",
              "PyTorch",
              "Azure",
            ].map((s) => (
              <Tag key={s} className="bg-background-alt">
                {s}
              </Tag>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded border border-accent bg-accent/10 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-background"
            >
              ls ./projects <ArrowRight size={14} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              cat about.md
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Github size={14} /> github
            </a>
          </div>
        </div>

        <TerminalWindow title="dinesh@portfolio: ~">
          <Typewriter lines={heroLines} className="text-[13px] sm:text-sm" />
        </TerminalWindow>
      </section>

      <section>
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="text-sm text-muted">
              <span className="text-accent-2">$</span> ls -la ./featured
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-1">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-muted hover:text-accent inline-flex items-center gap-1"
          >
            see all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col rounded-md border border-border bg-background-alt/60 p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <div className="text-xs text-muted">{p.period}</div>
              <h3 className="mt-1 text-lg font-semibold group-hover:text-accent">
                <span className="text-accent-2">./</span>
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 3).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
                {p.stack.length > 3 && <Tag>+{p.stack.length - 3}</Tag>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-md border border-border bg-background-alt/60 p-5">
          <div className="text-xs text-muted">
            <span className="text-accent-2">$</span> cat experience.summary
          </div>
          <h3 className="mt-1 text-base font-semibold">Reliance Industries</h3>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
            Building Databricks Genie integrations, RAG over 120+ tables, and
            near-real-time ADF pipelines.
          </p>
          <Link
            href="/experience"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent"
          >
            cd ./experience <ArrowRight size={14} />
          </Link>
        </div>

        <div className="rounded-md border border-border bg-background-alt/60 p-5">
          <div className="text-xs text-muted">
            <span className="text-accent-2">$</span> stack --top
          </div>
          <h3 className="mt-1 text-base font-semibold">What I Work With</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skills
              .flatMap((s) => s.items)
              .slice(0, 12)
              .map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
          </div>
          <Link
            href="/skills"
            className="mt-3 inline-flex items-center gap-1 text-sm text-accent"
          >
            cd ./skills <ArrowRight size={14} />
          </Link>
        </div>

        <div className="rounded-md border border-border bg-background-alt/60 p-5">
          <div className="text-xs text-muted">
            <span className="text-accent-2">$</span> ./reach-me
          </div>
          <h3 className="mt-1 text-base font-semibold">Get in touch</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-muted" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={14} className="text-muted" />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin / gorredinesh21
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FileText size={14} className="text-muted" />
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                resume.pdf
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type Project } from "@/lib/data";
import { BrowserFrame } from "@/components/browser-frame";
import { HowItWorks } from "@/components/how-it-works";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — Dinesh Gorre`, description: p.tagline };
}

function linkLabel(p: Project) {
  return p.liveLabel ?? "Try it live";
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      {/* ── Title band ─────────────────────────────────────────────────── */}
      <section className="page-hero !pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[0.8rem] text-muted-2">
            <Link href="/projects" className="hover:text-accent transition-colors">
              Projects
            </Link>
            <span aria-hidden="true">/</span>
            <span className="chip">{p.category}</span>
            {p.liveUrl && (
              <span className="chip !text-[#7ee2a8] !border-[#7ee2a844]">
                ● live
              </span>
            )}
          </div>
          <h1 className="detail-title">
            <span className="grad">{p.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
            {p.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noreferrer" className="pill solid">
                {linkLabel(p)} ↗
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="pill">
                Source ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Hero screenshot in a browser frame ─────────────────────────── */}
      <section className="pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <BrowserFrame
              src={p.cover}
              url={p.liveUrl ?? "github.com/gorredinesh21"}
              alt={`${p.name} — real interface`}
              tall
            />
          </Reveal>
        </div>
      </section>

      {/* ── Story + metrics ────────────────────────────────────────────── */}
      <section className="section !pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="flex flex-col gap-5">
              <p className="eyebrow">The story</p>
              <p className="text-[1.06rem] leading-[1.85] text-foreground/90">
                {p.story}
              </p>
              {p.question && (
                <div className="bubble q mt-2">
                  <span className="who">the question</span>
                  {p.question}
                </div>
              )}
              {p.reply && (
                <div className="bubble r">
                  <span className="who">why it's built this way</span>
                  {p.reply}
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {p.metrics && p.metrics.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">By the numbers</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {p.metrics.map((m) => (
                      <div key={m.k} className="stat-tile !p-3.5">
                        <div className="v !text-[1.15rem]">{m.v}</div>
                        <div className="k !text-[0.68rem]">{m.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="eyebrow mb-3">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section className="section !pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-3">How it works</p>
            <HowItWorks d={p.diagram} />
            {p.diagramCaption && (
              <p className="mt-3 text-[0.8rem] text-muted-2">{p.diagramCaption}</p>
            )}
          </Reveal>

          {p.gallery && p.gallery.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {p.gallery.map((g) => (
                <Reveal key={g}>
                  <BrowserFrame
                    src={g}
                    url={p.liveUrl ?? "github.com/gorredinesh21"}
                    alt={`${p.name} — additional view`}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Prev / next ────────────────────────────────────────────────── */}
      <section className="section !pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid sm:grid-cols-2 gap-4">
          <Link href={`/projects/${prev.slug}`} className="card p-5 group">
            <span className="eyebrow !text-[0.62rem]">← previous</span>
            <span className="block mt-2 font-display font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
              {prev.name}
            </span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="card p-5 group text-right">
            <span className="eyebrow !text-[0.62rem]">next →</span>
            <span className="block mt-2 font-display font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
              {next.name}
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

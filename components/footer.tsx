import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border bg-surface/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-violet text-xs font-bold text-white">
              DR
            </span>
            <span className="font-semibold">{profile.name}</span>
          </div>
          <p className="mt-2 text-sm text-muted">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-1 text-xs text-muted-2">
            © {new Date().getFullYear()} · Built with Next.js, Tailwind &amp; Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Linkedin size={18} />
          </a>
          <Link
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

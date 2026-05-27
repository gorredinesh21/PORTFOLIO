import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background-alt/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
        <div className="text-muted">
          <span className="text-accent-2">$</span> echo &quot;built with next.js + tailwind&quot;
          <div className="mt-1 text-xs">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent flex items-center gap-2"
          >
            <Github size={16} /> github
          </Link>
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent flex items-center gap-2"
          >
            <Linkedin size={16} /> linkedin
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            className="text-foreground hover:text-accent flex items-center gap-2"
          >
            <Mail size={16} /> email
          </Link>
        </div>
      </div>
    </footer>
  );
}

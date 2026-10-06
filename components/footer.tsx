import { profile } from "@/lib/data";
import { Github, Linkedin } from "@/components/brand-icons";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="footer-note">
          Built with Next.js · stars hand-drawn on a canvas · no template.
        </div>
        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a href="#top" className="footer-note hover:text-accent transition-colors">
            ↑ back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

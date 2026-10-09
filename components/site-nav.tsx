"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[rgba(250,248,242,0.86)] border-b border-[var(--border)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="w-8 h-8 rounded-lg border border-[var(--border-strong)] grid place-items-center font-display font-bold text-[0.8rem] text-accent group-hover:border-accent transition-colors">
            {profile.monogram}
          </span>
          <span className="hidden sm:block font-display font-semibold tracking-tight">
            {profile.shortName}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-full text-[0.86rem] transition-colors ${
                isActive(l.href)
                  ? "text-foreground bg-[var(--surface-strong)] border border-[var(--border-strong)]"
                  : "text-muted hover:text-foreground border border-transparent"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-1.5 hidden sm:inline-flex pill solid !py-1.5 !px-4 !text-[0.82rem]"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

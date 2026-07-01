"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-violet text-sm font-bold text-white shadow-[0_8px_20px_-8px_var(--accent-ring)] transition-transform group-hover:scale-105">
            DR
          </span>
          <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
            {profile.shortName}
            <span className="text-muted-2">.dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 rounded-full border border-border bg-surface/70 p-1 backdrop-blur md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                className={cn(
                  "nav-link rounded-full px-4 py-1.5 text-sm font-medium",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn btn-primary !py-2 !px-4 text-sm">
            Get in touch
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-xl border border-border-strong bg-surface p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block border-b border-border px-5 py-3.5 text-sm font-medium",
                  active ? "text-accent" : "text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block px-5 py-3.5 text-sm font-semibold text-accent"
          >
            Get in touch →
          </Link>
        </nav>
      )}
    </header>
  );
}

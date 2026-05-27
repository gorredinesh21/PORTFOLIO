"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-foreground hover:text-accent"
        >
          <span className="text-accent-2">$</span>
          <span className="font-semibold tracking-tight">
            {profile.shortName.toLowerCase()}@portfolio
          </span>
          <span className="text-muted group-hover:text-accent">:~</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded border border-transparent transition-colors",
                  active
                    ? "border-border bg-background-alt text-accent"
                    : "text-foreground hover:text-accent hover:bg-background-alt/60"
                )}
              >
                <span className="text-muted">cd</span> {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden rounded border border-border p-1.5 text-foreground hover:text-accent"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background-alt">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-5 py-3 border-b border-border text-sm",
                  active ? "text-accent" : "text-foreground hover:text-accent"
                )}
              >
                <span className="text-muted">cd</span> {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}

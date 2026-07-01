import { Mail, Phone, FileText, MapPin, ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/data";

export const metadata = { title: "Contact — Dinesh" };

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "gorredinesh21",
    href: profile.github,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "gorredinesh21",
    href: profile.linkedin,
  },
  {
    icon: FileText,
    label: "Résumé",
    value: "Résumé (PDF)",
    href: profile.resumeUrl,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: null,
  },
];

const openTo = [
  "AI / GenAI Engineer roles",
  "Full-Stack / Software Engineer roles",
  "Data Engineer roles",
  "Freelance builds & collaborations",
];

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something"
        description="Whether it's a role, a collaboration, or just a chat about AI and the web — I read every message and reply within a day."
      />

      <div className="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted-2">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {value}
                      </span>
                    </span>
                    {href && (
                      <ArrowUpRight
                        size={16}
                        className="ml-auto shrink-0 text-muted-2 group-hover:text-accent"
                      />
                    )}
                  </>
                );

                const cls =
                  "group flex items-center gap-3 rounded-xl border border-border p-3.5 transition-colors";

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`${cls} hover:border-accent hover:bg-accent-soft/40`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>

            <a href={`mailto:${profile.email}`} className="btn btn-primary mt-6 w-full">
              <Mail size={16} /> Send me an email
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Open to chat
              </span>
            </div>

            <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-2">
              Open to
            </div>
            <ul className="mt-3 space-y-2.5">
              {openTo.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 text-accent">→</span>
                  <span className="text-foreground/85">{o}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-2">
                  Response
                </div>
                <div className="mt-0.5 font-medium">Within 24 hours</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-2">
                  Timezone
                </div>
                <div className="mt-0.5 font-medium">IST (UTC+5:30)</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

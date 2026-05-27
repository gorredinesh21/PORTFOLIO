import { Mail, Phone, FileText, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { PageHeader } from "@/components/page-header";
import { SectionCard } from "@/components/section-card";
import { profile } from "@/lib/data";

export const metadata = { title: "contact — dinesh" };

const contacts = [
  {
    icon: Mail,
    label: "email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Github,
    label: "github",
    value: "gorredinesh21",
    href: profile.github,
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: "gorredinesh21",
    href: profile.linkedin,
  },
  {
    icon: FileText,
    label: "resume",
    value: "GORRE_DINESH_CV.pdf",
    href: profile.resumeUrl,
  },
  {
    icon: MapPin,
    label: "location",
    value: profile.location,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        command="./contact --interactive"
        description="The fastest ways to reach me. I read every message."
      />

      <div className="grid lg:grid-cols-[1.4fr,1fr] gap-6 items-start">
        <SectionCard filename="contact.sh">
          <pre className="text-xs sm:text-sm overflow-x-auto leading-relaxed text-foreground/90">
{`#!/usr/bin/env bash
# Reach out for: collaborations, opportunities,
# or just a chat about data, AI, or anything technical.

NAME="${profile.name}"
ROLE="${profile.role}"
LOCATION="${profile.location}"

if [[ "$YOUR_INTEREST" =~ (data|ai|gen-ai|databricks|rag) ]]; then
    echo "Email me — I am almost always available."
fi`}
          </pre>

          <ul className="mt-6 space-y-3">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-2 text-muted w-24 shrink-0">
                  <Icon size={14} /> {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-foreground hover:text-accent break-all"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-foreground">{value}</span>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard filename="availability.json">
          <pre className="text-xs sm:text-sm leading-relaxed text-foreground/90">
{`{
  "status":     "open to chat",
  "open_to":    [
    "AI Engineer roles",
    "Data Engineer roles",
    "Gen AI / RAG consulting",
    "collaboration on side projects"
  ],
  "response":   "within 24 hours",
  "timezone":   "Asia/Kolkata (UTC+5:30)"
}`}
          </pre>
        </SectionCard>
      </div>
    </div>
  );
}

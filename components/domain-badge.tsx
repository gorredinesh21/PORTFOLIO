import type { Domain } from "@/lib/data";
import { domainStyles, cn } from "@/lib/utils";

export function DomainBadge({
  domain,
  className,
}: {
  domain: Domain;
  className?: string;
}) {
  const s = domainStyles[domain];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        s.bg,
        s.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

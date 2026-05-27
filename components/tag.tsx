import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-background-alt/70 px-2 py-0.5 text-xs text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";

type Props = {
  filename: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionCard({ filename, className, children }: Props) {
  return (
    <section
      className={cn(
        "rounded-md border border-border bg-background-alt/60 backdrop-blur",
        className
      )}
    >
      <header className="flex items-center gap-2 border-b border-border px-4 py-2 text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-accent-2" />
        <span className="font-medium text-foreground">{filename}</span>
      </header>
      <div className="p-5 sm:p-6 text-sm sm:text-[15px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

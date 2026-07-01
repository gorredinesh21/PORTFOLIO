import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionCard({ title, eyebrow, className, children }: Props) {
  return (
    <section className={cn("card p-6 sm:p-7", className)}>
      {(title || eyebrow) && (
        <header className="mb-4">
          {eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              {eyebrow}
            </div>
          )}
          {title && (
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {title}
            </h3>
          )}
        </header>
      )}
      <div className="text-[15px] leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}

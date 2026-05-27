import { cn } from "@/lib/utils";

type Props = {
  command: string;
  description?: string;
  className?: string;
};

export function PageHeader({ command, description, className }: Props) {
  return (
    <div className={cn("mb-10", className)}>
      <div className="text-sm sm:text-base">
        <span className="text-muted">user@dinesh:~</span>
        <span className="text-foreground">$ </span>
        <span className="text-accent">{command}</span>
      </div>
      {description && (
        <p className="mt-4 text-muted text-sm sm:text-base max-w-2xl leading-relaxed">
          <span className="text-accent-2"># </span>
          {description}
        </p>
      )}
    </div>
  );
}

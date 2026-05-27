import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

export function TerminalWindow({ title = "bash", className, children }: Props) {
  return (
    <div className={cn("terminal-window", className)}>
      <div className="terminal-titlebar">
        <span className="terminal-dot bg-[#ff5f56]" />
        <span className="terminal-dot bg-[#ffbd2e]" />
        <span className="terminal-dot bg-[#27c93f]" />
        <span className="ml-3 text-muted">— {title} —</span>
      </div>
      <div className="p-5 sm:p-7 text-sm sm:text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

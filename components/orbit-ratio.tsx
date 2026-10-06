// From → To metric visual: two dots orbiting a shared core, sized (and
// captioned) by the project's real ratio. Pure CSS animation, pausable via
// body.motion-paused, disabled under prefers-reduced-motion.
export function OrbitRatio({
  fromLabel,
  fromValue,
  toLabel,
  toValue,
  caption,
  ratio,
}: {
  fromLabel: string;
  fromValue: string;
  toLabel: string;
  toValue: string;
  caption: string;
  ratio: number;
}) {
  // dot radii: small "from" dot, big "to" dot — scaled from the ratio
  const rSmall = 4;
  const rBig = Math.min(4 + ratio * 1.6, 15);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="orbit-stage" style={{ ["--orbit-period" as string]: "26s" }}>
        <div className="orbit-ring" />
        <div
          className="orbit-ring"
          style={{ inset: "16%", opacity: 0.6 }}
        />
        <div className="orbit-core" />
        {/* outer (large) dot on the main ring */}
        <div className="orbit-spin">
          <span
            className="orbit-dot"
            style={{
              ["--dot-r" as string]: `${rBig}px`,
              left: "auto",
              right: `calc(-1 * ${rBig}px)`,
              background: "var(--amber)",
              boxShadow: "0 0 18px rgba(255,176,84,0.55)",
            }}
          />
        </div>
        {/* inner (small) dot on the inner ring */}
        <div className="orbit-spin slow" style={{ inset: "16%" }}>
          <span
            className="orbit-dot"
            style={{
              ["--dot-r" as string]: `${rSmall}px`,
              left: "auto",
              right: `calc(-1 * ${rSmall}px)`,
              background: "var(--accent)",
              boxShadow: "0 0 12px rgba(179,173,255,0.5)",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="text-right border-r border-border pr-4">
          <div className="eyebrow !text-amber/80">{fromLabel}</div>
          <div className="text-[0.95rem] text-muted mt-1 leading-snug">
            {fromValue}
          </div>
        </div>
        <div>
          <div className="eyebrow">{toLabel}</div>
          <div className="text-[0.95rem] text-foreground mt-1 leading-snug font-medium">
            {toValue}
          </div>
        </div>
      </div>
      <p className="text-[0.74rem] text-muted-2 leading-relaxed text-center max-w-[19rem]">
        {caption}
      </p>
    </div>
  );
}

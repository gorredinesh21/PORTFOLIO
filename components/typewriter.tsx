"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  speed?: number;
  startDelay?: number;
  className?: string;
};

export function Typewriter({
  lines,
  speed = 22,
  startDelay = 250,
  className,
}: Props) {
  const [rendered, setRendered] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;
    let buffer = lines.map(() => "");

    const start = setTimeout(function tick() {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const current = lines[lineIdx];
      buffer[lineIdx] = current.slice(0, charIdx + 1);
      setRendered([...buffer]);
      charIdx++;
      if (charIdx >= current.length) {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, speed * 8);
      } else {
        setTimeout(tick, speed);
      }
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [lines, speed, startDelay]);

  return (
    <div className={className}>
      {rendered.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
          {i === rendered.length - 1 && !done && <span className="cursor-blink">&nbsp;</span>}
        </div>
      ))}
    </div>
  );
}

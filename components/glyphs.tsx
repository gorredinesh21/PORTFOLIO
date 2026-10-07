// Minimal inline stroke glyphs (no icon package dependency).
// 16-20px grid, currentColor stroke — they inherit accent colors.
type G = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function CodeGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function SparkGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
      <path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </svg>
  );
}

export function DbGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <ellipse cx="12" cy="5.5" rx="8" ry="2.8" />
      <path d="M4 5.5v6c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-6" />
      <path d="M4 11.5v6c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-6" />
    </svg>
  );
}

export function CloudGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M17.5 19a4.5 4.5 0 0 0 .4-9 6 6 0 0 0-11.6 1.6A4 4 0 0 0 7 19z" />
    </svg>
  );
}

export function ChatGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3c-1.5 0-3-.4-4.2-1L3 20l1.3-4.1a8 8 0 0 1-1.3-4.4A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
      <path d="M8 10h8M8 13.5h5" />
    </svg>
  );
}

export function HubGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="4.5" cy="5" r="1.8" />
      <circle cx="19.5" cy="5" r="1.8" />
      <circle cx="4.5" cy="19" r="1.8" />
      <circle cx="19.5" cy="19" r="1.8" />
      <path d="M6 6.3l4 4M18 6.3l-4 4M6 17.7l4-4M18 17.7l-4-4" />
    </svg>
  );
}

export function RouteGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <circle cx="5" cy="6" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M7.2 6h5.3a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h6.3" />
    </svg>
  );
}

export function ChartGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M3 3v18h18" />
      <path d="M7 15v-4M12 15V7M17 15v-6" />
    </svg>
  );
}

export function RocketGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8.9-2.1.2-3l-1.2-1.2c-.9-.7-2.2-.6-3 .2z" />
      <path d="M9 12l-1.5-1.5c2.7-3.6 6-6.5 12-6.5 0 6-2.9 9.3-6.5 12L12 15z" />
      <circle cx="15" cy="9" r="1.4" />
    </svg>
  );
}

export function RulerGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M3 17.5L17.5 3 21 6.5 6.5 21z" />
      <path d="M8 13l1.5 1.5M11 10l1.5 1.5M14 7l1.5 1.5" />
    </svg>
  );
}

export function SatelliteGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M9 5l4 4-4 4-4-4z" />
      <path d="M15 11l4 4-4 4-4-4z" />
      <path d="M13 7l4 4" />
      <path d="M19 5a7.5 7.5 0 0 1 0 6" />
    </svg>
  );
}

export function TrophyGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v6a5 5 0 0 1-10 0z" />
      <path d="M7 6H4a1 1 0 0 0-1 1c0 2 1.8 3.7 4 4M17 6h3a1 1 0 0 1 1 1c0 2-1.8 3.7-4 4" />
    </svg>
  );
}

export function MergeGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <circle cx="18" cy="18" r="2.4" />
      <circle cx="6" cy="6" r="2.4" />
      <path d="M6 8.4v2.1a5 5 0 0 0 5 5h4.6" />
      <path d="M18 15.6v-2.1a5 5 0 0 0-5-5H8.4" />
    </svg>
  );
}

export function CapGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.8V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.2" />
      <path d="M21.5 9.5V15" />
    </svg>
  );
}

export function FlagGlyph({ size = 18 }: G) {
  return (
    <svg {...base(size)}>
      <path d="M5 21V4" />
      <path d="M5 4c4-2 7 2 12 0v9c-5 2-8-2-12 0" />
    </svg>
  );
}

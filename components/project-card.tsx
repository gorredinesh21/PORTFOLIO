import Link from "next/link";
import type { Project } from "@/lib/data";
import { Tilt } from "@/components/tilt";

// Image-first card. The project NAME is the visual anchor (overlaid, big,
// gradient-highlighted); text stays to one tagline line.
export function ProjectCard({
  p,
  feat = false,
  index,
}: {
  p: Project;
  feat?: boolean;
  index?: number;
}) {
  return (
    <Tilt>
      <Link
        href={`/projects/${p.slug}`}
        className={`pcard ${feat ? "feat" : ""}`}
        aria-label={`${p.name} — ${p.tagline}`}
      >
      <div className="pcard-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={`${p.name} interface`} loading={index && index > 5 ? "lazy" : undefined} />
        {p.liveUrl && (
          <span className="pcard-flag live">live</span>
        )}
        {!p.liveUrl && (
          <span className="pcard-flag">{p.category}</span>
        )}
        <span className="pcard-name">
          <span className="grad">{p.name}</span>
        </span>
      </div>
      <div className="pcard-body">
        <p className="pcard-tag">{p.tagline}</p>
        <div className="pcard-foot">
          <span className="chip">{p.category}</span>
          <span className="stackline">{p.stack.slice(0, 3).join(" · ")}</span>
        </div>
      </div>
      </Link>
    </Tilt>
  );
}

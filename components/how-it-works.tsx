import type { Diagram } from "@/lib/data";

// Data-driven "how it works" graphics. Three shapes cover every project:
//   flow  — a left-to-right pipeline (optionally looping, optionally with a
//           fallback/annotation strip)
//   split — one head, parallel labeled channels, merged into a tail
// Pure HTML/CSS (no canvas, no deps): nodes, arrows, channel chips.
export function HowItWorks({ d, dense = false }: { d: Diagram; dense?: boolean }) {
  return (
    <div
      className={`dg ${dense ? "dg-dense" : ""}`}
      role="img"
      aria-label="How it works diagram"
    >
      {d.kind === "flow" ? (
        <>
          <div className="dg-row">
            {d.nodes.map((n, i) => (
              <span key={i} className="dg-seg">
                {i > 0 && <span className="dg-arrow">→</span>}
                <span className={`dg-node ${n.tone ?? ""}`}>
                  {n.label}
                  {n.sub && <em>{n.sub}</em>}
                </span>
              </span>
            ))}
            {d.loop && (
              <span className="dg-seg">
                <span className="dg-arrow">↺</span>
                <span className="dg-node muted">{d.loop}</span>
              </span>
            )}
          </div>
          {d.note && <div className="dg-note">⚠ {d.note}</div>}
        </>
      ) : (
        <>
          <div className="dg-row dg-center">
            <span className={`dg-node dg-head ${d.head.tone ?? ""}`}>
              {d.head.label}
              {d.head.sub && <em>{d.head.sub}</em>}
            </span>
          </div>
          <div className="dg-fan" aria-hidden="true">
            splits ↓
          </div>
          <div className={`dg-channels ch-${d.channels.length}`}>
            {d.channels.map((c) => (
              <div key={c.label} className="dg-channel">
                <span className="dg-chan">{c.label}</span>
                <div className="dg-row">
                  {c.nodes.map((n, i) => (
                    <span key={i} className="dg-seg">
                      {i > 0 && <span className="dg-arrow">→</span>}
                      <span className={`dg-node ${n.tone ?? ""}`}>
                        {n.label}
                        {n.sub && <em>{n.sub}</em>}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="dg-fan" aria-hidden="true">
            merges ↓
          </div>
          <div className="dg-row dg-center">
            <span className={`dg-node dg-head ${d.tail.tone ?? ""}`}>
              {d.tail.label}
              {d.tail.sub && <em>{d.tail.sub}</em>}
            </span>
          </div>
          {d.note && <div className="dg-note">⚠ {d.note}</div>}
        </>
      )}
    </div>
  );
}

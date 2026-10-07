// Screenshot inside a minimal browser chrome — makes product shots read
// as "this is a real site", not a floating image.
export function BrowserFrame({
  src,
  url,
  alt,
  tall = false,
}: {
  src: string;
  url: string;
  alt: string;
  tall?: boolean;
}) {
  return (
    <figure className="bframe">
      <div className="bframe-bar" aria-hidden="true">
        <span className="bframe-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="bframe-url">{url.replace(/^https?:\/\//, "")}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={tall ? { maxHeight: "78vh", objectFit: "cover" } : undefined}
      />
    </figure>
  );
}

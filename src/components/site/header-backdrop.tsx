/**
 * HeaderBackdropArt — the orbital line-art system rendered as a wide,
 * faint backdrop behind the transparent header.
 *
 * Same visual language as the hero showpiece panel (concentric rings,
 * orbital ellipses, one dashed blue arc, quiet nodes) — scaled up and
 * dialed down to near-whisper opacity, dissolving downward via a CSS
 * mask so the headline below stays pristine.
 */
export function HeaderBackdropArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Concentric rings — system center sits above the viewport */}
      <circle cx="720" cy="-70" r="200" fill="none" stroke="#1A2332" strokeOpacity="0.085" strokeWidth="1" />
      <circle cx="720" cy="-70" r="320" fill="none" stroke="#1A2332" strokeOpacity="0.065" strokeWidth="1" />
      <circle cx="720" cy="-70" r="440" fill="none" stroke="#1A2332" strokeOpacity="0.05" strokeWidth="1" />
      <circle cx="720" cy="-70" r="560" fill="none" stroke="#1A2332" strokeOpacity="0.038" strokeWidth="1" />

      {/* Orbital ellipses */}
      <ellipse
        cx="720" cy="-70" rx="620" ry="190"
        fill="none" stroke="#1A2332" strokeOpacity="0.055" strokeWidth="1"
        transform="rotate(-11 720 -70)"
      />
      <ellipse
        cx="720" cy="-70" rx="620" ry="190"
        fill="none" stroke="#1A2332" strokeOpacity="0.055" strokeWidth="1"
        transform="rotate(11 720 -70)"
      />

      {/* Single dashed electric-blue arc */}
      <circle
        cx="720" cy="-70" r="480"
        fill="none" stroke="#007AFF" strokeOpacity="0.32" strokeWidth="1.2"
        strokeDasharray="300 2713" strokeLinecap="round"
        transform="rotate(36 720 -70)"
      />

      {/* Quiet nodes on the visible lower sweeps */}
      <circle cx="720" cy="130" r="3" fill="#1A2332" fillOpacity="0.34" />
      <circle cx="560" cy="205" r="2.5" fill="#1A2332" fillOpacity="0.28" />
      <circle cx="880" cy="205" r="2.5" fill="#1A2332" fillOpacity="0.28" />
      <circle cx="400" cy="330" r="2.5" fill="#1A2332" fillOpacity="0.22" />
      <circle cx="1040" cy="330" r="2.5" fill="#1A2332" fillOpacity="0.22" />
      <circle cx="255" cy="462" r="2" fill="#1A2332" fillOpacity="0.18" />
      <circle cx="1185" cy="462" r="2" fill="#1A2332" fillOpacity="0.18" />
      {/* Electric-blue node */}
      <circle cx="720" cy="410" r="3.5" fill="#007AFF" fillOpacity="0.55" />
    </svg>
  );
}

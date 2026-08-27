import { cn } from '@/lib/utils';

/**
 * FaQ Systems brand mark — a deep-navy rounded square carrying a geometric
 * white "Q" whose tail cuts out in electric blue: the same blue that
 * highlights the Q of the wordmark. Inline SVG, so it stays razor sharp
 * at every size and DPI (no raster assets, no load flash).
 */
export function FaqMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn('h-6 w-6 shrink-0 md:h-[26px] md:w-[26px]', className)}
    >
      {/* tile */}
      <rect x="1" y="1" width="30" height="30" rx="8.5" fill="#1a2332" />
      {/* Q ring */}
      <circle
        cx="15.4"
        cy="15.2"
        r="7"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.6"
      />
      {/* Q tail — the brand-blue stroke of the identity */}
      <line
        x1="19.2"
        y1="19.4"
        x2="24.6"
        y2="24.8"
        stroke="#007aff"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * FaQ Systems logo — brand mark + wordmark set in the site's display face
 * (Plus Jakarta Sans). One family, one accent: "FaQ" in ink with the Q in
 * electric blue, "Systems" in a quieter ink for hierarchy.
 */
export function FaqLogo({
  className,
}: {
  className?: string;
  /** Kept for API compatibility — the logo is now inline SVG + text. */
  priority?: boolean;
}) {
  return (
    <a
      href="#top"
      aria-label="FaQ Systems — back to top"
      className={cn('group flex select-none items-center gap-[7px]', className)}
    >
      <FaqMark className="transition-transform duration-500 group-hover:-rotate-3" />
      <span className="-translate-y-[0.5px] font-display text-[18px] font-extrabold leading-none tracking-[-0.015em] text-ink">
        Fa
        <span className="text-crimson">Q</span>
        <span className="ml-[6px]">Systems</span>
      </span>
    </a>
  );
}

/**
 * Display wordmark for the customer marquee.
 */
export function BrandWordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        'whitespace-nowrap font-display text-[19px] font-bold tracking-tight text-ink/40 transition-colors duration-500 hover:text-ink',
        className
      )}
    >
      {name}
    </span>
  );
}

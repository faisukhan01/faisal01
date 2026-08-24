import { cn } from '@/lib/utils';

/** NETSOL logo - blue geometric N mark + wordmark. */
export function NetsolLogo({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'light';
}) {
  const textColor = variant === 'light' ? '#ffffff' : '#454648';
  return (
    <div className={cn('flex items-center gap-2 select-none', className)}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="7" fill="#1D81F2" />
        <path
          d="M10 26V10H13.5L22.5 19.5V10H26V26H22.5L13.5 16.5V26H10Z"
          fill="white"
        />
      </svg>
      <span
        className="font-semibold tracking-tight"
        style={{ color: textColor, fontSize: '20px', lineHeight: 1 }}
      >
        NETSOL
      </span>
    </div>
  );
}

/** Wordmark for a brand logo slot. */
export function BrandWordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        'font-semibold tracking-tight text-[#525252]/70 hover:text-[#161616] transition-colors',
        className
      )}
      style={{ fontSize: '20px', letterSpacing: '-0.01em' }}
    >
      {name}
    </span>
  );
}

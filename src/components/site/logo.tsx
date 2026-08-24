import { cn } from '@/lib/utils';

/**
 * NETSOL wordmark — ink monogram, crimson full-stop.
 * Restrained, print-grade logotype for the luxury editorial system.
 */
export function NetsolLogo({
  className,
  variant = 'dark',
}: {
  className?: string;
  variant?: 'dark' | 'light';
}) {
  const isLight = variant === 'light';
  return (
    <a
      href="#top"
      aria-label="NETSOL Technologies — back to top"
      className={cn('group flex select-none items-center gap-2.5', className)}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="30" height="30" rx="6" fill={isLight ? '#F5F2EA' : '#1A1815'} />
        <path
          d="M9 21.5v-13h2.9l7.2 8.2V8.5H22v13h-2.9l-7.2-8.2v8.2H9Z"
          fill={isLight ? '#14120F' : '#FAF9F5'}
        />
      </svg>
      <span
        className={cn(
          'text-[17px] font-semibold leading-none tracking-[0.02em]',
          isLight ? 'text-[#F5F2EA]' : 'text-ink'
        )}
      >
        NETSOL<span className="text-crimson">.</span>
      </span>
    </a>
  );
}

/**
 * Serif brand wordmark for the customer marquee.
 */
export function BrandWordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        'whitespace-nowrap font-serif text-[19px] tracking-tight text-ink/40 transition-colors duration-500 hover:text-ink',
        className
      )}
    >
      {name}
    </span>
  );
}

import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * FaQ Systems logo — the brand wordmark (navy "Fa", electric-blue "Q",
 * slate "Systems" with blue bracket mark), rendered from the supplied
 * transparent PNG.
 */
export function FaqLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <a
      href="#top"
      aria-label="FaQ Systems — back to top"
      className={cn('group flex select-none items-center', className)}
    >
      <Image
        src="/faq-logo.png"
        alt="FaQ Systems"
        width={170}
        height={30}
        priority={priority}
        sizes="170px"
        className="h-[26px] w-auto object-contain md:h-[30px]"
      />
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

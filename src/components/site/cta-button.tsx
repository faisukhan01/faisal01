'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'light' | 'outline';
  className?: string;
  onClick?: () => void;
}

/** NETSOL primary CTA - blue button with animated arrow icon. */
export function CTAButton({
  children,
  href = '#contact',
  variant = 'primary',
  className,
  onClick,
}: CTAButtonProps) {
  const base =
    'btn-glow group relative inline-flex items-center gap-2.5 rounded-[10px] px-7 py-3.5 font-semibold text-[15px] transition-all duration-300';
  const variants = {
    primary: 'bg-[#1d81f2] text-white hover:bg-[#0f62fe] shadow-[0_8px_24px_-8px_rgba(15,98,254,0.55)]',
    light: 'bg-white text-[#161616] hover:bg-[#f5f7fa] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]',
    outline:
      'border border-[#1d81f2] text-[#1d81f2] bg-transparent hover:bg-[#1d81f2] hover:text-white',
  };

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        whileHover={{ x: 2, y: -2 }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/15"
      >
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
      </motion.span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(base, variants[variant], className)}>
        {inner}
      </button>
    );
  }

  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {inner}
    </a>
  );
}

'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  /** translate distance in px (max translate as fraction of element size) */
  strength?: number;
  className?: string;
  /** render as a specific element */
  as?: 'div' | 'button' | 'a';
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

/**
 * Magnetic hover effect — children subtly follow the cursor.
 * Used to add premium micro-interactivity to CTAs, logo, etc.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  as = 'div',
  href,
  onClick,
  ariaLabel,
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setPos({ x: dx, y: dy });
  };

  const onMouseLeave = () => setPos({ x: 0, y: 0 });

  const shared = {
    ref: ref as any,
    onMouseMove,
    onMouseLeave,
    className: cn('inline-block', className),
    'aria-label': ariaLabel,
  };

  const motionProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring' as const, stiffness: 220, damping: 14, mass: 0.4 },
  };

  if (as === 'a') {
    return (
      <motion.a href={href} {...motionProps} {...shared}>
        {children}
      </motion.a>
    );
  }
  if (as === 'button') {
    return (
      <motion.button onClick={onClick} {...motionProps} {...shared}>
        {children}
      </motion.button>
    );
  }
  return (
    <motion.div {...motionProps} {...shared}>
      {children}
    </motion.div>
  );
}

/**
 * Section Heading — eyebrow, title and text at the top of a section.
 * Homepage sections use size "lg" with `reveal`; inner-page sections use "md".
 */

import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';

function Line({
  reveal,
  delay,
  children,
}: {
  reveal?: boolean;
  delay: number;
  children: ReactNode;
}) {
  return reveal ? <ScrollReveal delay={delay}>{children}</ScrollReveal> : children;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title?: string;
  text?: string;
  align?: 'center' | 'left';
  size?: 'lg' | 'md';
  /** Fade each line in as it scrolls into view */
  reveal?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
  size = 'lg',
  reveal,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <Line reveal={reveal} delay={0}>
          <div className="inline-flex items-center gap-2">
            <div className="bg-brand-accent h-px w-8" />
            <span className="text-brand-accent-text text-sm font-semibold tracking-widest uppercase">
              {eyebrow}
            </span>
            {centered && <div className="bg-brand-accent h-px w-8" />}
          </div>
        </Line>
      )}
      {title && (
        <Line reveal={reveal} delay={0.1}>
          <h2
            className={cn(
              'font-bold tracking-tight',
              eyebrow && 'mt-4',
              size === 'lg' ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-3xl md:text-4xl',
              'text-text-heading'
            )}
          >
            {title}
          </h2>
        </Line>
      )}
      {text && (
        <Line reveal={reveal} delay={0.2}>
          <p
            className={cn(
              'mt-4 max-w-2xl text-base leading-relaxed md:text-lg',
              centered && 'mx-auto',
              'text-text-body'
            )}
          >
            {text}
          </p>
        </Line>
      )}
    </div>
  );
}

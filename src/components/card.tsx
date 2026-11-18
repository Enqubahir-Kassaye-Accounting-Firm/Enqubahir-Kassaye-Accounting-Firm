/**
 * Card — the one card style: card surface, border, corner radius and shadow
 * from the theme tokens. Service, project, testimonial, About, detail-page and
 * legal cards and the contact form box all use it; never style a card inline.
 * Padding and layout come from `className`.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'div' | 'article' | 'blockquote';
  /** Accent line on the left edge */
  accent?: boolean;
  /** Lift and shadow on hover (cards that link somewhere) */
  interactive?: boolean;
  /** Accent border and ring (a featured service) */
  highlighted?: boolean;
}

export function Card({
  children,
  className,
  id,
  as: Tag = 'div',
  accent,
  interactive,
  highlighted,
}: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'bg-surface-card relative overflow-hidden rounded-2xl border shadow-sm',
        highlighted
          ? 'border-brand-accent/50 ring-brand-accent/20 ring-1'
          : 'border-border-default',
        interactive && [
          'transition-all duration-500',
          'hover:border-brand-accent/40 hover:-translate-y-1 motion-reduce:hover:translate-y-0',
          'hover:shadow-[0_12px_32px_color-mix(in_srgb,var(--brand-primary)_12%,transparent)]',
          'dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]',
        ],
        className
      )}
    >
      {accent && (
        <div
          aria-hidden="true"
          className="from-brand-accent to-brand-accent/50 absolute top-0 left-0 h-full w-1 bg-gradient-to-b"
        />
      )}
      {children}
    </Tag>
  );
}

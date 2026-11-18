/**
 * Hero Card
 * The card beside the hero title (home.ts → heroCard): a short checklist of
 * what the firm handles each month. Built on `Card`, so surface, border and
 * radius follow the theme tokens.
 */

import type { CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { Card } from '@/components/card';
import { cn } from '@/lib/utils';
import type { HeroCardContent } from '@/types/content';

interface HeroCardProps {
  card: HeroCardContent;
  /** Position in the hero's entrance sequence */
  step: number;
}

export function HeroCard({ card, step }: HeroCardProps) {
  return (
    <div
      className="animate-fade-up w-full min-w-0 lg:max-w-lg lg:justify-self-end"
      style={{ '--fade-delay': `${0.1 + step * 0.15}s` } as CSSProperties}
    >
      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-semibold tracking-widest uppercase">
            {card.title}
          </p>
          <p className="text-brand-accent-text text-sm font-semibold">{card.status}</p>
        </div>

        <ul className="mt-4">
          {card.items.map((item) => (
            <li
              key={item.label}
              className="border-border-default flex min-w-0 items-center justify-between gap-4 border-t py-4"
            >
              <span className="text-text-body min-w-0 wrap-break-word">{item.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                  item.done
                    ? 'bg-brand-primary text-brand-accent-text'
                    : 'border-border-default border-2'
                )}
              >
                {item.done && <Check className="h-4 w-4" />}
              </span>
            </li>
          ))}
        </ul>

        <p className="border-border-default text-text-muted border-t pt-5 text-sm leading-relaxed">
          {card.footerPrefix} <strong className="text-text-heading">{card.footerName}</strong>,{' '}
          {card.footerRole}
        </p>
      </Card>
    </div>
  );
}

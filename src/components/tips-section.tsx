/**
 * Tips Section
 * Accounting tips. On the homepage: three short cards and a "See all" button.
 * On /accounting-tips (`detailed`): every tip with its Why and How.
 */

import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PremiumButton } from '@/components/premium-button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';
import type { AccountingTip } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface TipsSectionProps {
  title: string;
  subtitle: string;
  tips: AccountingTip[];
  /** Show Why and How instead of the short summary */
  detailed?: boolean;
  /** Link of the "See all" button; leave out on the full page */
  seeAllHref?: string;
}

export function TipsSection({ title, subtitle, tips, detailed, seeAllHref }: TipsSectionProps) {
  if (tips.length === 0) {
    // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
    return null;
  }

  return (
    <section id="tips" className="section-y bg-surface-section">
      <Container>
        <SectionHeading
          reveal
          eyebrow={UI_TEXT.eyebrows.tips}
          title={title}
          text={subtitle}
          className="mb-12 md:mb-16"
        />

        <StaggerContainer
          className={cn('grid grid-cols-1 gap-6', detailed ? 'md:grid-cols-2' : 'lg:grid-cols-3')}
          staggerDelay={0.1}
        >
          {tips.map((tip, index) => (
            <StaggerItem key={tip.title} className="h-full">
              <Card accent interactive className="h-full p-8">
                <p className="text-brand-accent-text mb-2 pl-2 font-mono text-xs font-semibold tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-text-heading pl-2 text-xl font-bold text-balance wrap-break-word">
                  {tip.title}
                </h3>

                {detailed ? (
                  <dl className="mt-4 space-y-4 pl-2">
                    <div>
                      <dt className="text-brand-accent-text text-xs font-semibold tracking-widest uppercase">
                        {UI_TEXT.tips.whyLabel}
                      </dt>
                      <dd className="text-text-body mt-1 leading-relaxed wrap-break-word">
                        {tip.why}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-brand-accent-text text-xs font-semibold tracking-widest uppercase">
                        {UI_TEXT.tips.howLabel}
                      </dt>
                      <dd className="text-text-body mt-1 leading-relaxed wrap-break-word">
                        {tip.how}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-text-body mt-3 pl-2 text-[15px] leading-relaxed wrap-break-word">
                    {tip.summary}
                  </p>
                )}
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {seeAllHref && (
          <ScrollReveal>
            <div className="mt-10 flex justify-center md:mt-12">
              <PremiumButton href={seeAllHref} variant="primary">
                {UI_TEXT.tips.seeAll}
              </PremiumButton>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}

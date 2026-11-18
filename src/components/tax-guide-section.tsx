/**
 * Tax Guide Section
 * Tax filing do's and don'ts, side by side. On the homepage: three of each and
 * a "See all" button. On /tax-filing-dos-and-donts: all of them.
 */

import { Check, X, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PremiumButton } from '@/components/premium-button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { SectionHeading } from '@/components/section-heading';
import type { TaxGuidePoint } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface TaxGuideSectionProps {
  title: string;
  subtitle: string;
  dos: TaxGuidePoint[];
  donts: TaxGuidePoint[];
  /** Link of the "See all" button; leave out on the full page */
  seeAllHref?: string;
}

export function TaxGuideSection({ title, subtitle, dos, donts, seeAllHref }: TaxGuideSectionProps) {
  if (dos.length === 0 && donts.length === 0) {
    // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
    return null;
  }

  return (
    <section id="tax-guide" className="section-y bg-surface-page">
      <Container>
        <SectionHeading
          reveal
          eyebrow={UI_TEXT.eyebrows.taxGuide}
          title={title}
          text={subtitle}
          className="mb-12 md:mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 gap-6 lg:grid-cols-2" staggerDelay={0.1}>
          <StaggerItem className="h-full">
            <PointsCard heading={UI_TEXT.taxGuide.dosTitle} HeadingIcon={Check} points={dos} />
          </StaggerItem>
          <StaggerItem className="h-full">
            <PointsCard heading={UI_TEXT.taxGuide.dontsTitle} HeadingIcon={X} points={donts} />
          </StaggerItem>
        </StaggerContainer>

        {seeAllHref && (
          <ScrollReveal>
            <div className="mt-10 flex justify-center md:mt-12">
              <PremiumButton href={seeAllHref} variant="primary">
                {UI_TEXT.taxGuide.seeAll}
              </PremiumButton>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}

function PointsCard({
  heading,
  HeadingIcon,
  points,
}: {
  heading: string;
  HeadingIcon: LucideIcon;
  points: TaxGuidePoint[];
}) {
  return (
    <Card className="h-full p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="bg-brand-primary inline-flex shrink-0 rounded-xl p-3.5">
          <HeadingIcon className="text-brand-accent-text h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="text-text-heading text-xl font-bold md:text-2xl">{heading}</h3>
      </div>

      <ul className="mt-6">
        {points.map((point) => (
          <li
            key={point.title}
            className="border-border-default flex min-w-0 gap-3 border-t py-4 first:border-t-0 first:pt-0 last:pb-0"
          >
            <HeadingIcon
              className="text-brand-accent-text mt-1 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-text-heading font-semibold wrap-break-word">{point.title}</p>
              <p className="text-text-body mt-1 text-[15px] leading-relaxed wrap-break-word">
                {point.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

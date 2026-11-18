/**
 * Websites Section
 * Official websites, each a card that opens in a new tab. On the homepage: four
 * cards and a "See all" button. On /useful-websites: all of them.
 */

import { ExternalLink, Globe } from 'lucide-react';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PremiumButton } from '@/components/premium-button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { SectionHeading } from '@/components/section-heading';
import type { UsefulWebsite } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface WebsitesSectionProps {
  title: string;
  subtitle: string;
  websites: UsefulWebsite[];
  /** Link of the "See all" button; leave out on the full page */
  seeAllHref?: string;
}

/** 'https://www.example.gov.et/path' → 'example.gov.et' */
function displayHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function WebsitesSection({ title, subtitle, websites, seeAllHref }: WebsitesSectionProps) {
  if (websites.length === 0) {
    // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
    return null;
  }

  return (
    <section id="websites" className="section-y bg-surface-page">
      <Container>
        <SectionHeading
          reveal
          eyebrow={UI_TEXT.eyebrows.websites}
          title={title}
          text={subtitle}
          className="mb-12 md:mb-16"
        />

        <StaggerContainer
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {websites.map((website) => (
            <StaggerItem key={website.url} className="h-full">
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <Card interactive className="flex h-full flex-col p-8">
                  <div className="bg-brand-primary group-hover:shadow-brand-accent/10 mb-5 inline-flex w-fit shrink-0 rounded-xl p-3.5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <Globe className="text-brand-accent-text h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-text-heading group-hover:text-brand-accent-text text-xl font-bold text-balance wrap-break-word transition-colors duration-300">
                    {website.name}
                  </h3>
                  <p className="text-text-body mt-3 flex-1 text-[15px] leading-relaxed wrap-break-word">
                    {website.description}
                  </p>
                  <div className="text-brand-accent-text mt-6 flex min-w-0 items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-2.5">
                    <span className="min-w-0 truncate">{displayHost(website.url)}</span>
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="sr-only">{UI_TEXT.websites.opensInNewTab}</span>
                  </div>
                </Card>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {seeAllHref && (
          <ScrollReveal>
            <div className="mt-10 flex justify-center md:mt-12">
              <PremiumButton href={seeAllHref} variant="primary">
                {UI_TEXT.websites.seeAll}
              </PremiumButton>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}

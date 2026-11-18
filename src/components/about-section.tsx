/**
 * About Section
 * Philosophy/About with scroll reveal, refined typography, and system visualization
 * Architectural, calm presentation
 */

import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PremiumButton } from '@/components/premium-button';
import { SectionHeading } from '@/components/section-heading';
import { SERVICE_ICONS } from '@/lib/icons';
import type { AboutSummary } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface AboutSectionProps {
  about: AboutSummary;
}

export function AboutSection({ about }: AboutSectionProps) {
  const { title, summary: shortText, buttonText, factsTitle, facts = [] } = about;

  return (
    <section id="about" className="section-y bg-surface-page relative overflow-hidden">
      {/* Background glow effect matching hero visualization style */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 hidden h-full w-1/2 -translate-y-1/2 lg:block"
        style={{
          background:
            'radial-gradient(circle at 70% 50%, color-mix(in srgb, var(--brand-accent) 5%, transparent), transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          {/* Left: Text Content */}
          <div className="min-w-0 lg:max-w-xl">
            <SectionHeading
              reveal
              align="left"
              eyebrow={UI_TEXT.eyebrows.about}
              title={title}
              text={shortText}
            />

            {/* CTA Button */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 md:mt-12">
                <PremiumButton href="/about" variant="primary">
                  {buttonText}
                </PremiumButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: at a glance */}
          {facts.length > 0 && (
            <ScrollReveal delay={0.2} className="min-w-0 lg:max-w-lg lg:justify-self-end">
              <Card accent className="p-6 sm:p-8">
                {factsTitle && (
                  <p className="text-brand-accent-text pl-2 text-xs font-semibold tracking-widest uppercase">
                    {factsTitle}
                  </p>
                )}
                <ul className="mt-5 space-y-6 pl-2">
                  {facts.map((fact) => {
                    const Icon = SERVICE_ICONS[fact.icon];
                    return (
                      <li key={fact.label} className="flex min-w-0 items-start gap-4">
                        <div className="bg-brand-primary inline-flex shrink-0 rounded-xl p-3">
                          <Icon className="text-brand-accent-text h-5 w-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-text-muted text-xs font-semibold tracking-widest uppercase">
                            {fact.label}
                          </p>
                          <p className="text-text-heading mt-1 font-semibold wrap-break-word">
                            {fact.value}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}

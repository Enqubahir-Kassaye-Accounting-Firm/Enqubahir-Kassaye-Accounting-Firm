/**
 * Services Section
 * Display featured services with premium hover effects and stagger animations
 */

import { Container } from '@/components/container';
import { StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { Card } from '@/components/card';
import { SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICE_ICONS, TAG_STYLES } from '@/lib/icons';
import type { Service } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

// Icon mapping from service slugs to React components
type ServiceCardData = Pick<
  Service,
  | 'title'
  | 'description'
  | 'slug'
  | 'tag'
  | 'tagStyle'
  | 'icon'
  | 'isHighlighted'
  | 'forWho'
  | 'ctaText'
>;

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  services: ServiceCardData[];
}

export function ServicesSection({ title, subtitle, services }: ServicesSectionProps) {
  if (services.length === 0) {
    // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
    return null;
  }

  return (
    <section id="services" className="section-y bg-surface-page">
      <Container>
        <SectionHeading
          reveal
          eyebrow={UI_TEXT.eyebrows.services}
          title={title}
          text={subtitle}
          className="mb-12 md:mb-16"
        />

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {services.slice(0, 6).map((service) => {
            const IconComponent = SERVICE_ICONS[service.icon ?? 'zap'];

            return (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} IconComponent={IconComponent} />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
}

function ServiceCard({
  service,
  IconComponent,
}: {
  service: ServiceCardData;
  IconComponent: React.ComponentType<{ className?: string }>;
}) {
  const tagColor = TAG_STYLES[service.tagStyle ?? 'accent'].card;

  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card
        interactive
        highlighted={service.isHighlighted}
        className="flex h-full cursor-pointer flex-col p-8"
      >
        {/* Gradient overlay on hover */}
        <div className="from-brand-accent/[0.03] absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon row + Tag badge */}
        <div className="relative mb-5 flex items-start justify-between gap-2">
          <div
            className={cn(
              'inline-flex flex-shrink-0 rounded-xl p-3.5',
              'bg-brand-primary',
              'transition-all duration-300',
              'group-hover:shadow-brand-accent/10 group-hover:scale-110 group-hover:shadow-lg'
            )}
          >
            <IconComponent className="text-brand-accent-text h-6 w-6" />
          </div>
          {service.tag && (
            <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', tagColor)}>
              {service.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            'relative mb-1 text-xl font-bold',
            'text-text-heading',
            'transition-colors duration-300',
            'group-hover:text-brand-accent-text'
          )}
        >
          {service.title}
        </h3>

        {/* For who */}
        {service.forWho && (
          <p className="text-brand-accent/70 relative mb-3 text-xs font-medium italic">
            {UI_TEXT.services.forPrefix} {service.forWho}
          </p>
        )}

        {/* Description */}
        <p
          className={cn(
            'relative flex-1 text-[15px] leading-relaxed break-words',
            'text-text-body'
          )}
        >
          {service.description}
        </p>

        {/* CTA */}
        <div className="text-brand-accent-text relative mt-6 flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-2.5">
          <span>{service.ctaText || UI_TEXT.services.cardLinkFallback}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>

        {/* Bottom accent */}
        <div className="via-brand-accent absolute right-8 bottom-0 left-8 h-[2px] scale-x-0 bg-gradient-to-r from-transparent to-transparent transition-all duration-500 group-hover:scale-x-100" />
      </Card>
    </Link>
  );
}

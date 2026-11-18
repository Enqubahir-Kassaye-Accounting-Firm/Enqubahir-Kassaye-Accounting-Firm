import { Fragment, type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { ProjectsSection } from '@/components/projects-section';
import { PartnersSection } from '@/components/partners-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ContactSection } from '@/components/contact-section';
import { CTASection } from '@/components/cta-section';
import { SectionDivider } from '@/components/section-divider';
import type { HomeSectionId } from '@/config/site';
import { HOME_PAGE } from '@/data/home';
import { ABOUT_SUMMARY } from '@/data/about';
import { SERVICES } from '@/data/services';
import { FEATURED_PROJECTS } from '@/data/projects';
import { PARTNERS } from '@/data/partners';
import { TESTIMONIALS } from '@/data/testimonials';
import { CONTACT_PAGE } from '@/data/contact';
import { VISIBLE_HOME_SECTIONS } from '@/lib/home-sections';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical({}, '/');

const SECTIONS = new Map<HomeSectionId, () => ReactNode>([
  ['hero', () => <Hero homePage={HOME_PAGE} />],
  ['about', () => <AboutSection about={ABOUT_SUMMARY} />],
  [
    'services',
    () => (
      <ServicesSection
        title={HOME_PAGE.servicesTitle}
        subtitle={HOME_PAGE.servicesSubtitle}
        services={SERVICES}
      />
    ),
  ],
  [
    'projects',
    () => (
      <ProjectsSection
        title={HOME_PAGE.projectsTitle}
        subtitle={HOME_PAGE.projectsSubtitle}
        projects={FEATURED_PROJECTS}
      />
    ),
  ],
  ['partners', () => <PartnersSection title={HOME_PAGE.partnersTitle} partners={PARTNERS} />],
  [
    'testimonials',
    () => (
      <TestimonialsSection
        title={HOME_PAGE.testimonialsTitle}
        subtitle={HOME_PAGE.testimonialsSubtitle}
        testimonials={TESTIMONIALS}
      />
    ),
  ],
  ['contact', () => <ContactSection contactPage={CONTACT_PAGE} />],
  ['cta', () => <CTASection homePage={HOME_PAGE} />],
]);

/** Full-bleed bands that sit flush against their neighbours (no divider line). */
const NO_DIVIDER = new Set<HomeSectionId>(['partners', 'cta']);

export default function Home() {
  return (
    <main className="bg-surface-page">
      {VISIBLE_HOME_SECTIONS.map((id, index) => {
        const previous = VISIBLE_HOME_SECTIONS[index - 1];
        const showDivider = previous && !NO_DIVIDER.has(previous) && !NO_DIVIDER.has(id);
        return (
          <Fragment key={id}>
            {showDivider && <SectionDivider />}
            {SECTIONS.get(id)?.()}
          </Fragment>
        );
      })}
    </main>
  );
}

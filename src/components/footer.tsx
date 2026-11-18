/**
 * Footer Component
 * Site footer with brand, links, contact details and social icons
 */

import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/container';
import { SiteLogo } from '@/components/site-logo';
import { InstagramIcon, SocialLinks } from '@/components/social-links';
import { siteConfig } from '@/config/site';
import { UI_TEXT } from '@/data/ui';
import { SERVICES } from '@/data/services';
import { VISIBLE_HOME_SECTIONS, visibleLinks } from '@/lib/home-sections';

/** Shared by every column so headings, lists and gaps line up */
const headingClass =
  'text-brand-accent-text text-xs font-semibold tracking-wider uppercase md:text-sm';
const listClass = 'text-text-inverse/80 mt-3 space-y-2 text-sm md:mt-4 md:space-y-3';
const linkClass = 'hover:text-on-primary transition-colors';

const footerLinks = {
  company: [
    ...visibleLinks(siteConfig.navigation.desktop).filter((link) => link.href !== '/'),
    // Links the navbar does not carry (e.g. the partners strip)
    ...visibleLinks(siteConfig.footer.extraLinks),
  ],
  // Up to six services, each to its own page; hidden with the services section
  services: VISIBLE_HOME_SECTIONS.includes('services')
    ? SERVICES.slice(0, 6).map((service) => ({
        href: `/services/${service.slug}`,
        label: service.title,
      }))
    : [],
  legal: [
    { href: '/privacy-policy', label: UI_TEXT.legal.privacyPolicy },
    { href: '/terms-of-service', label: UI_TEXT.legal.termsOfService },
  ],
};

const { email, phone, address } = siteConfig.contact;
const { credit } = siteConfig;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} ${siteConfig.footer.copyrightEntity}. ${UI_TEXT.footer.rightsReserved}`;

  return (
    <footer className="bg-brand-primary">
      <Container>
        <div className="py-12 md:py-16">
          {/* Main Footer Content */}
          {/* Desktop: the brand column is twice as wide as each link column, so
              the link columns sit a little closer, a little away from the brand */}
          <div
            className={`grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 ${
              footerLinks.services.length > 0
                ? 'lg:grid-cols-[2fr_1fr_1fr_1fr]'
                : 'lg:grid-cols-[2fr_1fr_1fr]'
            }`}
          >
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="text-on-primary flex items-center gap-2 text-lg font-bold md:text-xl"
              >
                <SiteLogo nameClassName="min-w-0 wrap-break-word" />
              </Link>
              <p className="text-text-inverse/80 mt-3 text-sm leading-relaxed md:mt-4">
                {siteConfig.footer.description}
              </p>
              <SocialLinks
                className="mt-4 md:mt-6"
                linkClassName="hover:text-brand-accent-text text-text-inverse/60"
              />
            </div>

            {/* Company Links */}
            <div>
              <h3 className={headingClass}>{UI_TEXT.footer.linksHeading}</h3>
              <ul className={listClass}>
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Links */}
            {footerLinks.services.length > 0 && (
              <div>
                <h3 className={headingClass}>{UI_TEXT.footer.servicesHeading}</h3>
                <ul className={listClass}>
                  {footerLinks.services.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Info */}
            <div>
              <h3 className={headingClass}>{UI_TEXT.footer.contactHeading}</h3>
              <ul className={listClass}>
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone}`} className={linkClass}>
                      {phone}
                    </a>
                  </li>
                )}
                {address && <li>{address}</li>}
              </ul>
              <div className="mt-4 md:mt-6">
                <Link
                  href="/#contact"
                  className="text-brand-accent-text hover:text-brand-accent-dark inline-flex items-center text-sm font-medium"
                >
                  {UI_TEXT.footer.getInTouch}
                  <ArrowIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-on-primary/10 mt-8 border-t md:mt-12" />

          {/* Bottom Bar: credit | copyright | legal links */}
          <div className="text-text-inverse/60 mt-6 flex flex-col items-center gap-4 text-center text-xs md:mt-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 lg:text-sm">
            <div className="flex items-center justify-center gap-3 empty:hidden md:justify-start md:empty:flex">
              {credit.name && (
                <>
                  <a
                    href={credit.url || undefined}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-on-primary transition-colors"
                  >
                    {UI_TEXT.footer.builtBy} <span className="font-bold">{credit.name}</span>
                  </a>
                  {credit.email && (
                    <a
                      href={`mailto:${credit.email}`}
                      aria-label={UI_TEXT.footer.creditEmailLabel}
                      className="hover:text-on-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                  {credit.instagram && (
                    <a
                      href={credit.instagram}
                      target="_blank"
                      rel="noopener"
                      aria-label={UI_TEXT.footer.creditInstagramLabel}
                      className="hover:text-on-primary transition-colors"
                    >
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                  )}
                </>
              )}
            </div>
            <p>{copyrightText}</p>
            <div className="flex justify-center gap-4 md:justify-end md:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-on-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

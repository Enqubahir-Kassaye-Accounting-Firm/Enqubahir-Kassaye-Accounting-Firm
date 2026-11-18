/**
 * Navbar Component
 * Transparent glass navbar that floats over hero
 */

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/container';
import { SiteLogo } from '@/components/site-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { UI_TEXT } from '@/data/ui';
import { primaryAction as cta } from '@/lib/conversion';

interface NavbarProps {
  /** Desktop and mobile links, already filtered to visible homepage sections */
  links: { href: string; label: string }[];
  /** Shorter list for tablet widths */
  tabletLinks: { href: string; label: string }[];
}

export function Navbar({ links: allNavLinks, tabletLinks: tabletNavLinks }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to its button
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileMenuOpen(false);
      menuButton.current?.focus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        // No backdrop blur: re-blurring the page under a fixed header on every
        // scrolled frame is costly, and the 95% background hides it anyway
        'site-header fixed top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'bg-brand-primary/95 border-on-primary/10 shadow-lg'
          : 'border-transparent bg-transparent'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          {/* Logo - long names truncate to one line; the footer shows the full name */}
          <Link
            href="/"
            title={siteConfig.name}
            className={cn(
              'flex min-w-0 items-center gap-2.5 text-sm font-bold transition-colors lg:text-lg',
              'hover:text-brand-accent-text text-on-primary'
            )}
          >
            <SiteLogo nameClassName="line-clamp-2 leading-tight lg:leading-normal" />
          </Link>

          {/* Desktop Navigation - lg and up */}
          <div className="hidden shrink-0 xl:flex xl:items-center xl:gap-6">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  'hover:text-brand-accent-text text-on-primary/80'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={cn(
                'rounded-button px-4 py-2 text-sm font-medium transition-colors',
                'bg-brand-accent hover:bg-brand-accent-dark text-text-on-accent',
                'dark:bg-brand-accent dark:hover:bg-brand-accent-dark dark:text-text-on-accent'
              )}
            >
              {cta.label}
            </Link>

            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle variant="navbar" />
            </div>
          </div>

          {/* Tablet Navigation - md only (no Contact) */}
          <div className="hidden shrink-0 md:flex md:items-center md:gap-5 xl:hidden">
            {tabletNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  'hover:text-brand-accent-text text-on-primary/80'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={cn(
                'rounded-button px-4 py-2 text-sm font-medium transition-colors',
                'bg-brand-accent hover:bg-brand-accent-dark text-text-on-accent',
                'dark:bg-brand-accent dark:hover:bg-brand-accent-dark dark:text-text-on-accent'
              )}
            >
              {cta.label}
            </Link>

            {/* Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle variant="navbar" />
            </div>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle variant="navbar" />
            <button
              ref={menuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'rounded-lg p-2 transition-colors',
                'text-on-primary hover:bg-on-primary/10'
              )}
              aria-label={UI_TEXT.navbar.toggleMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className={cn(
              'border-t py-4 backdrop-blur-md md:hidden',
              'bg-brand-primary/95 border-on-primary/10'
            )}
          >
            <div className="flex flex-col gap-4">
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors',
                    'hover:text-brand-accent-text text-on-primary/80'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={cta.href}
                {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'rounded-button mt-2 px-4 py-2 text-center text-sm font-medium',
                  'bg-brand-accent hover:bg-brand-accent-dark text-text-on-accent',
                  'dark:bg-brand-accent dark:hover:bg-brand-accent-dark dark:text-text-on-accent'
                )}
              >
                {cta.label}
              </Link>

              {/* Mobile Theme Toggle */}
              {siteConfig.theme === 'both' && (
                <div className="border-on-primary/10 mt-4 flex items-center justify-between border-t pt-4">
                  <span className="text-on-primary/60 text-sm">{UI_TEXT.theme.label}</span>
                  <ThemeToggle variant="navbar" />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

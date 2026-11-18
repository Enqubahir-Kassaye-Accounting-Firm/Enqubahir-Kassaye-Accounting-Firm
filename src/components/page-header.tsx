/**
 * Page Header — the brand-primary header at the top of every inner page
 * (About, Services, service detail, Projects, project detail, legal pages):
 * breadcrumb, eyebrow (or a badge), title, text, then optional extra content.
 * One component, one design; never build a page header inline.
 */

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '@/components/container';
import { UI_TEXT } from '@/data/ui';
import { cn } from '@/lib/utils';

interface Crumb {
  label: string;
  /** Leave out for the current page (always the last crumb) */
  href?: string;
}

interface PageHeaderProps {
  /** Crumbs after "Home" */
  breadcrumbs: Crumb[];
  eyebrow?: string;
  /** Shown above the title instead of the eyebrow, e.g. a service tag */
  badge?: ReactNode;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  /** Extra content under the text (buttons, project details, dates) */
  children?: ReactNode;
}

const CRUMB_LINK =
  'group hover:border-brand-accent/30 hover:bg-brand-accent/20 flex items-center gap-2 rounded-full border border-on-primary/10 bg-on-primary/5 px-3 py-1.5 transition-all duration-300';
const CRUMB_LINK_TEXT =
  'group-hover:text-brand-accent-text text-sm font-medium text-on-primary/90 transition-colors';

export function PageHeader({
  breadcrumbs,
  eyebrow,
  badge,
  title,
  description,
  align = 'center',
  children,
}: PageHeaderProps) {
  const centered = align === 'center';

  return (
    <section className="bg-brand-primary page-header-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-brand-accent absolute top-0 left-0 h-56 w-56 rounded-full opacity-10 blur-3xl" />
        <div className="bg-brand-accent absolute right-0 bottom-0 h-72 w-72 rounded-full opacity-10 blur-3xl" />
      </div>
      <Container className="relative z-10">
        <nav aria-label={UI_TEXT.breadcrumbLabel} className="flex flex-wrap items-center gap-3">
          <Link href="/" className={CRUMB_LINK}>
            <Home className="text-brand-accent-text h-4 w-4 transition-transform group-hover:scale-110" />
            <span className={CRUMB_LINK_TEXT}>{UI_TEXT.breadcrumbHome}</span>
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.label} className="flex min-w-0 items-center gap-3">
              <ChevronRight className="text-brand-accent/50 h-4 w-4 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className={CRUMB_LINK}>
                  <span className={CRUMB_LINK_TEXT}>{crumb.label}</span>
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="border-brand-accent/20 bg-brand-accent/10 text-brand-accent-text max-w-[200px] truncate rounded-full border px-3 py-1.5 text-sm font-semibold sm:max-w-[300px]"
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className={cn('mt-10 max-w-3xl', centered && 'mx-auto text-center')}>
          {badge}
          {!badge && eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2">
              <div className="bg-brand-accent h-px w-8" />
              <span className="text-brand-accent-text text-sm font-semibold tracking-widest uppercase">
                {eyebrow}
              </span>
              {centered && <div className="bg-brand-accent h-px w-8" />}
            </div>
          )}
          <h1 className="text-on-primary text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'text-on-primary/80 mt-5 max-w-2xl text-base leading-relaxed md:text-lg',
                centered && 'mx-auto'
              )}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

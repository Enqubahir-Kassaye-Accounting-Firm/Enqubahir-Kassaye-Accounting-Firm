import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';
import { CTASection } from '@/components/cta-section';
import { PROJECTS, PROJECTS_PAGE, getProjectBySlug } from '@/data/projects';
import { HOME_PAGE } from '@/data/home';
import { siteUrl } from '@/config/env';
import { siteConfig } from '@/config/site';
import { pageUrl } from '@/lib/seo';
import { ArrowLeft, Calendar, MapPin, Tag } from 'lucide-react';
import { UI_TEXT } from '@/data/ui';

export const dynamicParams = false;

// The static export fails on a dynamic route with no pages, so a site without
// projects builds one placeholder that shows the 404 page
export function generateStaticParams() {
  if (PROJECTS.length === 0) return [{ slug: 'none' }];
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function toAbsoluteUrl(url: string) {
  return url.startsWith('http') ? url : `${siteUrl}${url}`;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: UI_TEXT.projects.notFoundTitle,
      description: UI_TEXT.projects.notFoundDescription,
    };
  }

  const projectUrl = pageUrl(`/projects/${slug}`);
  const imageUrl = toAbsoluteUrl(project.image?.url ?? siteConfig.seo.ogImage);
  const description = project.summary;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      url: projectUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.image?.alt || project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const gallery = project.gallery ?? [];

  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[
          { label: PROJECTS_PAGE.meta.title, href: '/projects' },
          { label: project.title },
        ]}
        align="left"
        title={project.title}
      >
        {project.client && (
          <p className="text-on-primary/70 mt-4 text-lg">
            {UI_TEXT.projects.clientLabel}{' '}
            <span className="text-brand-accent-text">{project.client}</span>
          </p>
        )}

        <div className="text-text-inverse/80 mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          {project.location && (
            <span className="flex items-center gap-2 text-sm">
              <MapPin className="text-brand-accent-text h-4 w-4" />
              {project.location}
            </span>
          )}
          {project.completedDate && (
            <span className="flex items-center gap-2">
              <Calendar className="text-brand-accent-text h-4 w-4" />
              <time dateTime={project.completedDate} className="text-sm">
                {new Date(project.completedDate).toLocaleDateString(siteConfig.language, {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
            </span>
          )}
        </div>
      </PageHeader>

      {/* Content */}
      <section className="pt-12 pb-16 md:pt-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {project.image && (
              <figure
                className={cn(
                  'relative mb-10 overflow-hidden rounded-2xl shadow-lg',
                  'aspect-[16/9]',
                  'ring-border-default ring-1'
                )}
              >
                <Image
                  src={project.image.url}
                  alt={project.image.alt || project.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            )}

            {/* Description */}
            <div className="mb-10">
              <p
                className={cn(
                  'text-lg leading-relaxed whitespace-pre-line md:text-xl',
                  'text-text-body'
                )}
              >
                {project.description}
              </p>
            </div>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="mb-10">
                <h2
                  className={cn(
                    'mb-4 flex items-center gap-2 text-lg font-semibold',
                    'text-text-heading'
                  )}
                >
                  <Tag className="text-brand-accent-text h-5 w-5" />
                  {UI_TEXT.projects.highlights}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-brand-accent/20 bg-brand-accent/10 text-brand-accent-text rounded-full border px-4 py-1.5 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* External link */}
            {project.url && (
              <div className="mb-10">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-accent text-text-on-accent rounded-button px-btn-x py-btn-y text-btn inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--brand-accent)_40%,transparent)]"
                >
                  {UI_TEXT.projects.visitProject}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mx-auto mt-4 max-w-5xl">
              <h2 className={cn('mb-6 text-2xl font-bold md:text-3xl', 'text-text-heading')}>
                {UI_TEXT.projects.gallery}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image) => (
                  <figure
                    key={image.url}
                    className="ring-border-default relative aspect-[4/3] overflow-hidden rounded-xl ring-1"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || project.title}
                      fill
                      sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="group text-brand-accent-text hover:text-brand-accent-dark inline-flex items-center gap-2 font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {UI_TEXT.projects.viewAll}
            </Link>
          </div>
        </Container>
      </section>

      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}

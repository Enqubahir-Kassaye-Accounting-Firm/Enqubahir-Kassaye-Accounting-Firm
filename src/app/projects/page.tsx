import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/container';
import { Card } from '@/components/card';
import { PageHeader } from '@/components/page-header';
import { cn } from '@/lib/utils';
import { CTASection } from '@/components/cta-section';
import { PROJECTS as projects, PROJECTS_PAGE } from '@/data/projects';
import { HOME_PAGE } from '@/data/home';
import type { Project } from '@/types/content';
import { UI_TEXT } from '@/data/ui';
import { withCanonical } from '@/lib/seo';

export const metadata: Metadata = withCanonical(PROJECTS_PAGE.meta, '/projects');

export default function ProjectsPage() {
  return (
    <main className="bg-surface-page min-h-screen">
      <PageHeader
        breadcrumbs={[{ label: PROJECTS_PAGE.meta.title }]}
        eyebrow={UI_TEXT.eyebrows.projects}
        title={PROJECTS_PAGE.title}
        description={HOME_PAGE.projectsSubtitle}
      />

      {/* Projects Grid */}
      <section className="section-y-sm">
        <Container>
          {projects.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-text-body text-lg">{UI_TEXT.projects.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <CTASection homePage={HOME_PAGE} />
    </main>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card as="article" interactive className="h-full">
        <div className="bg-brand-primary relative aspect-[16/10] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image.url}
              alt={project.image.alt || project.title}
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-on-primary flex h-full items-center justify-center">
              <span className="text-lg font-semibold">{project.title}</span>
            </div>
          )}
          <div className="from-brand-primary via-brand-primary/50 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="p-6">
          <h2
            className={cn(
              'mb-2 text-xl font-bold',
              'text-text-heading',
              'transition-colors duration-300',
              'group-hover:text-brand-accent-text'
            )}
          >
            {project.title}
          </h2>
          <p
            className={cn(
              'text-[15px] leading-relaxed break-words whitespace-pre-line',
              'text-text-body'
            )}
          >
            {project.summary}
          </p>
          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tech) => (
                <span
                  key={tech}
                  className="border-brand-accent/20 bg-brand-accent/10 text-brand-accent-text rounded-full border px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="from-brand-accent via-brand-accent to-brand-accent absolute right-0 bottom-0 left-0 h-1 scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100" />
      </Card>
    </Link>
  );
}

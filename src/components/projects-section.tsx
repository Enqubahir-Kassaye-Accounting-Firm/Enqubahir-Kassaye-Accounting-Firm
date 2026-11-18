/**
 * Projects Section
 * Display featured projects with premium card interactions
 */

import { Container } from '@/components/container';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal';
import { PremiumButton } from '@/components/premium-button';
import { Card } from '@/components/card';
import { SectionHeading } from '@/components/section-heading';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/content';
import { UI_TEXT } from '@/data/ui';

interface ProjectsSectionProps {
  title: string;
  subtitle: string;
  projects: Project[];
}

export function ProjectsSection({ title, subtitle, projects }: ProjectsSectionProps) {
  if (projects.length === 0) {
    // eslint-disable-next-line unicorn/no-null -- React components should return null for no-render
    return null;
  }

  const displayProjects = projects;

  return (
    <section id="projects" className="section-y bg-surface-page">
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeading
            reveal
            eyebrow={UI_TEXT.eyebrows.projects}
            title={title}
            text={subtitle}
          />

          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex w-full justify-end">
              <PremiumButton href="/projects" variant="primary">
                {UI_TEXT.projects.seeAll}
              </PremiumButton>
            </div>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <StaggerContainer
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.15}
        >
          {displayProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
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
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-on-primary flex h-full items-center justify-center">
              <span className="text-lg font-semibold">{project.title}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="from-brand-primary via-brand-primary/50 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className={cn(
              'mb-2 text-xl font-bold',
              'text-text-heading',
              'transition-colors duration-300',
              'group-hover:text-brand-accent-text'
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'text-[15px] leading-relaxed break-words whitespace-pre-line',
              'text-text-body'
            )}
          >
            {project.summary}
          </p>
          <span className="text-brand-accent-text mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
            {UI_TEXT.projects.viewProject}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>

        {/* Bottom accent line */}
        <div className="from-brand-accent via-brand-accent to-brand-accent absolute right-0 bottom-0 left-0 h-1 scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100" />
      </Card>
    </Link>
  );
}

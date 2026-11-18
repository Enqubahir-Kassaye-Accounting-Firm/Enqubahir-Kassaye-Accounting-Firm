/**
 * Projects
 * Shown on the homepage (featured: true), /projects and /projects/[slug].
 * Put images in public/projects/ and reference them as '/projects/file.jpg'.
 */

import type { Project, ProjectsPage } from '@/types/content';

/** The /projects page; its subtitle reuses HOME_PAGE.projectsSubtitle. */
export const PROJECTS_PAGE: ProjectsPage = {
  meta: {
    title: 'Projects',
    description: 'Your projects page description goes here.',
  },
  title: 'Our Work',
};

const placeholderImage = { url: '/placeholders/project.svg', alt: 'Project image placeholder' };

export const PROJECTS: Project[] = [
  {
    title: 'Project One',
    slug: 'project-one',
    client: 'Client Name',
    location: 'City, Country',
    summary: 'Your project summary goes here.',
    description: 'Your project description goes here.',
    image: placeholderImage,
    gallery: [],
    tags: ['Tag A', 'Tag B', 'Tag C'],
    completedDate: '2026-01-15',
    featured: true,
  },
  {
    title: 'Project Two',
    slug: 'project-two',
    client: 'Client Name',
    location: 'City, Country',
    summary: 'Your project summary goes here.',
    description: 'Your project description goes here.',
    image: placeholderImage,
    gallery: [],
    tags: ['Tag A', 'Tag B', 'Tag C'],
    completedDate: '2025-09-01',
    featured: true,
  },
  {
    title: 'Project Three',
    slug: 'project-three',
    client: 'Client Name',
    location: 'City, Country',
    summary: 'Your project summary goes here.',
    description: 'Your project description goes here.',
    image: placeholderImage,
    gallery: [],
    tags: ['Tag A', 'Tag B', 'Tag C'],
    completedDate: '2025-03-20',
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured).slice(0, 6);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/**
 * Projects
 * This site has no Projects page or section (Blueprint: "No Projects page"),
 * so the list is empty and the section stays hidden.
 */

import type { Project, ProjectsPage } from '@/types/content';

export const PROJECTS_PAGE: ProjectsPage = {
  meta: {
    title: 'Projects',
    description: 'Projects completed by Enqubahir Kassaye Authorized Accounting Firm.',
  },
  title: 'Our Work',
};

export const PROJECTS: Project[] = [];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured).slice(0, 6);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

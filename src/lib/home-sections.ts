/**
 * Homepage Sections
 * Which homepage sections show, in order: siteConfig.homeSections minus any
 * section whose data is empty. Nav and footer links follow the same list.
 */

import { siteConfig, type HomeSectionId } from '@/config/site';
import { SERVICES } from '@/data/services';
import { FEATURED_PROJECTS } from '@/data/projects';
import { PARTNERS } from '@/data/partners';
import { TESTIMONIALS } from '@/data/testimonials';

/** Sections that depend on data; every other section always has content. */
const HAS_CONTENT = new Map<HomeSectionId, boolean>([
  ['services', SERVICES.length > 0],
  ['projects', FEATURED_PROJECTS.length > 0],
  ['partners', PARTNERS.length > 0],
  ['testimonials', TESTIMONIALS.length > 0],
]);

export const VISIBLE_HOME_SECTIONS = siteConfig.homeSections.filter(
  (id) => HAS_CONTENT.get(id) !== false
);

/** Drops links that point at a homepage section that is not shown. */
export function visibleLinks<T extends { section?: HomeSectionId }>(links: T[]): T[] {
  return links.filter((link) => !link.section || VISIBLE_HOME_SECTIONS.includes(link.section));
}

/**
 * Projects API
 * Abstraction layer for project data
 * Can be swapped to fetch from Strapi API in the future
 */

import { projects } from '../data/projects';

/**
 * Get all projects
 * @returns {Array} All project objects
 */
export function getProjects() {
  return projects;
}

/**
 * Get featured projects
 * @param {number} limit - Optional limit for number of featured projects
 * @returns {Array} Featured project objects
 */
export function getFeaturedProjects(limit) {
  const featured = projects.filter(p => p.isFeatured);
  if (typeof limit === 'number') {
    return featured.slice(0, limit);
  }
  return featured;
}

/**
 * Get projects filtered by category
 * @param {string} category - Category to filter by ('All' returns all projects)
 * @returns {Array} Filtered project objects
 */
export function getProjectsByCategory(category) {
  if (!category || category === 'All') return projects;
  return projects.filter(p =>
    Array.isArray(p.categories) && p.categories.includes(category)
  );
}

/**
 * Get a single project by slug
 * @param {string} slug - Project slug identifier
 * @returns {Object|null} Project object or null if not found
 */
export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug) || null;
}

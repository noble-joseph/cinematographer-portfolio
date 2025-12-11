/**
 * Journeys API
 * Abstraction layer for journey/field log data
 * Can be swapped to fetch from Strapi API in the future
 */

import { journeys } from '../data/journeys';

/**
 * Get all journeys sorted by date (newest first)
 * @returns {Array} Journey objects sorted by date descending
 */
export function getJourneys() {
  return [...journeys].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

/**
 * Get the latest journeys
 * @param {number} limit - Number of journeys to return (default: 3)
 * @returns {Array} Latest journey objects
 */
export function getLatestJourneys(limit = 3) {
  return getJourneys().slice(0, limit);
}

/**
 * Get a single journey by slug
 * @param {string} slug - Journey slug identifier
 * @returns {Object|null} Journey object or null if not found
 */
export function getJourneyBySlug(slug) {
  return getJourneys().find(j => j.slug === slug) || null;
}

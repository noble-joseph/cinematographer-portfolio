/**
 * Services API
 * Abstraction layer for service offerings data
 * Can be swapped to fetch from Strapi API in the future
 */

import { services } from '../data/services';

/**
 * Get all services sorted by display order
 * @returns {Array} Service objects sorted by order field
 */
export function getServices() {
  return [...services].sort((a, b) => (a.order || 0) - (b.order || 0));
}

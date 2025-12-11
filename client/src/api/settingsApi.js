/**
 * Settings API
 * Abstraction layer for global site settings
 * Can be swapped to fetch from Strapi API in the future
 */

import { settings } from '../data/settings';

/**
 * Get all site settings
 * @returns {Object} Global settings object
 */
export function getSettings() {
  return settings;
}

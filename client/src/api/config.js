/**
 * Strapi API Configuration
 * Centralized configuration for Strapi backend URL
 */

export const STRAPI_BASE = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

// Optional: API Token for authenticated requests
// Only use in development if public permissions aren't working
export const STRAPI_TOKEN = process.env.REACT_APP_STRAPI_TOKEN || null;

// Helper to create fetch options with authentication
export function getFetchOptions(options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Add authorization header if token exists
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }
  
  return {
    ...options,
    headers
  };
}

import { STRAPI_BASE } from './config';
import { settings as localSettings } from '../data/settings';

export async function getSettings() {
  try {
    const res = await fetch(`${STRAPI_BASE}/api/global-setting?populate=*`);
    
    // If 403 or other error, fall back to local data
    if (!res.ok) {
      console.warn(`Strapi settings fetch failed: ${res.status}. Using local data.`);
      return localSettings;
    }
    
    const json = await res.json();
    const attrs = json.data?.attributes || {};
    
    return {
      heroTitle: attrs.heroTitle || '',
      heroTagline: attrs.heroTagline || '',
      heroSubtitle: attrs.heroSubtitle || '',
      homeAboutShort: attrs.homeAboutShort || '',
      connectHeadline: attrs.connectHeadline || '',
      connectSubtitle: attrs.connectSubtitle || '',
      location: attrs.location || '',
      email: attrs.email || '',
      phone: attrs.phone || '',
      instagramUrl: attrs.instagramUrl || '',
      youtubeUrl: attrs.youtubeUrl || '',
      behanceUrl: attrs.behanceUrl || '',
      vimeoUrl: attrs.vimeoUrl || '',
      availability: attrs.availability || '',
      timezone: attrs.timezone || '',
      siteDescription: attrs.siteDescription || '',
      siteDomain: attrs.siteDomain || ''
    };
  } catch (error) {
    console.warn('Strapi settings error:', error.message, '. Using local data.');
    return localSettings;
  }
}

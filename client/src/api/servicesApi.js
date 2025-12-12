import { STRAPI_BASE } from './config';
import { services as localServices } from '../data/services';

function mapService(item) {
  const attrs = item.attributes || {};
  return {
    id: item.id,
    title: attrs.title || '',
    category: attrs.category || '',
    shortDescription: attrs.shortDescription || '',
    detailedDescription: attrs.detailedDescription || '',
    order: attrs.order || 0
  };
}

export async function getServices() {
  try {
    const res = await fetch(`${STRAPI_BASE}/api/services?populate=*`);
    
    if (!res.ok) {
      console.warn(`Strapi services fetch failed: ${res.status}. Using local data.`);
      return [...localServices].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    
    const json = await res.json();
    return (json.data || []).map(mapService).sort((a,b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Strapi services error:', error.message, '. Using local data.');
    return [...localServices].sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

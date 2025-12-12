import { STRAPI_BASE } from './config';
import { journeys as localJourneys } from '../data/journeys';

function resolveMediaUrl(mediaObj) {
  if (!mediaObj) return null;
  const url = mediaObj.attributes?.url || mediaObj.url || null;
  if (!url) return null;
  if (url.startsWith('/uploads')) {
    return `${STRAPI_BASE}${url}`;
  }
  return url;
}

function mapMediaGallery(mediaArray) {
  if (!Array.isArray(mediaArray)) return [];

  return mediaArray.map(media => {
    const attrs = media.attributes || media;
    const url = resolveMediaUrl(media);

    return {
      id: media.id,
      type: attrs.mime?.startsWith('video/') ? 'video' : 'image',
      url: url,
      caption: attrs.caption || attrs.alternativeText || ''
    };
  }).filter(media => media.url);
}

function mapJourney(item) {
  const attrs = item.attributes || item;

  const thumbnailData = attrs.thumbnail?.data || attrs.thumbnail;
  const thumbnail = thumbnailData ? resolveMediaUrl(thumbnailData) : null;

  // Map gallery media
  const galleryData = attrs.gallery?.data || attrs.gallery || [];
  const gallery = mapMediaGallery(galleryData);

  const relatedProject = attrs.relatedProject?.data
    ? { id: attrs.relatedProject.data.id, ...attrs.relatedProject.data.attributes }
    : (attrs.relatedProject || null); // handle local simple relation string/obj

  return {
    id: item.id,
    title: attrs.title || '',
    slug: attrs.slug || '',
    type: attrs.type || '',
    date: attrs.date || null,
    location: attrs.location || '',
    excerpt: attrs.excerpt || '',
    content: attrs.content || '',
    distanceKm: attrs.distanceKm || null,
    elevationGain: attrs.elevationGain || null,
    vehicle: attrs.vehicle || '',
    terrain: attrs.terrain || '',
    thumbnail,
    gallery,
    relatedProject,
    seo: {
      metaTitle: attrs.seo?.metaTitle || '',
      metaDescription: attrs.seo?.metaDescription || '',
      metaImage: attrs.seo?.metaImage?.data ? resolveMediaUrl(attrs.seo.metaImage.data) : null,
      keywords: attrs.seo?.keywords || ''
    }
  };
}

export async function getJourneys() {
  try {
    const res = await fetch(`${STRAPI_BASE}/api/journeys?populate=*&sort[0]=date:desc`);

    if (!res.ok) {
      console.warn(`Strapi journeys fetch failed: ${res.status}. Using local data.`);
      // Return local journeys sorted by date
      return [...localJourneys].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const json = await res.json();
    return (json.data || []).map(mapJourney);
  } catch (error) {
    console.warn('Strapi journeys error:', error.message, '. Using local data.');
    return [...localJourneys].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

export async function getLatestJourneys(limit = 3) {
  const all = await getJourneys();
  return all.slice(0, limit);
}

export async function getJourneyBySlug(slug) {
  try {
    const res = await fetch(`${STRAPI_BASE}/api/journeys?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
    if (res.ok) {
      const json = await res.json();
      const item = json.data?.[0] || null;
      if (item) return mapJourney(item);
    }
  } catch (error) {
    console.warn('Strapi journey detail error:', error);
  }

  // Fallback to local data
  const localItem = localJourneys.find(j => j.slug === slug);
  return localItem ? { ...localItem, gallery: localItem.gallery || [] } : null;
}
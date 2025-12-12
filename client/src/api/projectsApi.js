import { STRAPI_BASE } from './config';
import { projects as localProjects } from '../data/projects';

function resolveMediaUrl(mediaObj) {
  if (!mediaObj) return null;
  const url = mediaObj.attributes?.url || mediaObj.url || null;
  if (!url) return null;
  // Only prefix Strapi uploads. Local assets (starting with /) or absolute URLs (http) are left alone.
  if (url.startsWith('/uploads')) {
    return `${STRAPI_BASE}${url}`;
  }
  return url;
}

function mapMediaGallery(mediaArray) {
  if (!Array.isArray(mediaArray)) return [];

  return mediaArray.map(media => {
    // Handle both Strapi structure and local raw structure
    const attrs = media.attributes || media;
    const url = resolveMediaUrl(media);

    return {
      id: media.id,
      type: attrs.mime?.startsWith('video/') ? 'video' : 'image',
      url: url,
      caption: attrs.caption || attrs.alternativeText || ''
    };
  }).filter(media => media.url); // Filter out media without URLs
}

function mapProject(item) {
  // Support both Strapi (item.attributes) and Local (item) data structures
  const attrs = item.attributes || item;

  // categories: support component (attrs.categories), legacy field (attrs.values), or direct array
  let rawCategories = attrs.categories || attrs.values || [];

  // Normalize categories
  let categories = [];
  if (Array.isArray(rawCategories)) {
    categories = rawCategories.map(c => {
      if (typeof c === 'string') return c; // Local data might implement simple strings
      return (c?.value ?? c?.name ?? '').trim();
    }).filter(Boolean);
  }

  // Auto-tagging based on Type
  const typeMap = {
    'Motorsport Film': 'Motorsport',
    'Travel Film': 'Travel',
    'Design System': 'Design',
    'Brand Film': 'Cinematography'
  };

  const typeCategory = typeMap[attrs.type];
  if (typeCategory && !categories.includes(typeCategory)) {
    categories.push(typeCategory);
  }

  // tags
  let tags = [];
  if (Array.isArray(attrs.tags)) {
    tags = attrs.tags.map(t => {
      if (typeof t === 'string') return t;
      return t?.value ?? t?.name ?? '';
    }).filter(Boolean);
  } else if (attrs.tags?.data) {
    tags = attrs.tags.data.map(t => t.attributes?.name || '').filter(Boolean);
  }

  const thumbnailData = attrs.thumbnail?.data || attrs.thumbnail;
  const thumbnail = thumbnailData ? resolveMediaUrl(thumbnailData) : null;

  // Map gallery media
  const galleryData = attrs.gallery?.data || attrs.gallery || [];
  const gallery = mapMediaGallery(galleryData);

  return {
    id: item.id,
    title: attrs.title || '',
    slug: attrs.slug || '',
    year: attrs.year || null,
    client: attrs.client || '',
    role: attrs.role || '',
    categories,
    type: attrs.type || '',
    thumbnail,
    gallery,
    videoUrl: attrs.videoUrl || '',
    shortDescription: attrs.shortDescription || '',
    fullDescription: attrs.fullDescription || '',
    isFeatured: !!attrs.isFeatured,
    seo: {
      metaTitle: attrs.seo?.metaTitle || '',
      metaDescription: attrs.seo?.metaDescription || '',
      metaImage: attrs.seo?.metaImage?.data ? resolveMediaUrl(attrs.seo.metaImage.data) : null,
      keywords: attrs.seo?.keywords || ''
    },
    tags
  };
}

export async function getProjects() {
  try {
    const res = await fetch(`${STRAPI_BASE}/api/projects?populate=*&sort[0]=year:desc`);

    if (!res.ok) {
      console.warn(`Strapi projects fetch failed: ${res.status}. Using local data.`);
      return localProjects.map(mapProject); // Apply mapping to local data too!
    }

    const json = await res.json();
    return (json.data || []).map(mapProject);
  } catch (error) {
    console.warn('Strapi projects error:', error.message, '. Using local data.');
    return localProjects.map(mapProject); // Apply mapping to local data too!
  }
}

export async function getFeaturedProjects(limit) {
  const projects = await getProjects();
  const featured = projects.filter(p => p.isFeatured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export async function getProjectsByCategory(category) {
  const projects = await getProjects(); // Always fetch all and filter client-side for reliability
  if (!category || category === 'All') return projects;
  return projects.filter(p => Array.isArray(p.categories) && p.categories.includes(category));
}

export async function getProjectBySlug(slug) {
  const res = await fetch(`${STRAPI_BASE}/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
  if (!res.ok) return null;
  const json = await res.json();
  const item = json.data?.[0] || null;
  return item ? mapProject(item) : null;
}
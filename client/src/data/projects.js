/**
 * Projects Data
 * Portfolio showcase featuring brand films, travel content, motorsport pieces, and design work
 */

export const projects = [
  {
    id: "proj-001",
    title: "Velocity Unveiled",
    slug: "velocity-unveiled",
    year: 2024,
    client: "Apex Motorsports",
    role: "Cinematographer & Director",
    categories: ["Cinematography", "Motorsport"],
    type: "Motorsport Film",
    thumbnail: "/thumbnails/velocity-unveiled.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/velocity-unveiled-1.jpg",
        caption: "Behind the scenes at Apex Motorsports"
      },
      {
        type: "image",
        url: "/gallery/velocity-unveiled-2.jpg",
        caption: "Precision engineering in motion"
      },
      {
        type: "video",
        url: "https://vimeo.com/placeholder-gallery-001",
        caption: "Making of Velocity Unveiled"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-001",
    shortDescription: "A high-octane journey through India's premier racing circuits, capturing the raw emotion and precision of competitive motorsport.",
    fullDescription: "Velocity Unveiled is more than just a racing film; it's a visceral study of speed. Shot over three months at Kari Motor Speedway and Buddh International Circuit, we utilized high-speed phantom cameras and custom racing drone rigs to capture angles previously unseen in Indian motorsport. The sound design plays a crucial role, layering engine roaring with the heartbeat of the drivers.",
    isFeatured: true,
    seo: {
      metaTitle: "Velocity Unveiled - Motorsport Film | Ak Portfolio",
      metaDescription: "A high-octane motorsport film capturing India's premier racing circuits. Directed and filmed by Ak.",
      keywords: "motorsport, racing, cinematography, india, film"
    }
  },
  {
    id: "proj-002",
    title: "Heritage in Motion",
    slug: "heritage-in-motion",
    year: 2024,
    client: "Kerala Tourism Board",
    role: "Cinematographer & Creative Director",
    categories: ["Cinematography", "Travel"],
    type: "Brand Film",
    thumbnail: "/thumbnails/heritage-in-motion.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/heritage-in-motion-1.jpg",
        caption: "Traditional boat races in Kerala backwaters"
      },
      {
        type: "image",
        url: "/gallery/heritage-in-motion-2.jpg",
        caption: "Spice markets of Kochi"
      },
      {
        type: "video",
        url: "https://vimeo.com/placeholder-gallery-002",
        caption: "Time-lapse of sunrise over the Western Ghats"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-002",
    shortDescription: "Exploring Kerala's timeless backwaters and cultural richness through a cinematic lens that bridges tradition with contemporary storytelling.",
    fullDescription: "Commissioned by the Kerala Tourism Board, 'Heritage in Motion' seeks to modernize the visual language of cultural documentation. We moved away from static postcards to dynamic storytelling, following the lives of boat makers, Kathakali artists, and spice traders. The color grade emphasizes the lush greens and warm earth tones of the region.",
    isFeatured: true,
    seo: {
      metaTitle: "Heritage in Motion - Kerala Tourism Campaign | Ak Portfolio",
      metaDescription: "Cinematic travel campaign for Kerala Tourism, exploring backwaters and culture. Cinematography by Ak.",
      keywords: "kerala, tourism, travel film, culture, india"
    }
  },
  {
    id: "proj-003",
    title: "The Mountain Calling",
    slug: "the-mountain-calling",
    year: 2023,
    client: null,
    role: "Cinematographer & Director",
    categories: ["Cinematography", "Travel", "Adventure"],
    type: "Travel Film",
    thumbnail: "/thumbnails/mountain-calling.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/mountain-calling-1.jpg",
        caption: "Trekking through the Himalayan passes"
      },
      {
        type: "image",
        url: "/gallery/mountain-calling-2.jpg",
        caption: "Campfire under the stars"
      },
      {
        type: "video",
        url: "https://vimeo.com/placeholder-gallery-003",
        caption: "Drone footage of mountain peaks"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-003",
    shortDescription: "A visual odyssey through the Himalayas, documenting the intersection of human ambition and nature's grandeur.",
    fullDescription: "Shot entirely on location at altitudes above 4,000 meters, 'The Mountain Calling' was a test of endurance for both crew and equipment. We focused on the texture of the landscape—the jagged rocks, the shifting snow, and the thin air. The narrative follows a solo trekker finding solace in the isolation of the peaks.",
    isFeatured: true,
    seo: {
      metaTitle: "The Mountain Calling - Himalayan Travel Film | Ak Portfolio",
      metaDescription: "A visual odyssey through the Himalayas. Travel and adventure filmmaking by Ak.",
      keywords: "himalayas, travel, adventure, cinematography, mountains"
    }
  },
  {
    id: "proj-004",
    title: "RevLine Brand Identity",
    slug: "revline-brand-identity",
    year: 2024,
    client: "RevLine Automotive",
    role: "Designer & Visual Strategist",
    categories: ["Design", "Motorsport"],
    type: "Design System",
    thumbnail: "/thumbnails/revline-identity.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/revline-1.jpg",
        caption: "Logo design iterations"
      },
      {
        type: "image",
        url: "/gallery/revline-2.jpg",
        caption: "Color palette exploration"
      },
      {
        type: "image",
        url: "/gallery/revline-3.jpg",
        caption: "Typography studies"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-004",
    shortDescription: "Comprehensive visual system for a premium automotive brand, merging precision engineering aesthetics with dynamic storytelling.",
    fullDescription: "For RevLine Automotive, we developed a visual identity that screams performance. The design system is built on a grid derived from aerodynamic wind tunnel data. We created a custom typography set and a motion language that mimics the acceleration curves of electric supercars.",
    isFeatured: false,
    seo: {
      metaTitle: "RevLine - Automotive Brand Identity | Ak Portfolio",
      metaDescription: "Brand identity and design system for RevLine Automotive. Visual strategy by Ak.",
      keywords: "branding, design, automotive, identity, typography"
    }
  },
  {
    id: "proj-005",
    title: "Coastal Echoes",
    slug: "coastal-echoes",
    year: 2023,
    client: "Wanderlust Collective",
    role: "Cinematographer",
    categories: ["Cinematography", "Travel"],
    type: "Travel Film",
    thumbnail: "/thumbnails/coastal-echoes.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/coastal-echoes-1.jpg",
        caption: "Fishing nets at dawn"
      },
      {
        type: "image",
        url: "/gallery/coastal-echoes-2.jpg",
        caption: "Monsoon waves crashing against rocks"
      },
      {
        type: "video",
        url: "https://vimeo.com/placeholder-gallery-005",
        caption: "Underwater footage of marine life"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-005",
    shortDescription: "Capturing the rhythmic beauty of India's western coastline, where monsoon waves meet ancient fishing traditions.",
    fullDescription: "Coastal Echoes is a mood piece exploring the relationship between the sea and the people who live by it. We used slow shutter speeds and underwater housings to capture the fluidity of the water. The film creates a meditative atmosphere, contrasting the chaos of the waves with the stillness of the fishermen.",
    isFeatured: false,
    seo: {
      metaTitle: "Coastal Echoes - Travel Cinematography | Ak Portfolio",
      metaDescription: "Travel film capturing the western coastline of India. Cinematography by Ak.",
      keywords: "coast, travel, ocean, cinematography, nature"
    }
  },
  {
    id: "proj-006",
    title: "Throttle & Soul",
    slug: "throttle-and-soul",
    year: 2024,
    client: "Royal Enfield",
    role: "Cinematographer & Director",
    categories: ["Cinematography", "Motorsport", "Brand"],
    type: "Brand Film",
    thumbnail: "/thumbnails/throttle-soul.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/throttle-soul-1.jpg",
        caption: "Riders on mountain roads"
      },
      {
        type: "image",
        url: "/gallery/throttle-soul-2.jpg",
        caption: "Brotherhood around campfire"
      },
      {
        type: "video",
        url: "https://vimeo.com/placeholder-gallery-006",
        caption: "Slow-motion of engines roaring"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-006",
    shortDescription: "A tribute to motorcycle culture in India, following riders through mountain passes and urban landscapes, celebrating freedom and brotherhood.",
    fullDescription: "Throttle & Soul digs deep into the subculture of long-distance motorcycling. We joined a group of riders on a 2000km journey, living and riding with them. The camera acts as a participant, not an observer, resulting in raw, handheld footage that puts the viewer on the bike.",
    isFeatured: true,
    seo: {
      metaTitle: "Throttle & Soul - Motorcycle Culture Film | Ak Portfolio",
      metaDescription: "Documentary film about motorcycle culture and brotherhood in India. Directed by Ak.",
      keywords: "motorcycle, royal enfield, documentary, travel, culture"
    }
  },
  {
    id: "proj-007",
    title: "Grid Visual Language",
    slug: "grid-visual-language",
    year: 2023,
    client: "Grid Racing Series",
    role: "Designer & Art Director",
    categories: ["Design", "Motorsport"],
    type: "Design System",
    thumbnail: "/thumbnails/grid-visual.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/grid-1.jpg",
        caption: "Typography explorations"
      },
      {
        type: "image",
        url: "/gallery/grid-2.jpg",
        caption: "Motion graphics concepts"
      },
      {
        type: "image",
        url: "/gallery/grid-3.jpg",
        caption: "Branded merchandise designs"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-007",
    shortDescription: "A bold, kinetic design system for India's emerging racing championship, capturing speed through typography and motion graphics.",
    fullDescription: "Grid Racing Series needed a look that would stand out on broadcast TV and social media. We created a high-contrast design system using neon green and deep blacks, inspired by night racing. The motion graphics package includes dynamic lower-thirds and data overlays that update in real-time.",
    isFeatured: false,
    seo: {
      metaTitle: "Grid Racing Series - Visual Language | Ak Portfolio",
      metaDescription: "Visual identity and broadcast design for Grid Racing Series. Art Direction by Ak.",
      keywords: "racing, design, broadcast, motion graphics, sport"
    }
  },
  {
    id: "proj-008",
    title: "Luminous Horizons",
    slug: "luminous-horizons",
    year: 2024,
    client: "Aspire Hospitality",
    role: "Cinematographer & Creative Director",
    categories: ["Cinematography", "Brand"],
    type: "Brand Film",
    thumbnail: "/thumbnails/luminous-horizons.jpg",
    gallery: [
      {
        type: "image",
        url: "/gallery/luminous-1.jpg",
        caption: "Luxury resort architecture"
      },
      {
        type: "image",
        url: "/gallery/luminous-2.jpg",
        caption: "Interior design details"
      },
      {
        type: "video",
        url: "https://vimeo.com/placeholder-gallery-008",
        caption: "Guest experiences at sunset"
      }
    ],
    videoUrl: "https://vimeo.com/placeholder-gallery-008",
    shortDescription: "Crafting aspirational visual narratives for luxury resorts, blending architectural elegance with immersive travel experiences.",
    fullDescription: "In 'Luminous Horizons', we partnered with Aspire Hospitality to redefine visual luxury. Moving beyond standard architectural photography, we focused on the 'felt experience' of the guest – the warmth of the golden hour light hitting the limestone walls, the sound of the ocean breeze through the linen curtains. We utilized cinema-grade lighting and fluid camera movements to create a sense of effortless elegance.",
    isFeatured: false,
    seo: {
      metaTitle: "Luminous Horizons - Luxury Resort Film | Ak Portfolio",
      metaDescription: "Cinematic brand film for Aspire Hospitality, showcasing luxury resort architecture and guest experiences.",
      keywords: "luxury, resort, architecture, brand film, cinematography"
    }
  }
];
/**
 * Journeys Data
 * Field notes, behind-the-scenes moments, and adventure logs from the road
 */

export const journeys = [
  {
    id: "journey-001",
    title: "Midnight Run to Munnar",
    slug: "midnight-run-munnar",
    type: "Motorsport Log",
    date: "2024-11-15",
    location: "Kerala Hill Country, India",
    excerpt: "A spontaneous 180km night ride through winding ghat roads, chasing golden hour in the tea plantations. Sometimes the best shots come from unplanned detours and pure instinct. The monsoon mist added an ethereal quality we couldn't have scripted.",
    distanceKm: 180,
    elevationGain: 1450,
    vehicle: "Royal Enfield Himalayan",
    terrain: "Mountain Roads, Ghats",
    thumbnail: "/journeys/midnight-munnar.jpg",
    gallery: [
      { type: "image", url: "/journeys/midnight-munnar.jpg", caption: "Munnar tea plantations at dawn" },
      { type: "image", url: "/journeys/midnight-rider.jpg", caption: "The trusty Himalayan" }
    ],
    content: "The decision to ride to Munnar was made at 10 PM. By midnight, I was on the road. The Ghats at night are a sensory overload—the smell of wet earth, the drop in temperature, the high beams cutting through the fog. Reaching Top Station just as the sun broke the horizon made every sleepless kilometer worth it.",
    relatedProjectId: "proj-006",
    seo: {
      metaTitle: "Midnight Run to Munnar - Moto Log | Ak Portfolio",
      metaDescription: "A spontaneous motorcycle trip to Munnar to chase the sunrise.",
      keywords: "munnar, motorcycle, travel, photography, kerala"
    }
  },
  {
    id: "journey-002",
    title: "BTS: Racing the Light at Kari Motor Speedway",
    slug: "bts-kari-speedway",
    type: "BTS",
    date: "2024-09-22",
    location: "Coimbatore, Tamil Nadu",
    excerpt: "Behind the scenes of 'Velocity Unveiled' – our crew battled 42°C heat trackside, mounting cameras on race bikes traveling 200+ km/h. The challenge wasn't just capturing speed, but the quiet intensity in the pit lane moments before the flag drops.",
    distanceKm: null,
    elevationGain: null,
    vehicle: null,
    terrain: "Race Track",
    thumbnail: "/journeys/bts-kari.jpg",
    gallery: [
      { type: "image", url: "/journeys/bts-kari.jpg", caption: "Trackside heat" }
    ],
    content: "The heat at Kari Motor Speedway is unforgiving. At 42°C, the tarmac radiates waves that distort long lens shots. We had to innovate with cooling rigs for the RED cameras. The team worked in 15-minute shifts to avoid heat exhaustion. But the shimmer in the air added a layer of intensity to the footage that post-production filters can't replicate.",
    relatedProjectId: "proj-001",
    seo: {
      metaTitle: "BTS: Racing the Light - Production Log | Ak Portfolio",
      metaDescription: "Behind the scenes of filming diverse motorsport events in extreme heat.",
      keywords: "bts, filmmaking, production, motorsport, india"
    }
  },
  {
    id: "journey-003",
    title: "Himalayan Basecamp Recon",
    slug: "himalayan-basecamp-recon",
    type: "Travel Field Note",
    date: "2023-10-08",
    location: "Rohtang Pass, Himachal Pradesh",
    excerpt: "Scouting locations at 4,000m altitude for 'The Mountain Calling'. Thin air, unpredictable weather, and equipment freezing at dawn taught me that great cinematography requires equal parts vision and resilience. The landscape humbled us daily.",
    distanceKm: 320,
    elevationGain: 2800,
    vehicle: "4x4 Support Vehicle",
    terrain: "High Altitude Mountain",
    thumbnail: "/journeys/himalayan-recon.jpg",
    gallery: [
      { type: "image", url: "/journeys/himalayan-recon.jpg", caption: "Basecamp scouting" }
    ],
    content: "Reconnaissance is where the film is truly made. We spent a week just driving up and down the Rohtang Pass, looking for the specific quality of light that hits the north face at dawn. The thin air slows everything down—setup times double, movement is harder. But the silence? The silence is absolute.",
    relatedProjectId: "proj-003",
    seo: {
      metaTitle: "Himalayan Basecamp Recon - Travel Log | Ak Portfolio",
      metaDescription: "Field notes from scouting filming locations in the high Himalayas.",
      keywords: "himalayas, scouting, location hunting, travel, filmmaking"
    }
  },
  {
    id: "journey-004",
    title: "Designing Motion: RevLine Creative Process",
    slug: "designing-motion-revline",
    type: "Design Note",
    date: "2024-07-12",
    location: "Studio, Kochi",
    excerpt: "Creating a visual identity for automotive brands means understanding the physics of motion. We spent weeks studying how light behaves on carbon fiber and chrome, translating racing dynamics into static brand elements that still feel kinetic.",
    distanceKm: null,
    elevationGain: null,
    vehicle: null,
    terrain: "Studio",
    thumbnail: "/journeys/revline-process.jpg",
    gallery: [
      { type: "image", url: "/journeys/revline-process.jpg", caption: "Sketching concepts" }
    ],
    content: "Design is an iterative process. For RevLine, we covered the studio walls with hundreds of sketches. We played with kinetic typography, printing frames of motion and scanning them back in to get a 'drag' effect. It's digital design with an analog soul.",
    relatedProjectId: "proj-004",
    seo: {
      metaTitle: "Designing Motion: RevLine Process - Design Log | Ak Portfolio",
      metaDescription: "A look into the creative process behind the RevLine automotive brand identity.",
      keywords: "design process, branding, creative, studio, automotive"
    }
  },
  {
    id: "journey-005",
    title: "Solo Coastal Expedition",
    slug: "solo-coastal-expedition",
    type: "Travel Field Note",
    date: "2023-06-20",
    location: "Konkan Coast, Maharashtra",
    excerpt: "Five days riding the coastal highway from Goa to Mumbai, documenting fishing communities and monsoon landscapes. Traveling solo with minimal gear taught me to see stories in simplicity – a single fisherman's silhouette can say more than elaborate setups.",
    distanceKm: 485,
    elevationGain: 650,
    vehicle: "Motorcycle",
    terrain: "Coastal Highway",
    thumbnail: "/journeys/coastal-solo.jpg",
    gallery: [
      { type: "image", url: "/journeys/coastal-solo.jpg", caption: "Coastal highway sunset" }
    ],
    content: "There's a specific rhythm to riding the Konkan coast. The road hugs the sea, dipping into fishing villages and rising up to laterite plateaus. Riding solo allows you to stop whenever a frame catches your eye. I met a boat builder in Malvan who has been crafting vessels by hand for 50 years. His story became a central emotional anchor for the 'Coastal Echoes' film.",
    relatedProjectId: "proj-005",
    seo: {
      metaTitle: "Solo Coastal Expedition - Motorcycle Log | Ak Portfolio",
      metaDescription: "Journal from a solo motorcycle trip along India's Konkan coast.",
      keywords: "moto travel, solo travel, konkan, photography, india"
    }
  }
];

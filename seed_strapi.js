// Native fetch is available in Node 18+

// --- CONFIGURATION ---
const API_URL = 'https://ak-portfolio-cms.onrender.com/api';
const API_TOKEN = process.env.STRAPI_API_TOKEN; // User must provide this

if (!API_TOKEN) {
    console.error('Error: STRAPI_API_TOKEN environment variable is missing.');
    console.error('Usage: set STRAPI_API_TOKEN=your_token && node seed_strapi.js');
    process.exit(1);
}

// --- DATA (Inlined for simplicity) ---

const services = [
    {
        title: "Brand Films & Commercial Content",
        category: "Brand Films",
        shortDescription: "Cinematic storytelling that elevates brands through compelling visual narratives. From concept to final cut, crafting films that resonate emotionally and drive engagement.",
        order: 1
    },
    {
        title: "Motorsport & Racing Content",
        category: "Motorsport Content",
        shortDescription: "High-octane cinematography for racing teams, automotive brands, and motorsport events. Capturing speed, precision, and the raw emotion of competitive racing.",
        order: 2
    },
    {
        title: "Travel & Destination Films",
        category: "Travel Films",
        shortDescription: "Immersive travel documentaries and destination content that showcase culture, landscape, and adventure. Bringing remote locations to life through authentic visual storytelling.",
        order: 3
    },
    {
        title: "Design & Visual Systems",
        category: "Design & Visual Systems",
        shortDescription: "Comprehensive brand identity, motion graphics, and visual design for campaigns. Creating cohesive visual languages that translate across digital and physical touchpoints.",
        order: 4
    },
    {
        title: "Adventure & Documentary Projects",
        category: "Adventure Content",
        shortDescription: "Long-form documentary work and adventure-driven storytelling. Collaborative projects that push creative boundaries and explore uncharted narratives.",
        order: 5
    },
    {
        title: "Creative Direction & Consulting",
        category: "Creative Direction",
        shortDescription: "Strategic visual consulting for brands and agencies. From concept development to production oversight, ensuring creative vision aligns with business objectives.",
        order: 6
    }
];

const projects = [
    {
        title: "Velocity Unveiled",
        slug: "velocity-unveiled",
        year: 2024,
        client: "Apex Motorsports",
        role: "Cinematographer & Director",
        type: "Motorsport Film",
        shortDescription: "A high-octane journey through India's premier racing circuits, capturing the raw emotion and precision of competitive motorsport.",
        isFeatured: true
    },
    {
        title: "Heritage in Motion",
        slug: "heritage-in-motion",
        year: 2024,
        client: "Kerala Tourism Board",
        role: "Cinematographer & Creative Director",
        type: "Brand Film",
        shortDescription: "Exploring Kerala's timeless backwaters and cultural richness through a cinematic lens that bridges tradition with contemporary storytelling.",
        isFeatured: true
    },
    {
        title: "The Mountain Calling",
        slug: "the-mountain-calling",
        year: 2023,
        client: null,
        role: "Cinematographer & Director",
        type: "Travel Film",
        shortDescription: "A visual odyssey through the Himalayas, documenting the intersection of human ambition and nature's grandeur.",
        isFeatured: true
    },
    {
        title: "Throttle & Soul",
        slug: "throttle-and-soul",
        year: 2024,
        client: "Royal Enfield",
        role: "Cinematographer & Director",
        type: "Brand Film",
        shortDescription: "A tribute to motorcycle culture in India, following riders through mountain passes and urban landscapes, celebrating freedom and brotherhood.",
        isFeatured: true
    }
];

const journeys = [
    {
        title: "Midnight Run to Munnar",
        slug: "midnight-run-munnar",
        type: "Motorsport Log",
        date: "2024-11-15",
        location: "Kerala Hill Country, India",
        excerpt: "A spontaneous 180km night ride through winding ghat roads, chasing golden hour in the tea plantations.",
        distanceKm: 180,
        elevationGain: 1450,
        vehicle: "Royal Enfield Himalayan",
        terrain: "Mountain Roads, Ghats"
    },
    {
        title: "BTS: Racing the Light at Kari Motor Speedway",
        slug: "bts-kari-speedway",
        type: "BTS",
        date: "2024-09-22",
        location: "Coimbatore, Tamil Nadu",
        excerpt: "Behind the scenes of 'Velocity Unveiled' – our crew battled 42°C heat trackside.",
        distanceKm: null,
        elevationGain: null,
        vehicle: null,
        terrain: "Race Track"
    },
    {
        title: "Himalayan Basecamp Recon",
        slug: "himalayan-basecamp-recon",
        type: "Travel Field Note",
        date: "2023-10-08",
        location: "Rohtang Pass, Himachal Pradesh",
        excerpt: "Scouting locations at 4,000m altitude for 'The Mountain Calling'.",
        distanceKm: 320,
        elevationGain: 2800,
        vehicle: "4x4 Support Vehicle",
        terrain: "High Altitude Mountain"
    }
];

// --- HELPERS ---

async function postEntry(endpoint, data) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create entry: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.log(`[SUCCESS] Created ${endpoint} entry: ${result.data.id || 'OK'}`);
    } catch (error) {
        console.error(`[ERROR] ${endpoint}:`, error.message);
    }
}

// --- MAIN EXECUTION ---

async function seed() {
    console.log('Starting seed process...');
    console.log(`Target: ${API_URL}`);

    // Seed Services
    console.log('\n--- Seeding Services ---');
    for (const item of services) {
        await postEntry('services', item);
    }

    // Seed Projects
    console.log('\n--- Seeding Projects ---');
    for (const item of projects) {
        await postEntry('projects', item);
    }

    // Seed Journeys
    console.log('\n--- Seeding Journeys ---');
    for (const item of journeys) {
        await postEntry('journeys', item);
    }

    console.log('\nSeed process completed!');
}

seed();

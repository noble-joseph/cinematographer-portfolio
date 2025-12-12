/**
 * Strapi API Verification Script
 * Run this to check if all endpoints are working
 */

const STRAPI_BASE = 'http://localhost:1337';

const checkEndpoint = async (endpoint, name) => {
  try {
    const res = await fetch(`${STRAPI_BASE}${endpoint}`);
    const status = res.status;
    const emoji = res.ok ? '✅' : '❌';
    console.log(`${emoji} ${name}: ${status} ${res.ok ? 'OK' : 'FAILED'}`);
    
    if (!res.ok) {
      const text = await res.text();
      console.log(`   Error: ${text.substring(0, 100)}...`);
    }
  } catch (err) {
    console.log(`❌ ${name}: Network Error - ${err.message}`);
  }
};

const verify = async () => {
  console.log('\n🔍 Verifying Strapi API Endpoints...\n');
  
  // Check if Strapi is running
  try {
    await fetch(`${STRAPI_BASE}/_health`);
    console.log('✅ Strapi is running\n');
  } catch (err) {
    console.log('❌ Strapi is NOT running\n');
    console.log('Please start Strapi first: npm run develop\n');
    return;
  }
  
  // Check all endpoints
  await checkEndpoint('/api/projects', 'Projects');
  await checkEndpoint('/api/journeys', 'Journeys');
  await checkEndpoint('/api/services', 'Services');
  await checkEndpoint('/api/global-setting', 'Global Setting');
  
  console.log('\n📋 Next Steps:');
  console.log('If you see ❌ 403 errors above:');
  console.log('1. Go to http://localhost:1337/admin');
  console.log('2. Settings → Roles → Public');
  console.log('3. Enable "find" and "findOne" for all content types');
  console.log('4. Click Save');
  console.log('5. Run this script again\n');
};

verify();

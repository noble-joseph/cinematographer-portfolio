/**
 * Final Strapi Setup Verification
 * Checks all endpoints and shows detailed results
 */

const STRAPI_BASE = 'http://localhost:1337';

const endpoints = [
  { path: '/api/projects', name: 'Projects', type: 'collection' },
  { path: '/api/projects/1', name: 'Single Project', type: 'single' },
  { path: '/api/journeys', name: 'Journeys', type: 'collection' },
  { path: '/api/journeys/1', name: 'Single Journey', type: 'single' },
  { path: '/api/services', name: 'Services', type: 'collection' },
  { path: '/api/services/1', name: 'Single Service', type: 'single' },
  { path: '/api/global-setting', name: 'Global Setting', type: 'single' }
];

const checkEndpoint = async (endpoint) => {
  try {
    const res = await fetch(`${STRAPI_BASE}${endpoint.path}`);
    const status = res.status;
    const ok = res.ok;
    
    let data = null;
    if (ok) {
      data = await res.json();
    }
    
    return {
      ...endpoint,
      status,
      ok,
      hasData: ok && data && ((data.data && data.data.length > 0) || (data.data && Object.keys(data.data).length > 0)),
      data: ok ? data : null
    };
  } catch (err) {
    return {
      ...endpoint,
      status: 'NETWORK_ERROR',
      ok: false,
      error: err.message
    };
  }
};

const verifySetup = async () => {
  console.log('🔍 Final Strapi Setup Verification\n');
  
  // Check if Strapi is running
  try {
    const healthRes = await fetch(`${STRAPI_BASE}/_health`);
    if (healthRes.status === 204) {
      console.log('✅ Strapi Server: RUNNING\n');
    } else {
      console.log('❌ Strapi Server: NOT RESPONDING\n');
      return;
    }
  } catch (err) {
    console.log('❌ Strapi Server: NOT RUNNING\n');
    console.log('Please start Strapi: npm run develop\n');
    return;
  }
  
  // Check all endpoints
  console.log('📊 API Endpoint Status:');
  console.log('=====================\n');
  
  let allPassed = true;
  
  for (const endpoint of endpoints) {
    const result = await checkEndpoint(endpoint);
    
    const statusEmoji = result.ok ? '✅' : '❌';
    const dataEmoji = result.hasData ? '📄' : 'EmptyEntries';
    
    console.log(`${statusEmoji} ${result.name} (${result.path})`);
    console.log(`   Status: ${result.status}`);
    
    if (!result.ok) {
      allPassed = false;
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      } else {
        console.log(`   Issue: ${result.status === 403 ? 'Permissions not enabled' : 'Content not found'}`);
      }
    } else {
      if (result.type === 'collection') {
        const count = result.data?.data?.length || 0;
        console.log(`   Data: ${count} items`);
      } else {
        const hasAttributes = result.data?.data?.attributes && Object.keys(result.data.data.attributes).length > 0;
        console.log(`   Data: ${hasAttributes ? 'Found' : 'Empty'}`);
      }
    }
    console.log('');
  }
  
  console.log('📋 SUMMARY:');
  console.log('===========');
  
  if (allPassed) {
    console.log('🎉 ALL ENDPOINTS WORKING!');
    console.log('✅ Your React app will now load data from Strapi');
    console.log('✅ No more 403 errors');
    console.log('✅ No more fallback to local data');
    console.log('\n🔄 Refresh your React app at http://localhost:3000');
  } else {
    console.log('⚠️  Some endpoints need attention:');
    console.log('   - 403 errors: Check permissions in Strapi Admin');
    console.log('   - 404 errors: Add content to collections/single types');
    console.log('   - Network errors: Check if Strapi is running');
  }
};

verifySetup();

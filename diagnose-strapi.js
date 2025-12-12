/**
 * Strapi Diagnostic Tool
 * Helps identify issues with content types and permissions
 */

const STRAPI_BASE = 'http://localhost:1337';

async function diagnose() {
  console.log('🔍 Strapi Diagnostic Tool\n');
  
  // Check if Strapi is running
  try {
    const health = await fetch(`${STRAPI_BASE}/_health`);
    if (health.status === 204) {
      console.log('✅ Strapi Server: RUNNING');
    } else {
      console.log('❌ Strapi Server: UNHEALTHY');
      return;
    }
  } catch (err) {
    console.log('❌ Strapi Server: NOT RUNNING');
    console.log('   Please start Strapi with: npm run develop');
    return;
  }
  
  // Check content types
  console.log('\n📚 Content Types Check:');
  console.log('====================');
  
  try {
    const ctRes = await fetch(`${STRAPI_BASE}/api/content-type-builder/content-types`);
    if (ctRes.ok) {
      const ctData = await ctRes.json();
      const contentTypes = ctData.data || [];
      
      console.log(`Found ${contentTypes.length} content types:`);
      contentTypes.forEach(ct => {
        const name = ct.info?.name || ct.uid || 'Unknown';
        const kind = ct.kind || 'unknown';
        console.log(`  - ${name} (${kind})`);
      });
    } else {
      console.log('  Unable to fetch content types');
    }
  } catch (err) {
    console.log('  Error checking content types:', err.message);
  }
  
  // Check permissions endpoint
  console.log('\n🔐 Permissions Check:');
  console.log('===================');
  
  try {
    const permRes = await fetch(`${STRAPI_BASE}/api/users-permissions/roles`);
    if (permRes.ok) {
      const permData = await permRes.json();
      const roles = permData.roles || [];
      
      console.log(`Found ${roles.length} roles:`);
      roles.forEach(role => {
        console.log(`  - ${role.name} (${role.type})`);
      });
    } else {
      console.log('  Unable to fetch roles');
    }
  } catch (err) {
    console.log('  Error checking permissions:', err.message);
  }
  
  // Check specific endpoints
  console.log('\n🌐 API Endpoint Status:');
  console.log('=====================');
  
  const endpoints = [
    '/api/projects',
    '/api/journeys', 
    '/api/services',
    '/api/global-setting'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${STRAPI_BASE}${endpoint}`);
      const status = res.status;
      const emoji = status === 200 ? '✅' : (status === 403 ? '🔒' : (status === 404 ? '❌' : '⚠️'));
      
      console.log(`${emoji} ${endpoint}: ${status}`);
      
      if (status !== 200) {
        if (status === 403) {
          console.log('   Issue: Permissions not enabled for Public role');
        } else if (status === 404) {
          console.log('   Issue: Content type may not exist or no content published');
        }
      }
    } catch (err) {
      console.log(`❌ ${endpoint}: Network Error`);
    }
  }
  
  console.log('\n🛠️  Troubleshooting Tips:');
  console.log('========================');
  console.log('1. If you see 🔒 403 errors:');
  console.log('   - Go to Settings → Users & Permissions Plugin → Roles → Public');
  console.log('   - Enable "find" permissions for all content types');
  console.log('   - Click "Save"');
  
  console.log('\n2. If you see ❌ 404 errors:');
  console.log('   - Check if content types exist in Content-Type Builder');
  console.log('   - Create missing content types');
  console.log('   - Add and publish at least one entry');
  
  console.log('\n3. If you see "Whoops!" errors in admin panel:');
  console.log('   - Delete problematic content type in Content-Type Builder');
  console.log('   - Recreate it with correct fields');
  console.log('   - Restart Strapi server');
}

diagnose();

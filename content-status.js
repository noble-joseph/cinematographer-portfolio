/**
 * Content Status Checker
 * Verifies that content has been properly published in Strapi
 */

const STRAPI_BASE = 'http://localhost:1337';

async function checkContentStatus() {
  console.log('🔍 Content Status Checker\n');
  
  const endpoints = [
    { name: 'Projects', path: '/api/projects', type: 'collection' },
    { name: 'Journeys', path: '/api/journeys', type: 'collection' },
    { name: 'Services', path: '/api/services', type: 'collection' },
    { name: 'Global Setting', path: '/api/global-setting', type: 'single' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${STRAPI_BASE}${endpoint.path}?populate=*`);
      const data = await res.json();
      
      console.log(`📄 ${endpoint.name}:`);
      
      if (endpoint.type === 'collection') {
        const count = data.data?.length || 0;
        console.log(`   Entries: ${count}`);
        
        if (count > 0) {
          const publishedCount = data.data.filter(item => item.publishedAt).length;
          console.log(`   Published: ${publishedCount}/${count}`);
          
          if (publishedCount === 0) {
            console.log('   ⚠️  No published entries - API will return empty data');
          } else if (publishedCount < count) {
            console.log('   ⚠️  Some entries not published');
          } else {
            console.log('   ✅ All entries published');
          }
        } else {
          console.log('   ⚠️  No entries created yet');
        }
      } else {
        // Single type
        if (data.data) {
          const isPublished = data.data.publishedAt ? '✅ Published' : '⚠️  Not published';
          console.log(`   Status: ${isPublished}`);
        } else {
          console.log('   Status: ❌ Not created');
        }
      }
      console.log('');
    } catch (err) {
      console.log(`❌ ${endpoint.name}: Error - ${err.message}\n`);
    }
  }
  
  console.log('📋 Publishing Checklist:');
  console.log('======================');
  console.log('For EACH entry you create:');
  console.log('1. Fill in all required fields');
  console.log('2. Click "Save" (creates draft)');
  console.log('3. Click "Publish" (makes it live)');
  console.log('4. Look for green "Published" badge');
  console.log('');
  console.log('After publishing, run this script again to verify.');
}

checkContentStatus();

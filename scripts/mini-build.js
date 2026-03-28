const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_ROOT = path.join(process.cwd(), 'content', '0_activities');
const ACTIVITIES_DIR = path.join(CONTENT_ROOT, 'activities');
const DIST_DIR = path.join(CONTENT_ROOT, 'dist');

console.log("🚀 Testing mini-build...");

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

try {
  const files = fs.readdirSync(ACTIVITIES_DIR).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} activities.`);
  
  if (files.length > 0) {
    const firstFile = path.join(ACTIVITIES_DIR, files[0]);
    const content = fs.readFileSync(firstFile, 'utf8');
    const { data } = matter(content);
    console.log(`Successfully parsed: ${data.title}`);
    
    fs.writeFileSync(path.join(DIST_DIR, 'test_index.json'), JSON.stringify([{ id: data.id, title: data.title }], null, 2));
    console.log("✅ Wrote test_index.json");
  } else {
    console.log("❌ No files found in activities dir.");
  }
} catch (e) {
  console.error("❌ Error during mini-build:");
  console.error(e);
}
筋

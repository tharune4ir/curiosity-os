const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_ROOT = path.join(process.cwd(), 'content', '0_activities');
const DIST_DIR = path.join(CONTENT_ROOT, 'dist');

async function loadActivitiesFromSource() {
  const activitiesDir = path.join(CONTENT_ROOT, 'activities');
  if (!fs.existsSync(activitiesDir)) {
      console.log(`Dir not found: ${activitiesDir}`);
      return [];
  }
  
  const files = fs.readdirSync(activitiesDir).filter(f => f.endsWith('.md'));
  console.log(`Found ${files.length} files in ${activitiesDir}`);
  
  return files.map(file => {
    try {
        const content = fs.readFileSync(path.join(activitiesDir, file), 'utf8');
        const { data, content: body } = matter(content);
        return { ...data, body: body.trim() };
    } catch (e) {
        console.error(`Error parsing ${file}:`, e);
        return null;
    }
  }).filter(Boolean);
}

async function test() {
    console.log(`CWD: ${process.cwd()}`);
    console.log(`CONTENT_ROOT: ${CONTENT_ROOT}`);
    const activities = await loadActivitiesFromSource();
    console.log(`Loaded ${activities.length} activities.`);
    if (activities.length > 0) {
        console.log(`Sample: ${activities[0].title}`);
    }
}

test();

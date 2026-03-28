const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ACTIVITIES_DIR = path.join(process.cwd(), 'content', '0_activities', 'activities');
const FLAGSHIP_IDS = ['cos2_a01', 'cos2_a12', 'cos2_a26', 'cos2_a32'];

if (!fs.existsSync(ACTIVITIES_DIR)) {
  console.error("Activities directory not found!");
  process.exit(1);
}

const files = fs.readdirSync(ACTIVITIES_DIR).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(ACTIVITIES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);

  // Update Status
  if (FLAGSHIP_IDS.includes(data.id)) {
    data.status = 'flagship';
  } else {
    data.status = 'pilot';
  }

  // Ensure Curation Tier
  data.curation_tier = 'flagship_36';

  // Reconstruct file
  const newContent = matter.stringify(body, data);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`✅ Updated ${file}: status=${data.status}, curation_tier=${data.curation_tier}`);
});

console.log("\nDone! All 36 activities updated with honesty logic.");
筋

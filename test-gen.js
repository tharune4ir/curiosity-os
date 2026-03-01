const fs = require('fs');
const path = require('path');

const FRONTMATTER_KEYS = new Set(['id', 'title', 'icon', 'domain', 'linked_nodes']);

function keyToHeading(key) {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function cleanText(text) {
  if (!text) return '';
  let cleaned = text.replace(/[^\x20-\x7E\u00A0-\u024F\u2010-\u2027\u2030-\u205E\u2070-\u209F\u2190-\u21FF]/g, '');
  cleaned = cleaned.replace(/\s*\.?\s*cite(turn\d+search\d+)+\.?/gi, '');
  return cleaned.trim();
}

const dir = path.join(__dirname, 'content', '6_signal');
console.log('Processing:', dir);

if (!fs.existsSync(dir)) {
    console.log('Dir does not exist');
    process.exit(1);
}

const jsonFiles = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
console.log('JSON files found:', jsonFiles);

jsonFiles.forEach(jsonFile => {
    const inputPath = path.join(dir, jsonFile);
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    console.log('Nodes in JSON:', data.length);
    
    data.forEach(node => {
        let md = `---\ntitle: "${node.title}"\nicon: "${node.icon || 'Hexagon'}"\ndomain: "${node.domain}"\n---\n\n`;
        const contentKeys = Object.keys(node).filter(k => !FRONTMATTER_KEYS.has(k));
        contentKeys.forEach(key => {
            md += `## ${keyToHeading(key)}\n${cleanText(node[key])}\n\n`;
        });
        md += `## Linked Possibilities\n`;
        if (node.linked_nodes && node.linked_nodes.length > 0) {
            node.linked_nodes.forEach(link => { md += `- [[${link}]]\n`; });
        }
        const out = path.join(dir, `${node.id}.md`);
        fs.writeFileSync(out, md, 'utf8');
        process.stdout.write('.');
    });
});
console.log('\nDone');

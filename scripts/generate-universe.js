const fs = require('fs');
const path = require('path');

// ─── Configuration ──────────────────────────────────────────────────
// Add new content directories here as they are created.
// Each entry: { dir: 'folder_name_inside_content', label: 'Human Label' }
const CONTENT_SOURCES = [
  { dir: '1_possibilities', label: 'Possibilities' },
  { dir: '2_biosystem',     label: 'Biosystem' },
  { dir: '3_cognition',     label: 'Cognition' },
  { dir: '4_fun',           label: 'Fun' },
  // Add new domains here: { dir: '5_logic', label: 'Logic' },
];

// Fields that go into YAML frontmatter (not rendered as ## sections)
const FRONTMATTER_KEYS = new Set(['id', 'title', 'icon', 'domain', 'linked_nodes']);

// ─── Helpers ────────────────────────────────────────────────────────

/**
 * Convert a snake_case key like "the_simple_truth" into a heading:
 * "The Simple Truth"
 */
function keyToHeading(key) {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Strip citation markers like "citeturn0search12turn3search5" from text.
 * These are research artifacts that shouldn't appear in rendered content.
 */
function cleanText(text) {
  if (!text) return '';
  // Step 1: Remove ALL non-printable / invisible Unicode characters (the JSON has rogue chars between citation tokens)
  // Keep only typical printable ranges: space through tilde, plus common Unicode letters/punctuation
  let cleaned = text.replace(/[^\x20-\x7E\u00A0-\u024F\u2010-\u2027\u2030-\u205E\u2070-\u209F\u2190-\u21FF]/g, '');
  // Step 2: Strip citation markers like "citeturn0search12turn3search5"
  cleaned = cleaned.replace(/\s*\.?\s*cite(turn\d+search\d+)+\.?/gi, '');
  return cleaned.trim();
}

/**
 * Process a single content directory:
 *  1. Find all .json files
 *  2. For each node, extract frontmatter fields and auto-detect content fields
 *  3. Write one .md file per node
 */
function processDirectory(contentDir) {
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    return { parsed: 0, generated: 0 };
  }

  const files = fs.readdirSync(contentDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  let parsed = 0;
  let generated = 0;

  jsonFiles.forEach(jsonFile => {
    const inputFilePath = path.join(contentDir, jsonFile);
    const rawData = fs.readFileSync(inputFilePath, 'utf8');
    const nodes = JSON.parse(rawData);
    parsed++;

    nodes.forEach(node => {
      // ── YAML Frontmatter ──
      let md = `---\ntitle: "${node.title}"\nicon: "${node.icon || 'Hexagon'}"\ndomain: "${node.domain}"\n---\n\n`;

      // ── Auto-detect content fields (any key NOT in FRONTMATTER_KEYS) ──
      const contentKeys = Object.keys(node).filter(k => !FRONTMATTER_KEYS.has(k));

      contentKeys.forEach(key => {
        const heading = keyToHeading(key);
        md += `## ${heading}\n${cleanText(node[key])}\n\n`;
      });

      // ── WikiLinks from linked_nodes ──
      md += `## Linked Possibilities\n`;
      if (node.linked_nodes && node.linked_nodes.length > 0) {
        node.linked_nodes.forEach(link => {
          md += `- [[${link}]]\n`;
        });
      }

      // ── Write file ──
      const outputFilePath = path.join(contentDir, `${node.id}.md`);
      fs.writeFileSync(outputFilePath, md, 'utf8');
      generated++;
    });
  });

  return { parsed, generated };
}

// ─── Execute ────────────────────────────────────────────────────────
let totalParsed = 0;
let totalGenerated = 0;

CONTENT_SOURCES.forEach(source => {
  const dir = path.join(__dirname, '../content', source.dir);
  const result = processDirectory(dir);
  totalParsed += result.parsed;
  totalGenerated += result.generated;
  if (result.generated > 0) {
    console.log(`  ✓ ${source.label}: ${result.generated} nodes generated`);
  }
});

console.log(`\nDone! Parsed ${totalParsed} JSON files → ${totalGenerated} Markdown nodes total.`);

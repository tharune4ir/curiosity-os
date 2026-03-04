const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const OUTPUT_MD = path.join(__dirname, '..', 'Curiosity_OS_Textbook.md');
const OUTPUT_PDF = path.join(__dirname, '..', 'Curiosity_OS_Textbook.pdf');

const UNIVERSES = [
  '2_biosystem',
  '3_cognition',
  '4_fun',
  '5_logic',
  '6_signal',
  '7_wealth',
  '8_digital',
  '9_ai'
];

async function generateTextbook() {
  console.log("Starting Curiosity OS Textbook Generation (Pure Markdown Edition)...");
  
  let markdown = "";
  
  // ==========================================
  // TITLE PAGE
  // ==========================================
  markdown += `# CURIOSITY OS\n`;
  markdown += `## THE MASTER PROTOCOL\n\n`;
  markdown += `*The fully integrated foundational textbook encompassing the 8 core dimensions of reality. Designed for 90 days of rigorous application.*\n\n`;
  markdown += `**// ARCHIVE LOG: THARUN //**\n\n`;
  markdown += `---\n\n`;

  console.log("Scraping all pure Markdown files across universes...");
  
  // Table of Contents string
  let toc = `# Table of Contents\n\n`;
  let contentBody = "";

  for (const uDir of UNIVERSES) {
    const universePath = path.join(CONTENT_DIR, uDir);
    
    if (!fs.existsSync(universePath)) {
      console.warn(`Warning: Universe folder ${uDir} missing.`);
      continue;
    }

    const files = fs.readdirSync(universePath).filter(f => f.endsWith('.md'));
    
    console.log(`- Scanning ${uDir}: Found ${files.length} Markdown files.`);

    const prettyName = uDir.split('_').pop().toUpperCase();
    
    // Add Universe to TOC
    toc += `## [${prettyName} UNIVERSE](#${uDir.replace(/_/g, '-')}-universe)\n`;
    
    // Add Universe Header to Body
    contentBody += `---\n\n`;
    contentBody += `# ${prettyName} UNIVERSE\n\n`;

    // Append each Markdown file content
    for (const file of files) {
      const filePath = path.join(universePath, file);
      let fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Attempt to extract title from frontmatter
      let fileTitle = file.replace('.md', '').replace(/-/g, ' ');
      const titleMatch = fileContent.match(/^title:\s*"?(.*?)"?$/m);
      if (titleMatch) {
         fileTitle = titleMatch[1];
      } else {
         const h1Match = fileContent.match(/^#\s+(.+)$/m);
         if (h1Match) fileTitle = h1Match[1];
      }
      
      let nodeDomain = "";
      const domainMatch = fileContent.match(/^domain:\s*"?(.*?)"?$/m);
      if (domainMatch) {
         nodeDomain = domainMatch[1];
      }
      
      // 1. Strip YAML Frontmatter (--- ... ---)
      fileContent = fileContent.replace(/^---\n[\s\S]*?\n---\n/, '');
      // Some metadata blocks might just be key: value without --- if improperly formatted.
      // Let's strip lines that look like raw stray metadata at the very top if they exist.
      fileContent = fileContent.replace(/^(title:|icon:|domain:|domain_icon:).*\n/gm, '');
      
      // Cleanup stray dashes left over specifically from frontmatter parsing gaps
      fileContent = fileContent.replace(/^\s*---\s*$/m, '');

      // Shift internal headers down one level to nest under the Node Title
      fileContent = fileContent.replace(/^(#+)\s+(.*)$/gm, '#$1 $2');

      const anchor = fileTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      toc += `- [${fileTitle}](#${anchor})\n`;
      
      // Inject H2 Node Title
      contentBody += `## ${fileTitle}\n\n`;
      if (nodeDomain) {
         contentBody += `**Domain:** *${nodeDomain}*\n\n`;
      }
      contentBody += `${fileContent.trim()}\n\n`;
      contentBody += `---\n\n`; // Separator
    }
    
    toc += `\n`;
  }

  // Combine Markdown
  markdown += toc;
  markdown += `---\n\n`;
  markdown += contentBody;

  // Clean up any weird multiple empty lines
  markdown = markdown.replace(/\n{4,}/g, '\n\n\n');

  // Write MD File
  fs.writeFileSync(OUTPUT_MD, markdown);
  console.log(`\nSUCCESS! 🎉`);
  console.log(`Pure Markdown successfully compiled at ${OUTPUT_MD}`);
}

generateTextbook();

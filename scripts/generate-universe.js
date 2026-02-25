const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content/possibility_os');

// Ensure output directory exists (it's the same folder)
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

let generatedCount = 0;
let jsonFilesParsed = 0;

// Scan the directory for all .json files
const files = fs.readdirSync(contentDir);
const jsonFiles = files.filter(file => file.endsWith('.json'));

jsonFiles.forEach(jsonFile => {
  const inputFilePath = path.join(contentDir, jsonFile);
  const rawData = fs.readFileSync(inputFilePath, 'utf8');
  const nodes = JSON.parse(rawData);
  
  jsonFilesParsed++;

  nodes.forEach(node => {
    const { id, title, icon, domain, the_invisible_reality, the_mind_blowing_hook, the_players_life, the_skill_tree, the_rabbit_hole, linked_nodes } = node;

    let markdownContent = `---
title: "${title}"
icon: "${icon || 'Hexagon'}"
domain: "${domain}"
---

## The Invisible Reality
${the_invisible_reality}

## The Mind-Blowing Hook
${the_mind_blowing_hook}

## The Player's Life
${the_players_life}

## The Skill Tree
${the_skill_tree}

## The Rabbit Hole
${the_rabbit_hole}

## Linked Possibilities
`;

    // Append WikiLinks
    if (linked_nodes && linked_nodes.length > 0) {
      linked_nodes.forEach(link => {
        markdownContent += `- [[${link}]]\n`;
      });
    }

    const outputFilePath = path.join(contentDir, `${id}.md`);
    fs.writeFileSync(outputFilePath, markdownContent, 'utf8');
    generatedCount++;
  });
});

console.log(`Successfully parsed ${jsonFilesParsed} JSON batch files and generated ${generatedCount} Markdown nodes in ${contentDir}`);

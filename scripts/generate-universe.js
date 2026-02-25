const fs = require('fs');
const path = require('path');

// Target Directories
const possibilityDir = path.join(__dirname, '../content/possibility_os');
const physicsDir = path.join(__dirname, '../content/physics_os');

// Ensure output directories exist
[possibilityDir, physicsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

let generatedCount = 0;
let jsonFilesParsed = 0;

function processDirectory(contentDir, isPhysics = false) {
  const files = fs.readdirSync(contentDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  jsonFiles.forEach(jsonFile => {
    const inputFilePath = path.join(contentDir, jsonFile);
    const rawData = fs.readFileSync(inputFilePath, 'utf8');
    const nodes = JSON.parse(rawData);
    
    jsonFilesParsed++;

    nodes.forEach(node => {
      let markdownContent = `---
title: "${node.title}"
icon: "${node.icon || 'Hexagon'}"
domain: "${node.domain}"
---

`;

      if (isPhysics) {
        // Physics Schema
        markdownContent += `## The Invisible Reality
${node.the_invisible_reality || ''}

## The Everyday Encounter
${node.the_everyday_encounter || ''}

## The Sub-Landscapes
${node.the_sub_landscapes || ''}

## The God Mode Tech
${node.the_god_mode_tech || ''}

## The Fascinating Truth
${node.the_fascinating_truth || ''}

`;
      } else {
        // Possibility Schema
        markdownContent += `## The Invisible Reality
${node.the_invisible_reality || ''}

## The Mind-Blowing Hook
${node.the_mind_blowing_hook || ''}

## The Player's Life
${node.the_players_life || ''}

## The Skill Tree
${node.the_skill_tree || ''}

## The Rabbit Hole
${node.the_rabbit_hole || ''}

`;
      }

      // Shared WikiLinks Logic
      markdownContent += `## Linked Possibilities\n`;
      if (node.linked_nodes && node.linked_nodes.length > 0) {
        node.linked_nodes.forEach(link => {
          markdownContent += `- [[${link}]]\n`;
        });
      }

      const outputFilePath = path.join(contentDir, `${node.id}.md`);
      fs.writeFileSync(outputFilePath, markdownContent, 'utf8');
      generatedCount++;
    });
  });
}

// Execute Generation
processDirectory(possibilityDir, false);
processDirectory(physicsDir, true);

console.log(`Successfully parsed ${jsonFilesParsed} JSON batch files and generated ${generatedCount} Markdown nodes total.`);

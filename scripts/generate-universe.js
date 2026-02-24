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
    const { id, title, icon, category, the_matrix_truth, the_leverage, skill_stack, economic_reality, proof_of_work, linked_nodes } = node;

    let markdownContent = `---
title: "${title}"
icon: "${icon || 'Hexagon'}"
category: "${category}"
---

## The Matrix Truth
${the_matrix_truth}

## The Leverage
${the_leverage}

## Skill Stack
${skill_stack}

## Economic Reality
${economic_reality}

## Proof of Work
${proof_of_work}

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

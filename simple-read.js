const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'content', '6_signal');
const jsonFiles = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

jsonFiles.forEach(jsonFile => {
    const inputPath = path.join(dir, jsonFile);
    const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
    console.log('File:', jsonFile, 'Nodes:', data.length);
    data.slice(0, 5).forEach(node => {
        console.log(' - Node:', node.id);
    });
});

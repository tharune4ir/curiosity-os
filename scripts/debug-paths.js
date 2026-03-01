const fs = require('fs');
const path = require('path');

const sources = [
  { dir: '1_possibilities' },
  { dir: '2_biosystem' },
  { dir: '3_cognition' },
  { dir: '4_fun' },
  { dir: '5_logic' }
];

sources.forEach(source => {
  const dir = path.join(__dirname, '../content', source.dir);
  console.log(`Checking: ${dir}`);
  console.log(`  Exists: ${fs.existsSync(dir)}`);
  if (fs.existsSync(dir)) {
    console.log(`  Files: ${fs.readdirSync(dir)}`);
  }
});

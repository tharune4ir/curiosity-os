const fs = require('fs');
fs.writeFileSync('node_test.txt', 'Node produced this', 'utf8');
console.log('File written');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'content', '6_signal');
console.log('Path:', dir);
console.log('Exists:', fs.existsSync(dir));
if (fs.existsSync(dir)) {
    console.log('Files:', fs.readdirSync(dir));
}

const matter = require('gray-matter');
const str = '---\ntitle: test\n---\nbody';
const parsed = matter(str);
console.log(parsed.data.title);
console.log(parsed.content);

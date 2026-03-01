const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Replace non-ASCII Greek letters
c = c.replace(/θ/g, '&theta;');
c = c.replace(/φ/g, '&phi;');

// Fix the over-escaped single quotes
// We search for four backslashes followed by a single quote
c = c.replace(/\\\\\\\\'/g, "'");

// Fix the over-escaped double quotes if any
c = c.replace(/\\\\\\\\"/g, '"');

fs.writeFileSync('index.html', c);
console.log('Normalized file contents.');

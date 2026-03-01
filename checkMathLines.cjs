const fs = require('fs');
const path = require('path');

const dir = 'public';
const files = ['lnq_questions.js', 'vlq_questions.js', 'naq_questions.js', 'nptel_questions.js'];

files.forEach(fileName => {
    const file = path.join(dir, fileName);
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');

    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        // Find line numbers for issues
        if (line.includes('[[1,0],[0,1]]') || line.includes('[[0,1],[1,0]]') || line.includes('Theta') || line.includes('phi =') || line.includes('theta =')) {
            console.log(`${file}:${idx + 1}: ${line}`);
        }
    });
});

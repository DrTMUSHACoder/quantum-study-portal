const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Use a regex that captures keys like "1_1_1": or "view":
const keyRegex = /"([a-z0-9_]+)":/gi;
let match;
const counts = {};
const lines = content.split('\n');

while ((match = keyRegex.exec(content)) !== null) {
    const key = match[1];
    if (!counts[key]) counts[key] = [];

    // Find line number
    const pos = match.index;
    const lineNum = content.substring(0, pos).split('\n').length;
    counts[key].push(lineNum);
}

console.log('Duplicate Keys Found:');
let totalDupes = 0;
for (const key in counts) {
    if (counts[key].length > 1) {
        // Filter out common keys like "q", "options", "answer", "explanation", "clue"
        if (['q', 'options', 'answer', 'explanation', 'clue', 'view', 'week', 'setId', 'qIdx', 'score', 'answers', 'activeQIndices', 'expandedWeek'].includes(key)) continue;

        console.log(`Key: "${key}" found on lines: ${counts[key].join(', ')}`);
        totalDupes++;
    }
}

if (totalDupes === 0) console.log('No significantly duplicate keys found.');

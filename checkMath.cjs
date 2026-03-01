const fs = require('fs');
const path = require('path');

const dir = 'public';
const files = ['lnq_questions.js', 'vlq_questions.js', 'naq_questions.js', 'nptel_questions.js'];

let totalIssues = 0;

const suspiciousPatterns = [
    /\|[0-9A-Za-z\+\-]+\>/g,              // matches |0>, |1>, |psi> outside KaTeX
    /\<[0-9A-Za-z\+\-]+\|(?!\w)/g,        // matches <0|, <psi| outside KaTeX
    /(?<!\\\\)(?:alpha|beta|gamma|psi|phi|theta|otimes)(?!\w)/gi, // alpha without backslash
    /1\s*\/\s*sqrt\(?2\)?/g,           // 1/sqrt(2)
    /(?<![A-Za-z])x\^2(?![A-Za-z])/g,  // x^2
    /\[\s*\[[-0-9,\s]+\]\s*,/g         // simple unescaped JSON array matrices like [[1, 0], [0, 1]]
];

files.forEach(fileName => {
    const file = path.join(dir, fileName);
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');

    // Simple block stripping strategy that doesn't rely on complex regex grouping errors
    // Since we just want to remove math environments, we can replace them using a safe regex pattern
    let cleanedContent = content;

    // Remove all standard Katex wrapping
    // \\\( ... \\\)
    // \\\[ ... \\\]
    cleanedContent = cleanedContent.replace(/\\\\\([\s\S]*?\\\\\)/g, ' [MATH] ');
    cleanedContent = cleanedContent.replace(/\\\[[\s\S]*?\\\]/g, ' [MATH] ');
    cleanedContent = cleanedContent.replace(/\$\$[\s\S]*?\$\$/g, ' [MATH] ');

    const strPattern = /(?:"((?:\\\\.|[^"\\\\])*)"|'((?:\\\\.|[^'\\\\])*)'|\`((?:\\\\.|[^\`\\\\])*)\`)/g;

    let match;
    let issues = [];
    while ((match = strPattern.exec(cleanedContent)) !== null) {
        let str = match[1] || match[2] || match[3] || '';

        suspiciousPatterns.forEach(pat => {
            let m;
            while ((m = pat.exec(str)) !== null) {
                if (m[0].toLowerCase() === 'psi' && /[a-z]/i.test(str[m.index - 1])) continue;
                if (m[0].toLowerCase() === 'phi' && /[a-z]/i.test(str[m.index - 1])) continue;
                issues.push(`Found unescaped '${m[0]}' in: ...${str.substring(Math.max(0, m.index - 20), Math.min(str.length, m.index + 20)).replace(/\n/g, ' ')}...`);
            }
        });
    }

    if (issues.length > 0) {
        console.log(`\n--- ${file} (${issues.length} potential issues) ---`);
        [...new Set(issues)].slice(0, 5).forEach(i => console.log(i));
        totalIssues += issues.length;
    }
});

console.log(`\nTotal potential unescaped math expressions found: ${totalIssues}`);

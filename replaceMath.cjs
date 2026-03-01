const fs = require('fs');
const path = require('path');

const dir = 'public';

// Helper to replace content inside files safely 
function replaceInFile(fileName, replacements) {
    const filePath = path.join(dir, fileName);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    let original = content;
    for (const [search, replace] of Object.entries(replacements)) {
        content = content.replace(search, replace);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${fileName}`);
    }
}

// Global regex replacements
function replaceRegexInFile(fileName, regexps) {
    const filePath = path.join(dir, fileName);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    let original = content;
    for (const { regex, replace } of regexps) {
        content = content.replace(regex, replace);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${fileName} (regex)`);
    }
}

// Let's do a smart regex replacement to capture inline matrices, Theta, Alpha, and Phi in those files.

// 1. lnq_questions.js replacements
replaceRegexInFile('lnq_questions.js', [
    // Matrices like "[[1,0],[0,1]]" -> "\\(\\begin{bmatrix}1 & 0 \\\\ 0 & 1\\end{bmatrix}\\)"
    { regex: /"\[\[1,0\],\[0,1\]\]"/g, replace: '"\\\\(\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & 1 \\\\end{bmatrix}\\\\)"' },
    { regex: /"\[\[0,1\],\[1,0\]\]"/g, replace: '"\\\\(\\\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}\\\\)"' },
    { regex: /"\[\[1,0\],\[0,-1\]\]"/g, replace: '"\\\\(\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & -1 \\\\end{bmatrix}\\\\)"' },
    { regex: /"X = \[\[0,1\],\[1,0\]\]/g, replace: '"X = \\\\(\\\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}\\\\) ' },
    { regex: /"H = \(1\/√2\)\[\[1,1\],\[1,-1\]\]"/g, replace: '"H = \\\\(\\\\frac{1}{\\\\sqrt{2}}\\\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & -1 \\\\end{bmatrix}\\\\)"' },
    { regex: /"\(1\/√2\)\[\[1,1\],\[1,-1\]\]"/g, replace: '"\\\\(\\\\frac{1}{\\\\sqrt{2}}\\\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & -1 \\\\end{bmatrix}\\\\)"' }
]);

// 2. vlq_questions.js replacements
replaceRegexInFile('vlq_questions.js', [
    { regex: /\bTheta\b(?!_)/g, replace: '\\\\(\\\\theta\\\\)' },
    { regex: /\bAlpha\b(?!_)/g, replace: '\\\\(\\\\alpha\\\\)' },
    { regex: /<b>Phi<\/b>/g, replace: '\\\\(\\\\phi\\\\)' }
]);

// 3. naq_questions.js replacements
replaceRegexInFile('naq_questions.js', [
    { regex: /\bTheta\s*=\s*0\./g, replace: '\\\\(\\\\theta = 0\\\\).' },
    { regex: /\bTheta\s*=\s*pi\./g, replace: '\\\\(\\\\theta = \\\\pi\\\\).' },
    { regex: /\btheta\s*=\s*\?/g, replace: '\\\\(\\\\theta = ?\\\\)' },
    { regex: /\bphi\s*=\s*\?/g, replace: '\\\\(\\\\phi = ?\\\\)' }
]);

console.log('Math substitutions complete.');

const fs = require('fs');
const path = require('path');

const dir = 'public';

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
    } else {
        console.log(`No changes made to ${fileName}`);
    }
}

// 1. lnq_questions.js replacements
replaceRegexInFile('lnq_questions.js', [
    { regex: /"\[\[1,0\],\[0,i\]\]"/g, replace: '"\\\\(\\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & i \\\\end{bmatrix}\\\\)"' },
    { regex: /"\(1\/2\)\[\[1,1\],\[1,1\]\]"/g, replace: '"\\\\(\\\\frac{1}{2}\\\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & 1 \\\\end{bmatrix}\\\\)"' },
    { regex: /"H = \(1\/√2\)\[\[1,1\],\[1,-1\]\]\.\s*/g, replace: '"H = \\\\(\\\\frac{1}{\\\\sqrt{2}}\\\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & -1 \\\\end{bmatrix}\\\\). "' },
    { regex: /P\(φ\)\s*=\s*\[\[1,0\],\[0,e\^\{iφ\}\]\]/g, replace: '\\\\(P(\\\\phi) = \\\\begin{bmatrix} 1 & 0 \\\\\\\\ 0 & e^{i\\\\phi} \\\\end{bmatrix}\\\\)' },
    { regex: /\(1\/√2\)\[\[1,1\],\[1,-1\]\]/g, replace: '\\\\(\\\\frac{1}{\\\\sqrt{2}}\\\\begin{bmatrix} 1 & 1 \\\\\\\\ 1 & -1 \\\\end{bmatrix}\\\\)' }
]);

// 2. naq_questions.js replacements
replaceRegexInFile('naq_questions.js', [
    { regex: /\bTheta\/2\b/g, replace: '\\\\(\\\\theta/2\\\\)' },
    { regex: /\bTheta\b(?!_)/g, replace: '\\\\(\\\\theta\\\\)' },
    { regex: /\(r, theta, phi\)/g, replace: '\\\\((r, \\\\theta, \\\\phi)\\\\)' },
    { regex: /\bsin\(theta\)cos\(phi\)/g, replace: '\\\\(\\\\sin(\\\\theta)\\\\cos(\\\\phi)\\\\)' },
    { regex: /\bsin\(theta\)sin\(phi\)/g, replace: '\\\\(\\\\sin(\\\\theta)\\\\sin(\\\\phi)\\\\)' },
    { regex: /\bcos\(theta\)/g, replace: '\\\\(\\\\cos(\\\\theta)\\\\)' },
    { regex: /\btheta\b(?!_)(?![a-zA-Z])/gi, replace: '\\\\(\\\\theta\\\\)' },
    { regex: /\bphi\b(?!_)(?![a-zA-Z])/gi, replace: '\\\\(\\\\phi\\\\)' }
]);

console.log('Math substitutions complete.');

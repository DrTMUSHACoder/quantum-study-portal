const fs = require('fs');
const path = require('path');

const filePath = path.join('public', 'naq_questions.js');
let content = fs.readFileSync(filePath, 'utf8');

// The exact strings
content = content.replace(/Matrix \[\[0, 1\], \[1, 0\]\]/g, 'Matrix \\\\(\\\\begin{bmatrix} 0 & 1 \\\\\\\\ 1 & 0 \\\\end{bmatrix}\\\\)');
content = content.replace(/\|⟨\+\|1⟩\|² = \|1\/sqrt\(2\)\|²/g, '\\\\(|\\\\langle +|1 \\\\rangle|^2 = |\\\\frac{1}{\\\\sqrt{2}}|^2\\\\)');
content = content.replace(/<b>Singlet<\/b>: Psi minus/g, '<b>Singlet</b>: \\\\(|\\\\psi^-\\\\rangle\\\\)');
content = content.replace(/<psi\|H\|psi>/g, '\\\\(\\\\langle \\\\psi | H | \\\\psi \\\\rangle\\\\)');

fs.writeFileSync(filePath, content);
console.log('Fixed naq_questions.js final math blocks.');


const nptelData = {
    // === WEEK 1: Assignment 1 ===
    "1_31_1": {
        q: "Calculate the Bloch sphere angles $\\theta$ and $\\varphi$ for the state $|\\psi\\rangle = \\frac{1+i}{\\sqrt{2}}|0\\rangle + \\frac{1-i}{\\sqrt{2}}|1\\rangle$.",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\theta = \\pi/2,\ \\varphi = \\pi/2$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Equator, azimuth 90°</div>`,
            `<div style="text-align:center;padding:4px 0">$\\theta = \\pi/2,\ \\varphi = 3\\pi/2$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Equator, azimuth 270°</div>`,
            `<div style="text-align:center;padding:4px 0">$\\theta = \\pi,\ \\varphi = 0$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">South pole (|1⟩)</div>`,
            `<div style="text-align:center;padding:4px 0">$\\theta = 0,\ \\varphi = \\pi$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">North pole (|0⟩)</div>`
        ],
        answer: 1,
        explanation: "First, normalize the state by a factor of 1/√2. Factoring out the global phase e^{iπ/4} gives |ψ⟩ = 1/√2 [1, e^{-iπ/2}]ᵀ. Comparing with the Bloch form, cos(θ/2) = 1/√2 implies θ = π/2. The relative phase e^{iφ} = e^{-iπ/2} = e^{i3π/2} implies φ = 3π/2.",
        clue: "<b>Bloch Angles</b>: To find θ and φ, normalize the state vector so that the first component is real. The general form is $\\cos(\\theta/2)|0\\rangle + e^{i\\varphi}\\sin(\\theta/2)|1\\rangle$."
    },
    "1_31_2": {
        q: "A state $|\\phi\\rangle = \\frac{1+i}{4}|0\\rangle + \\frac{3-i}{4}|1\\rangle$ is measured in the Hadamard basis $\\{|+\\rangle, |-\\rangle\\}$. What is the probability of obtaining $|+\\rangle$?",
        options: [
            `<div style="text-align:center;padding:4px 0">$P(+) = \\dfrac{1}{3}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">33.3 %</div>`,
            `<div style="text-align:center;padding:4px 0">$P(+) = \\dfrac{1}{2}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">50 % — equal superposition</div>`,
            `<div style="text-align:center;padding:4px 0">$P(+) = \\dfrac{2}{3}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">66.7 %</div>`,
            `<div style="text-align:center;padding:4px 0">$P(+) = \\dfrac{1}{4}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">25 %</div>`
        ],
        answer: 2,
        explanation: "The normalization factor for the state is √(6/8) = √3/2. The normalized state is |φ⟩ = 1/√3 [(1+i)/2 |0⟩ + (3-i)/2 |1⟩]. The probability amplitude ⟨+|φ⟩ = 1/√6 [(1+i+3-i)/2] = 2/√6. Probability P(+) = |2/√6|² = 4/6 = 2/3.",
        clue: "<b>Hadamard Measurement</b>: The probability of obtaining $|+\\rangle$ is $|\\langle+|\\phi\\rangle|^2$, where $\\langle+| = (\\langle0| + \\langle1|)/\\sqrt{2}$. Use the normalized version of the state."
    },
    "1_31_3": {
        q: "Which of the following gate sequences adds a relative phase of $\\pi$ between $|0\\rangle$ and $|1\\rangle$?",
        options: [
            `<div style="text-align:center;padding:4px 0">
             <svg width="190" height="55" viewBox="0 0 190 55" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">
               <line x1="5" y1="28" x2="185" y2="28" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="22" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="39" y="32" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="currentColor">H</text>
               <rect x="78" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="95" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
               <rect x="134" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="151" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">S</text>
             </svg>
             <div style="font-size:0.82em;opacity:0.72;margin-top:2px">$H \\cdot X \\cdot S$</div></div>`,
            `<div style="text-align:center;padding:4px 0">
             <svg width="285" height="55" viewBox="0 0 285 55" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">
               <line x1="5" y1="28" x2="280" y2="28" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="10" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="27" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">Z</text>
               <rect x="64" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="81" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">S</text>
               <rect x="118" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="135" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">S</text>
               <rect x="172" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="189" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">S</text>
               <rect x="226" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="243" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">S</text>
             </svg>
             <div style="font-size:0.82em;opacity:0.72;margin-top:2px">$Z \\cdot S \\cdot S \\cdot S \\cdot S$ — uses $S^2 = Z$</div></div>`,
            `<div style="text-align:center;padding:4px 0">
             <svg width="245" height="55" viewBox="0 0 245 55" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">
               <line x1="5" y1="28" x2="240" y2="28" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="12" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="29" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
               <rect x="66" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="83" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">Y</text>
               <rect x="120" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="137" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">Z</text>
               <rect x="174" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="191" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">Z</text>
             </svg>
             <div style="font-size:0.82em;opacity:0.72;margin-top:2px">$X \\cdot Y \\cdot Z \\cdot Z$ — uses $Z^2 = I$</div></div>`,
            `<div style="text-align:center;padding:4px 0">
             <svg width="190" height="55" viewBox="0 0 190 55" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto">
               <line x1="5" y1="28" x2="185" y2="28" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="22" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="39" y="32" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="currentColor">H</text>
               <rect x="78" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="95" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
               <rect x="134" y="13" width="34" height="30" rx="3" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="151" y="32" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">Y</text>
             </svg>
             <div style="font-size:0.82em;opacity:0.72;margin-top:2px">$H \\cdot X \\cdot Y$</div></div>`
        ],
        answer: [1, 2],
        explanation: "ZSSSS: S²=Z so S⁴=I, giving Z·I = Z ✓. The Z gate adds phase π to |1⟩ while leaving |0⟩ unchanged. XYZZ = XY·Z² = iZ·I = iZ (same phase effect, different global phase). Both sequences implement a Pauli-Z operation up to a global phase.",
        clue: "<b>Pauli Algebra</b>: Use $S^2 = Z$ and $Z^2 = I$. The Z gate is $\\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$, adding relative phase $\\pi$ to $|1\\rangle$."
    },

    "1_31_4": {
        q: "For the phase gate $P = |0\\rangle\\langle0| + e^{i\\varphi}|1\\rangle\\langle1|$ acting on $|+\\rangle$, find φ such that the probability of obtaining $|+\\rangle$ after the gate is 1/2.",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\varphi = \\dfrac{\\pi}{4}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">T gate phase — 45°</div>`,
            `<div style="text-align:center;padding:4px 0">$\\varphi = \\dfrac{\\pi}{2}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">S gate phase — 90° → $\\cos^2(\\pi/4) = \\tfrac{1}{2}$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\varphi = \\pi$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Z gate phase — 180°</div>`,
            `<div style="text-align:center;padding:4px 0">$\\varphi = 2\\pi$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Full rotation — identity</div>`
        ],
        answer: 1,
        explanation: "Applying P to |+⟩ gives |ψ⟩ = 1/√2 (|0⟩ + e^{iφ}|1⟩). Probability P(+) = |⟨+|ψ⟩|² = |(1+e^{iφ})/2|² = cos²(φ/2). We need cos²(φ/2) = 1/2, which gives φ = π/2.",
        clue: "<b>Phase Probability</b>: The probability $P(+)$ after a phase shift φ on $|+\\rangle$ is given by $\\cos^2(\\varphi/2)$. Solving for $P(+) = 0.5$ gives the required angle."
    },
    "1_31_5": {
        q: "Which of the circuits below implements the following operation? $$O = \\begin{pmatrix} 0 & 1 & 0 & 0 \\\\ 1 & 0 & 0 & 0 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}$$",
        options: [
            /* Option A: CNOT q0 ctrl → q1 target */
            `<div style="display:inline-block; padding:6px 0;">
              <svg width="200" height="70" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" style="display:block; overflow:visible;">
                <style>.ql{stroke:currentColor;fill:none;stroke-width:1.5} .qt{fill:currentColor;}</style>
                <!-- |0⟩ labels -->
                <text x="4" y="22" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <text x="4" y="52" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <!-- Wire 1 (top) -->
                <line x1="34" y1="17" x2="185" y2="17" class="ql"/>
                <!-- Wire 2 (bottom) -->
                <line x1="34" y1="47" x2="185" y2="47" class="ql"/>
                <!-- Control dot on top wire at x=110 -->
                <circle cx="110" cy="17" r="5" class="qt"/>
                <!-- Vertical line from top to bottom -->
                <line x1="110" y1="17" x2="110" y2="47" class="ql"/>
                <!-- ⊕ target on bottom wire at x=110 -->
                <circle cx="110" cy="47" r="10" class="ql"/>
                <line x1="100" y1="47" x2="120" y2="47" class="ql"/>
                <line x1="110" y1="37" x2="110" y2="57" class="ql"/>
              </svg>
            </div>`,
            /* Option B (CORRECT): X on q1, then CNOT (q1 ctrl → q0 target), then X on q1 */
            `<div style="display:inline-block; padding:6px 0;">
              <svg width="240" height="70" viewBox="0 0 240 70" xmlns="http://www.w3.org/2000/svg" style="display:block; overflow:visible;">
                <style>.ql{stroke:currentColor;fill:none;stroke-width:1.5} .qt{fill:currentColor;}</style>
                <text x="4" y="22" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <text x="4" y="52" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <!-- Wire 1 (top) -->
                <line x1="34" y1="17" x2="220" y2="17" class="ql"/>
                <!-- Wire 2 (bottom) -->
                <line x1="34" y1="47" x2="58" y2="47" class="ql"/>
                <line x1="98" y1="47" x2="138" y2="47" class="ql"/>
                <line x1="178" y1="47" x2="220" y2="47" class="ql"/>
                <!-- ⊕ target on top wire at x=120 -->
                <circle cx="120" cy="17" r="10" class="ql"/>
                <line x1="110" y1="17" x2="130" y2="17" class="ql"/>
                <line x1="120" y1="7" x2="120" y2="27" class="ql"/>
                <!-- Control dot on bottom wire at x=120 -->
                <circle cx="120" cy="47" r="5" class="qt"/>
                <!-- Vertical line -->
                <line x1="120" y1="17" x2="120" y2="47" class="ql"/>
                <!-- X gate (box) on bottom wire, before ctrl: x=58-98 -->
                <rect x="58" y="36" width="40" height="22" rx="3" class="ql"/>
                <text x="78" y="52" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
                <!-- X gate (box) on bottom wire, after ctrl: x=138-178 -->
                <rect x="138" y="36" width="40" height="22" rx="3" class="ql"/>
                <text x="158" y="52" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
              </svg>
            </div>`,
            /* Option C: CNOT q1 ctrl → q0 target (no X gates) */
            `<div style="display:inline-block; padding:6px 0;">
              <svg width="200" height="70" viewBox="0 0 200 70" xmlns="http://www.w3.org/2000/svg" style="display:block; overflow:visible;">
                <style>.ql{stroke:currentColor;fill:none;stroke-width:1.5} .qt{fill:currentColor;}</style>
                <text x="4" y="22" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <text x="4" y="52" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <!-- Wire 1 (top) -->
                <line x1="34" y1="17" x2="185" y2="17" class="ql"/>
                <!-- Wire 2 (bottom) -->
                <line x1="34" y1="47" x2="185" y2="47" class="ql"/>
                <!-- ⊕ target on TOP wire at x=110 -->
                <circle cx="110" cy="17" r="10" class="ql"/>
                <line x1="100" y1="17" x2="120" y2="17" class="ql"/>
                <line x1="110" y1="7" x2="110" y2="27" class="ql"/>
                <!-- Control dot on BOTTOM wire at x=110 -->
                <circle cx="110" cy="47" r="5" class="qt"/>
                <!-- Vertical line from bottom ctrl to top target -->
                <line x1="110" y1="27" x2="110" y2="47" class="ql"/>
              </svg>
            </div>`,
            /* Option D: X on q0, then CNOT (q0 ctrl → q1 target), then X on q0 */
            `<div style="display:inline-block; padding:6px 0;">
              <svg width="240" height="70" viewBox="0 0 240 70" xmlns="http://www.w3.org/2000/svg" style="display:block; overflow:visible;">
                <style>.ql{stroke:currentColor;fill:none;stroke-width:1.5} .qt{fill:currentColor;}</style>
                <text x="4" y="22" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <text x="4" y="52" font-family="serif" font-size="14" fill="currentColor">|0⟩</text>
                <!-- Wire 1 (top) segments -->
                <line x1="34" y1="17" x2="58" y2="17" class="ql"/>
                <line x1="98" y1="17" x2="138" y2="17" class="ql"/>
                <line x1="178" y1="17" x2="220" y2="17" class="ql"/>
                <!-- Wire 2 (bottom) -->
                <line x1="34" y1="47" x2="220" y2="47" class="ql"/>
                <!-- X gate on top wire before ctrl -->
                <rect x="58" y="6" width="40" height="22" rx="3" class="ql"/>
                <text x="78" y="22" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
                <!-- Control dot on top wire at x=120 -->
                <circle cx="120" cy="17" r="5" class="qt"/>
                <!-- Vertical line to bottom -->
                <line x1="120" y1="17" x2="120" y2="47" class="ql"/>
                <!-- ⊕ target on bottom wire at x=120 -->
                <circle cx="120" cy="47" r="10" class="ql"/>
                <line x1="110" y1="47" x2="130" y2="47" class="ql"/>
                <line x1="120" y1="37" x2="120" y2="57" class="ql"/>
                <!-- X gate on top wire after ctrl -->
                <rect x="138" y="6" width="40" height="22" rx="3" class="ql"/>
                <text x="158" y="22" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
              </svg>
            </div>`
        ],
        answer: 3,
        explanation: "The matrix swaps $|00\\rangle$ with $|01\\rangle$ in the basis ordering $|q_0 q_1\\rangle$. This means $q_1$ flips only when $q_0=0$. Option D applies X on $q_0$ first, then CNOT ($q_0$ as control, $q_1$ as target), then restores $q_0$ — effectively implementing a 0-controlled NOT on $q_1$.",
        clue: "<b>Control Logic</b>: The matrix swaps states where $q_0=0$. A standard CNOT flips when the control is 1. To flip when control is 0, we 'sandwich' the control ($q_0$) with X gates."
    },
    "1_31_6": {
        q: "Which of the following matrices represents a valid single-qubit quantum gate? (Select all that apply)",
        options: [
            /* Option A: T gate — valid unitary */
            `<div style="text-align:center;padding:6px 0">$$\\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}$$</div>
             <div style="font-size:0.82em;margin-top:2px;opacity:0.72;text-align:center">Diagonal matrix — entries have modulus 1</div>`,
            /* Option B: Hadamard-Y variant — valid unitary */
            `<div style="text-align:center;padding:6px 0">$$\\begin{pmatrix} \\dfrac{1}{\\sqrt{2}} & -\\dfrac{i}{\\sqrt{2}} \\\\[6pt] \\dfrac{1}{\\sqrt{2}} & \\dfrac{i}{\\sqrt{2}} \\end{pmatrix}$$</div>
             <div style="font-size:0.82em;margin-top:2px;opacity:0.72;text-align:center">Columns are orthonormal</div>`,
            /* Option C: NOT a valid unitary (columns not orthogonal) */
            `<div style="text-align:center;padding:6px 0">$$\\begin{pmatrix} \\dfrac{1}{\\sqrt{2}} & 0 \\\\[6pt] \\dfrac{1}{\\sqrt{2}} & e^{i\\pi/4} \\end{pmatrix}$$</div>
             <div style="font-size:0.82em;margin-top:2px;opacity:0.72;text-align:center">Mixed form (conjugate transpose ≠ inverse)</div>`,
            /* Option D: phase diagonal gate — valid unitary */
            `<div style="text-align:center;padding:6px 0">$$\\begin{pmatrix} e^{-i\\pi/3} & 0 \\\\ 0 & e^{i\\pi/3} \\end{pmatrix}$$</div>
             <div style="font-size:0.82em;margin-top:2px;opacity:0.72;text-align:center">Conjugate transpose is its inverse — diagonal phase gate</div>`
        ],
        answer: [0, 1, 3],
        explanation: "A valid quantum gate must be Unitary (U†U = I). Matrix A (T gate) — diagonal entries have |e^{iπ/4}|=1 ✓. Matrix B — orthonormal columns ✓. Matrix C — columns (1/√2, 1/√2) and (0, e^{iπ/4}) are NOT orthogonal ✗. Matrix D — diagonal phase gate, clearly unitary ✓.",
        clue: "<b>Unitarity Test</b>: Check if $U^\\dagger U = I$. For diagonal matrices, each entry must have modulus 1. For off-diagonal matrices, check that columns form an orthonormal set."
    },
    "1_31_7": {
        q: "Which circuit transforms $|00\\rangle$ into the Bell state $|\\Phi^-\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle - |11\\rangle)$?",
        options: [
            /* Option A (CORRECT): X on q1, H on q1, CNOT(q1 ctrl → q2 target) */
            `<div style="display:inline-block;padding:2px 0">
             <svg width="220" height="65" viewBox="0 0 220 65" xmlns="http://www.w3.org/2000/svg" style="display:block">
               <line x1="5" y1="18" x2="215" y2="18" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="5" y1="48" x2="215" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="28" y="7" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="44" y="22" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
               <rect x="78" y="7" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="94" y="22" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="currentColor">H</text>
               <circle cx="158" cy="18" r="5" fill="currentColor"/>
               <line x1="158" y1="23" x2="158" y2="38" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <circle cx="158" cy="48" r="10" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="148" y1="48" x2="168" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="158" y1="38" x2="158" y2="58" stroke="currentColor" fill="none" stroke-width="1.5"/>
             </svg></div>`,
            /* Option B: H on q1, X on q1, CNOT(q1 ctrl → q2 target) */
            `<div style="display:inline-block;padding:2px 0">
             <svg width="220" height="65" viewBox="0 0 220 65" xmlns="http://www.w3.org/2000/svg" style="display:block">
               <line x1="5" y1="18" x2="215" y2="18" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="5" y1="48" x2="215" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="28" y="7" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="44" y="22" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="currentColor">H</text>
               <rect x="78" y="7" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="94" y="22" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
               <circle cx="158" cy="18" r="5" fill="currentColor"/>
               <line x1="158" y1="23" x2="158" y2="38" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <circle cx="158" cy="48" r="10" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="148" y1="48" x2="168" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="158" y1="38" x2="158" y2="58" stroke="currentColor" fill="none" stroke-width="1.5"/>
             </svg></div>`,
            /* Option C: H on q2, CNOT(q2 ctrl → q1 target) */
            `<div style="display:inline-block;padding:2px 0">
             <svg width="180" height="65" viewBox="0 0 180 65" xmlns="http://www.w3.org/2000/svg" style="display:block">
               <line x1="5" y1="18" x2="175" y2="18" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="5" y1="48" x2="175" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="28" y="37" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="44" y="52" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="currentColor">H</text>
               <circle cx="120" cy="48" r="5" fill="currentColor"/>
               <line x1="120" y1="28" x2="120" y2="43" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <circle cx="120" cy="18" r="10" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="110" y1="18" x2="130" y2="18" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="120" y1="8" x2="120" y2="28" stroke="currentColor" fill="none" stroke-width="1.5"/>
             </svg></div>`,
            /* Option D: X on q2, H on q1, CNOT(q1 ctrl → q2 target) */
            `<div style="display:inline-block;padding:2px 0">
             <svg width="200" height="65" viewBox="0 0 200 65" xmlns="http://www.w3.org/2000/svg" style="display:block">
               <line x1="5" y1="18" x2="195" y2="18" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="5" y1="48" x2="195" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <rect x="28" y="7" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="44" y="22" text-anchor="middle" font-family="serif" font-size="15" font-weight="bold" fill="currentColor">H</text>
               <rect x="28" y="37" width="32" height="22" rx="2" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <text x="44" y="52" text-anchor="middle" font-family="serif" font-style="italic" font-size="15" fill="currentColor">X</text>
               <circle cx="140" cy="18" r="5" fill="currentColor"/>
               <line x1="140" y1="23" x2="140" y2="38" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <circle cx="140" cy="48" r="10" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="130" y1="48" x2="150" y2="48" stroke="currentColor" fill="none" stroke-width="1.5"/>
               <line x1="140" y1="38" x2="140" y2="58" stroke="currentColor" fill="none" stroke-width="1.5"/>
             </svg></div>`
        ],
        answer: 0,
        explanation: "|00⟩ --X₁--> |10⟩ --H₁--> 1/√2(|00⟩ - |10⟩) --CNOT₁₂--> 1/√2(|00⟩ - |11⟩).",
        clue: "<b>Bell State Creation</b>: To get a minus sign in the Bell state, apply a Hadamard to a $|1\\rangle$ state. Starting with $|00\\rangle$, use an X gate to reach $|10\\rangle$ first."
    },
    "1_31_8": {
        q: "Which of the following pairs of quantum states can be perfectly distinguished? (Select all that apply)",
        options: [
            /* Option A: Identical states - Not distinguishable */
            `<div style="text-align:center;padding:8px 0">
               $$\\left( \\sqrt{\\frac{6}{19}}|0\\rangle + \\sqrt{\\frac{13}{19}}|1\\rangle, \\sqrt{\\frac{6}{19}}|0\\rangle + \\sqrt{\\frac{13}{19}}|1\\rangle \\right)$$
             </div>`,
            /* Option B (CORRECT): Orthogonal pair */
            `<div style="text-align:center;padding:8px 0">
               $$\\left( \\sqrt{\\frac{13}{19}}|0\\rangle + \\sqrt{\\frac{6}{19}}|1\\rangle, -\\sqrt{\\frac{6}{19}}|0\\rangle + \\sqrt{\\frac{13}{19}}|1\\rangle \\right)$$
             </div>`,
            /* Option C (CORRECT): Orthogonal pair */
            `<div style="text-align:center;padding:8px 0">
               $$\\left( \\sqrt{\\frac{6}{19}}|0\\rangle - \\sqrt{\\frac{13}{19}}|1\\rangle, \\sqrt{\\frac{13}{19}}|0\\rangle + \\sqrt{\\frac{6}{19}}|1\\rangle \\right)$$
             </div>`,
            /* Option D: Non-orthogonal pair */
            `<div style="text-align:center;padding:8px 0">
               $$\\left( \\sqrt{\\frac{6}{19}}|0\\rangle - \\sqrt{\\frac{13}{19}}|1\\rangle, -\\sqrt{\\frac{6}{19}}|0\\rangle - \\sqrt{\\frac{13}{19}}|1\\rangle \\right)$$
             </div>`
        ],
        answer: [1, 2],
        explanation: "Two quantum states are perfectly distinguishable if and only if they are orthogonal (⟨ψ|φ⟩ = 0). For B: (√13/19)(-√6/19) + (√6/19)(√13/19) = 0. For C: (√6/19)(√13/19) + (-√13/19)(√6/19) = 0. Both are valid distinguishable pairs.",
        clue: "<b>Orthogonality Condition</b>: Calculate the inner product $\\langle \\psi | \\phi \\rangle$ for each pair. Only pairs with an inner product of <b>zero</b> can be perfectly distinguished."
    },
    "1_31_9": {
        q: "Which of the following states are equivalent to $|\\psi\\rangle = \\cos \\frac{\\pi}{4} |0\\rangle + e^{i\\pi/3} \\sin \\frac{\\pi}{4} |1\\rangle$ physically?",
        options: [
            `<div style="text-align:center;padding:4px 0">$e^{i\\frac{\\pi}{2}}\\cos\\frac{\\pi}{4}|0\\rangle + e^{i(\\frac{\\pi}{3} + \\frac{\\pi}{2})}\\sin\\frac{\\pi}{4}|1\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Option (a)</div>`,
            `<div style="text-align:center;padding:4px 0">$\\cos\\frac{\\pi}{4}|0\\rangle + e^{i\\frac{4\\pi}{3}}\\sin\\frac{\\pi}{4}|1\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Option (b)</div>`,
            `<div style="text-align:center;padding:4px 0">$-\\cos\\frac{\\pi}{4}|0\\rangle - e^{i\\frac{\\pi}{3}}\\sin\\frac{\\pi}{4}|1\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Option (c)</div>`,
            `<div style="text-align:center;padding:4px 0">$\\cos\\frac{\\pi}{4}|0\\rangle + e^{i\\frac{\\pi}{6}}\\sin\\frac{\\pi}{4}|1\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Option (d)</div>`
        ],
        answer: [0, 2],
        explanation: "Physical equivalence means states differ only by a global phase ($e^{i\\alpha}$). Option (a) is $|\\psi\\rangle$ multiplied by $e^{i\\pi/2}$. Option (c) is $|\\psi\\rangle$ multiplied by $-1 = e^{i\\pi}$.",
        clue: "<b>Global Phase</b>: Two states represent the same physical configuration if one is a complex scalar multiple (of modulus 1) of the other."
    },
    "1_31_10": {
        q: "Consider the specific single-qubit <i>rotation</i> gates $R_x(\\theta), R_y(\\theta), R_z(\\theta)$ as shown in the matrices. The Hadamard gate can be realized as a sequence of gates of the form $H = e^{i\\phi/2} R_z(\\alpha) R_x(\\theta) R_z(\\beta)$. Identify the values of $\\phi, \\alpha, \\theta$ and $\\beta$.",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\phi = \\pi/4, \\alpha = \\beta = \\pi, \\theta = \\pi/2$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\phi = 0, \\alpha = \\beta = \\pi/2, \\theta = \\pi/4$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\phi = \\pi/4, \\alpha = \\beta = \\pi/2, \\theta = \\pi/4$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\phi = \\pi/2, \\alpha = \\beta = \\theta = \\pi/2$</div>`
        ],
        answer: 2,
        explanation: "Based on the official assignment results, the Hadamard gate sequence is satisfied by the parameters: $\\phi = \\pi/4, \\alpha = \\beta = \\pi/2, \\theta = \\pi/4$.",
        clue: "<b>Hadamard Decomposition</b>: Compare the result of the matrix multiplication $e^{i\\phi/2} R_z(\\alpha) R_x(\\theta) R_z(\\beta)$ with the Hadamard matrix $H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$."
    },

    // === WEEK 2: Assignment 2 ===
    "2_31_1": {
        q: "Which Qiskit Runtime primitives are currently available on the IBM Quantum Platform?",
        options: [
            `<div style="text-align:center;padding:4px 0">Sampler and Estimator</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Core payload primitives</div>`,
            `<div style="text-align:center;padding:4px 0">Circuit-Runner and Executor</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Legacy/deprecated terms</div>`,
            `<div style="text-align:center;padding:4px 0">Transpiler and Optimizer</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Infrastructure tools</div>`,
            `<div style="text-align:center;padding:4px 0">Backend and Provider</div><div style="font-size:0.82em;opacity:0.72;text-align:center">General Qiskit objects</div>`
        ],
        answer: 0,
        explanation: "Sampler (for probability distributions) and Estimator (for expectation values) are the two core primitives.",
        clue: "<b>Qiskit Primitives</b>: IBM Quantum Platform provides two main entry points: one for populations/counts and one for observables."
    },
    "2_31_2": {
        q: "Which version of OpenQASM is primarily supported by the IBM Quantum Composer code editor?",
        options: [
            `<div style="text-align:center;padding:4px 0">OpenQASM 1.0</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Initial specification</div>`,
            `<div style="text-align:center;padding:4px 0">OpenQASM 2.0</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Industry standard for Composer</div>`,
            `<div style="text-align:center;padding:4px 0">OpenQASM 3.0</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Latest dynamic feature set</div>`,
            `<div style="text-align:center;padding:4px 0">OpenQASM 2.5</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Non-standard version</div>`
        ],
        answer: 1,
        explanation: "IBM Quantum Composer currently supports OpenQASM 2.0 as its primary high-level assembly language.",
        clue: "<b>OpenQASM</b>: Look for the version number used in the 'Code Editor' view of the IBM Quantum tools."
    },
    "2_31_3": {
        q: "Which statement correctly describes the difference between the Sampler and Estimator primitives in Qiskit?",
        options: [
            `<div style="text-align:center;padding:4px 0">Sampler returns measurement outcome distributions from a circuit, while Estimator returns expectation values of specified observables</div>`,
            `<div style="text-align:center;padding:4px 0">Sampler is used for variational algorithms, while Estimator is used only for circuit execution</div>`,
            `<div style="text-align:center;padding:4px 0">Sampler requires observables as input, while Estimator does not</div>`,
            `<div style="text-align:center;padding:4px 0">Estimator returns raw bitstrings, while Sampler returns expectation values</div>`
        ],
        answer: 0,
        explanation: "In Qiskit Runtime, the Sampler primitive is designed to produce quasi-probability distributions (bitstrings/counts), while the Estimator is optimized for calculating the expectation values of physical operators/observables.",
        clue: "<b>Data Types</b>: One primitive is used for <b>populations/distributions</b>, while the other is used for <b>statistical averages</b> of observables."
    },
    "2_31_4": {
        q: "In the transpilation process, which of the following steps are NOT performed to prepare a quantum circuit for execution on real quantum hardware?",
        options: [
            `<div style="text-align:center;padding:4px 0">Decomposing multi-qubit gates into basis gates supported by the backend</div>`,
            `<div style="text-align:center;padding:4px 0">Mapping logical qubits to physical qubits based on the hardware topology</div>`,
            `<div style="text-align:center;padding:4px 0">Optimizing circuit depth to reduce gate count</div>`,
            `<div style="text-align:center;padding:4px 0">Converting all gates to Hadamard and CNOT gates only</div>`
        ],
        answer: 3,
        explanation: "Transpilation maps a circuit to the specific native basis gates of the target hardware (e.g., √X, Rz, CX). Converting everything to just H and CNOT is a general decomposition step but not the goal of hardware-specific transpilation.",
        clue: "<b>Hardware Constraints</b>: Real quantum computers have specific native gates. Transpilation must target those *native* sets, not just any universal set like H/CNOT."
    },
    "2_31_5": {
        q: "Using IBM Quantum Composer, create a 3-qubit circuit starting in state $|000\\rangle$. Apply a rotation gate $R_y(\\pi/3)$ to the first qubit $q[0]$. What is the resulting quantum state?",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\dfrac{1}{2}|000\\rangle + \\dfrac{\\sqrt{3}}{2}|100\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Incorrect amplitudes</div>`,
            `<div style="text-align:center;padding:4px 0">$\\dfrac{\\sqrt{3}}{2}|000\\rangle + \\dfrac{1}{2}|100\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Correct 3-qubit state</div>`,
            `<div style="text-align:center;padding:4px 0">$\\dfrac{\\sqrt{3}}{2}|000\\rangle + \\dfrac{1}{2}|001\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Qiskit ordering variant</div>`,
            `<div style="text-align:center;padding:4px 0">$\\dfrac{1}{\\sqrt{2}}(|000\\rangle + |111\\rangle)$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">GHZ state</div>`
        ],
        answer: 1,
        explanation: "Applying Ry(π/3) to |0⟩ gives cos(π/6)|0⟩ + sin(π/6)|1⟩ = √3/2|0⟩ + 1/2|1⟩. In a 3-qubit system, this results in √3/2|000⟩ + 1/2|100⟩ (using the notation where the first bit corresponds to q[0]).",
        clue: "<b>Ry Rotation</b>: The gate $R_y(\\theta)$ maps $|0\\rangle$ to $\\cos(\\theta/2)|0\\rangle + \\sin(\\theta/2)|1\\rangle$."
    },
    "2_31_6": {
        q: "To create a 3-qubit GHZ state, which sequence is applied to $|000\\rangle$?",
        options: [
            `<div style="text-align:center;padding:4px 0">$H_0 \\to CNOT_{01} \\to CNOT_{02}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Standard Bell $\\to$ GHZ sequence</div>`,
            `<div style="text-align:center;padding:4px 0">$H_0 \\to H_1 \\to H_2$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Uniform superposition (no entanglement)</div>`,
            `<div style="text-align:center;padding:4px 0">$X_0 \\to CNOT_{01}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Incomplete state prep</div>`,
            `<div style="text-align:center;padding:4px 0">$H_0 \\to CNOT_{10}$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Reverse control logic</div>`
        ],
        answer: 0,
        explanation: "Hadamard on first qubit followed by CNOTs to entangle others creates 1/√2(|000⟩+|111⟩).",
        clue: "<b>GHZ State</b>: This state is a multi-qubit generalization of the Bell state. It requires one Hadamard to create base superposition."
    },
    "2_31_7": {
        q: "Starting with the initial state $|\\psi\\rangle = \\frac{1}{2}(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle)$, apply a CNOT gate with control qubit $q[0]$ and target qubit $q[1]$, followed by a Hadamard gate on $q[0]$. What is the resulting quantum state?",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\frac{1}{2}(|00\\rangle + |01\\rangle + |10\\rangle - |11\\rangle)$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\frac{\\sqrt{2}}{2}(|00\\rangle + |10\\rangle)$</div>`,
            `<div style="text-align:center;padding:4px 0">$|00\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\frac{1}{2}(|00\\rangle + |01\\rangle - |10\\rangle + |11\\rangle)$</div>`
        ],
        answer: 1,
        explanation: "The initial state is $|+\\rangle |+\\rangle$. Applying CNOT ($q_0$ ctrl, $q_1$ target) leaves $|+\\rangle |+\\rangle$ invariant. Applying Hadamard on $q_0$ transforms it to $|0\\rangle |+\\rangle$, which is $\\frac{1}{\\sqrt{2}}(|00\\rangle + |10\\rangle)$.",
        clue: "<b>Step-by-step Transformation</b>: $|++\\rangle \\xrightarrow{CNOT} |++\\rangle \\xrightarrow{H \\otimes I} |0+\\rangle$."
    },
    "2_31_8": {
        q: "Apply a rotation gate $R_y(2\\pi/3)$ to the first qubit of state $|000\\rangle$, followed by a CNOT from qubit 0 to qubit 1. What is the resulting quantum state?",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\dfrac{1}{2}|000\\rangle + \\dfrac{\\sqrt{3}}{2}|011\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Correct entanglement</div>`,
            `<div style="text-align:center;padding:4px 0">$\\dfrac{\\sqrt{3}}{2}|000\\rangle + \\dfrac{1}{2}|111\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Incorrect weights</div>`,
            `<div style="text-align:center;padding:4px 0">$\\dfrac{1}{2}|000\\rangle + \\dfrac{1}{2}|111\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">W-state variant</div>`,
            `<div style="text-align:center;padding:4px 0">$\\dfrac{1}{2}|101\\rangle + \\dfrac{\\sqrt{3}}{2}|010\\rangle$</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Phased rotation result</div>`
        ],
        answer: 0,
        explanation: "Ry(2π/3) on q0 maps |0⟩ to 1/2|0⟩ + √3/2|1⟩. In the 3-qubit base state |000⟩, the rotated state becomes 1/2|000⟩ + √3/2|001⟩ (using Qiskit's rightmost q0 ordering). Applying CNOT(q0→q1) flips q1 only when q0=1, yielding 1/2|000⟩ + √3/2|011⟩.",
        clue: "<b>Sequential Gates</b>: First find the state after rotation, then apply the CNOT rules ($|10\\rangle \\to |11\\rangle$)."
    },
    "2_31_9": {
        q: "In a quantum teleportation protocol, Bob applies correction gates based on the 2-bit classical message from Alice. If Bob’s gate sequences in four trials are: $(I, I), (Z, I), (X, I)$, and $(XZ, I)$, what are the corresponding 2-bit messages Alice sent?",
        options: [
            `<div style="text-align:center;padding:4px 0">00, 01, 10, 11</div>`,
            `<div style="text-align:center;padding:4px 0">00, 10, 01, 11</div>`,
            `<div style="text-align:center;padding:4px 0">11, 10, 01, 00</div>`,
            `<div style="text-align:center;padding:4px 0">10, 00, 11, 01</div>`
        ],
        answer: 0,
        explanation: "In standard teleportation, Alice's bits $(b_2, b_1)$ tell Bob whether to apply Z (if $b_1=1$) and X (if $b_2=1$). Thus: 00 $\\to$ $I$, 01 $\\to$ $Z$, 10 $\\to$ $X$, 11 $\\to$ $XZ$.",
        clue: "<b>Bit-to-Gate Mapping</b>: The first bit controls the Z gate, and the second bit controls the X gate."
    },
    "2_31_10": {
        q: "Alice and Bob share an entangled state $\\frac{1}{\\sqrt{2}}(|01\\rangle + |10\\rangle)$. If Alice measures her qubit in the computational basis and obtains result $|0\\rangle$, what is the state of Bob's qubit after Alice's measurement?",
        options: [
            `<div style="text-align:center;padding:4px 0">$|1\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|0\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$</div>`,
            `<div style="text-align:center;padding:4px 0">$\\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)$</div>`
        ],
        answer: 0,
        explanation: "The state is anti-correlated. If Alice measures $|0\\rangle$, the system collapses to the component where the first qubit is $|0\\rangle$, namely $|01\\rangle$. Thus, Bob's qubit is in state $|1\\rangle$.",
        clue: "<b>Entanglement Correlation</b>: Measuring '0' on the first qubit collapses the system into the state where the second qubit is 1."
    },

    // === WEEK 3: Assignment 3 ===
    // === WEEK 3: Assignment 3 ===
    "3_31_1": {
        q: "Consider $|X\\rangle = |X_{N-1}X_{N-2} \\dots X_1X_0\\rangle$, a N-qubit state, is there a simple unitary $\\hat{U}$ such that: $\\hat{U}|X\\rangle = |\\psi\\rangle = \\frac{1}{\\sqrt{2^N}} \\sum_{Y \\in \\{0,1\\}^N} (-1)^{X \\cdot Y} |Y\\rangle$ where $X \\cdot Y$ denotes the mod 2 bitwise inner product $X \\cdot Y = (X_{N-1} \\cdot Y_{N-1}) \\oplus (X_{N-2} \\cdot Y_{N-2}) \\oplus \\dots \\oplus (X_1 \\cdot Y_1) \\oplus (X_0 \\cdot Y_0)$ Starting from the state $|\\psi\\rangle$, can one get complete information of $X$ by applying some unitary gates followed by measurement?",
        options: [
            `<div style="text-align:center;padding:4px 0">$\\hat{U} = \\hat{S}^{\\otimes N}$, Yes we can get information about $X$ starting from $|\\psi\\rangle$ by using $\\hat{S}^{\\otimes N}$ followed by measurement.</div>`,
            `<div style="text-align:center;padding:4px 0">Such a unitary cannot be achieved.</div>`,
            `<div style="text-align:center;padding:4px 0">$\\hat{U} = \\hat{H}^{\\otimes N}$, Yes we can get information about $X$ starting from $|\\psi\\rangle$ by using $\\hat{H}^{\\otimes N}$ followed by measurement.</div>`,
            `<div style="text-align:center;padding:4px 0">$\\hat{U} = \\hat{T}^{\\otimes N}$, We cannot infer $X$ from $|\\psi\\rangle$.</div>`
        ],
        answer: 2,
        explanation: "The Hadamard transform $\\hat{H}^{\\otimes N}$ maps a computational basis state $|X\\rangle$ to the uniform superposition with phases $(-1)^{X \\cdot Y}$. Since $\\hat{H}$ is its own inverse, applying $\\hat{H}^{\\otimes N}$ to $|\\psi\\rangle$ returns the basis state $|X\\rangle$, which can then be measured to perfectly retrieve $X$.",
        clue: "<b>Hadamard Transform</b>: The N-qubit Hadamard gate creates phases according to the bitwise inner product. Remember that $H^2 = I$."
    },
    "3_31_2": {
        q: "In the Deutsch-Jozsa problem, what is the minimum number of queries a classical deterministic algorithm must make to determine with 100% certainty whether a function of input size $n$ is constant or balanced?",
        options: [
            `<div style="text-align:center;padding:4px 0">$2^n$</div>`,
            `<div style="text-align:center;padding:4px 0">$n$</div>`,
            `<div style="text-align:center;padding:4px 0">$2^{n-1} + 1$</div>`,
            `<div style="text-align:center;padding:4px 0">$2$</div>`
        ],
        answer: 2,
        explanation: "To be 100% certain classically, one must check more than half of the possible inputs. If all $2^{n-1}$ inputs checked are the same, the $(2^{n-1} + 1)$-th input could still potentially break the pattern. Thus, $2^{n-1} + 1$ queries are required.",
        clue: "<b>Classical Complexity</b>: Think about the worst-case scenario where the first half of the domain tested all return the same value."
    },
    "3_31_3": {
        q: "What are the possible outputs when the first 3 qubits are measured at the end of the circuit? Follow qiskit ordering",
        options: [
            `<div style="text-align:center;padding:4px 0">$|000\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|101\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|010\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|110\\rangle$</div>`
        ],
        answer: [2, 3],
        explanation: "By analyzing the oracle and the H-gate sandwich (Deutsch-Jozsa template), the resulting measurements on the first 3 qubits reflect the properties of the encoded function. Based on the qiskit bit ordering, the accepted outputs are $|010\\rangle$ and $|110\\rangle$.",
        clue: "<b>Deutsch-Jozsa Template</b>: The circuit uses a phase oracle. Follow the evolution of the state through the gates."
    },
    "3_31_4": {
        q: "Which properties of a quantum mechanical system are exploited by both the Deutsch-Jozsa and Bernstein-Vazirani algorithms to encode the function's output $f(x)$ onto the phase of the input state?",
        options: [
            `<div style="text-align:center;padding:4px 0">Uncertainty Principle</div>`,
            `<div style="text-align:center;padding:4px 0">Phase Kickback</div>`,
            `<div style="text-align:center;padding:4px 0">Superposition</div>`,
            `<div style="text-align:center;padding:4px 0">All the above</div>`
        ],
        answer: [1, 2],
        explanation: "Both algorithms use **Superposition** to evaluate the function on all inputs simultaneously and **Phase Kickback** (using an ancilla in the $|-\\rangle$ state) to move the function's result into the phase as $(-1)^{f(x)}$.",
        clue: "<b>Core Mechanisms</b>: How does the $|-\\rangle$ state on the target qubit help encode the $f(x)$ result?"
    },
    "3_31_5": {
        q: "What is the expected output when the qubits are measured at the end of the circuit",
        options: [
            `<div style="text-align:center;padding:4px 0">$|010\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|110\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|001\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">$|000\\rangle$</div>`,
            `<div style="text-align:center;padding:4px 0">None of these</div>`
        ],
        answer: 3,
        explanation: "Applying the gate sequence $(H, X, H)$ to individual qubits and the Z gate as shown leads to a constructive interference at $|000\\rangle$ for this specific configuration.",
        clue: "<b>Gate Sequence</b>: Track the state of each qubit. $H X H = Z$ and $H Z H = X$."
    },
    "3_31_6": {
        q: "What is the probability for all the first 4 wires to output 0 when measured at the end of the following circuit?",
        options: [
            `<div style="text-align:center;padding:4px 0">1/4</div>`,
            `<div style="text-align:center;padding:4px 0">1/16</div>`,
            `<div style="text-align:center;padding:4px 0">0</div>`,
            `<div style="text-align:center;padding:4px 0">1</div>`,
            `<div style="text-align:center;padding:4px 0">None of these</div>`
        ],
        answer: 2,
        explanation: "Based on the circuit analysis and the official assignment result, physical interference effects for this configuration result in a zero probability for the $|0000\\rangle$ output.",
        clue: "<b>Circuit Probability</b>: Follow the evolution of the state through the oracle. Constant oracles result in $|0\\dots 0\\rangle$ with probability 1, while balanced ones yield 0."
    },
    "3_31_7": {
        q: "How does the quantum circuit for the Bernstein-Vazirani algorithm fundamentally compare to the circuit for the Deutsch-Jozsa algorithm?",
        options: [
            `<div style="text-align:center;padding:4px 0">It requires n repetitions of the Deutsch-Jozsa circuit to find each bit of the secret string.</div>`,
            `<div style="text-align:center;padding:4px 0">It is completely different, using a new set of gates and a novel structure.</div>`,
            `<div style="text-align:center;padding:4px 0">It replaces all Hadamard gates with CNOT gates to determine the secret string.</div>`,
            `<div style="text-align:center;padding:4px 0">It is identical in structure, differing only in the function implemented by the oracle.</div>`
        ],
        answer: 3,
        explanation: "Both algorithms utilize the same 'Hadamard-Oracle-Hadamard' template. The key difference lies entirely within the phase oracle's implementation logic.",
        clue: "<b>Algorithm Architecture</b>: Compare the high-level diagrams of both algorithms. You'll notice they share the exact same gate sandwich structure."
    },
    "3_31_8": {
        q: "How is the reflection about the uniform superposition state $|u\\rangle$ (the Grover diffuser) constructed?",
        options: [
            `<div style="text-align:center;padding:4px 0">By transforming $|u\\rangle$ to $|0 \\dots 0\\rangle$ with Hadamard gates, reflecting about $|0 \\dots 0\\rangle$, and transforming back</div>`,
            `<div style="text-align:center;padding:4px 0">It is implemented by a different oracle designed to mark the state $|u\\rangle$.</div>`,
            `<div style="text-align:center;padding:4px 0">It is a fundamental quantum gate that can be applied directly.</div>`,
            `<div style="text-align:center;padding:4px 0">By applying the oracle in reverse on the state $|u\\rangle$.</div>`
        ],
        answer: 0,
        explanation: "The Grover diffuser operation $(2|u\\rangle\\langle u| - I)$ is achieved by applying $H^{\\otimes N}$, then reflecting about the zero state $(2|0\\rangle\\langle 0| - I)$, and finally applying $H^{\\otimes N}$ again.",
        clue: "<b>Grover Diffuser</b>: This operator 'reflects about the mean'. It requires a basis change to the all-zeros state using Hadamard gates."
    },
    "3_31_9": {
        q: "What does the following quantum circuit represent?",
        options: [
            `<div style="text-align:center;padding:4px 0">Deutsch-Jozsa with Constant Function Oracle</div>`,
            `<div style="text-align:center;padding:4px 0">Deutsch-Jozsa with Balanced Function Oracle</div>`,
            `<div style="text-align:center;padding:4px 0">Bernstein-Vazirani with hidden string 111</div>`,
            `<div style="text-align:center;padding:4px 0">Grover’s Search</div>`
        ],
        answer: 0,
        explanation: "The circuit clearly shows a Deutsch-Jozsa template (H-Oracle-H). Since there are no gates between the input wires and the target qubit, the function is constant ($f(x)=0$), making it a Constant Function Oracle.",
        clue: "<b>Visual Oracle Analysis</b>: Check if any gates (CNOTs or Zs) are applied to the input wires between the Hadamard layers."
    },
    "3_31_10": {
        q: "The geometric interpretation of Grover’s algorithm involves a rotation within a 2D plane. Which two orthogonal basis vectors span this plane?",
        options: [
            `<div style="text-align:center;padding:4px 0">The initial uniform superposition state $|u\\rangle$ and the final target state $|a\\rangle$.</div>`,
            `<div style="text-align:center;padding:4px 0">The target state $|a\\rangle$ and a uniform superposition of all non-target states, $|e\\rangle$.</div>`,
            `<div style="text-align:center;padding:4px 0">The input register state $|x\\rangle$ and the output register state $|f(x)\\rangle$.</div>`,
            `<div style="text-align:center;padding:4px 0">The all-zeros state $|0 \\dots 0\\rangle$ and the all-ones state $|1 \\dots 1\\rangle$.</div>`
        ],
        answer: 1,
        explanation: "In Grover's geometry, the state vector starts in superposition and rotates toward the solution $|a\\rangle$. The plane is spanned by the solution vector $|a\\rangle$ and the superposition of all incorrect answers $|e\\rangle$.",
        clue: "<b>Search Geometry</b>: Grover rotations happen in a specific 2D subspace where one axis is the marked state."
    },

    // === WEEK 4: Assignment 4 ===
    "4_31_1": {
        q: "Which of the following statements regarding Variational Quantum Algorithms (VQAs) are correct? (Select all that apply)",
        options: [
            `<div style="text-align:center;padding:4px 0">Classical part calculates cost</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Hybrid optimization loop</div>`,
            `<div style="text-align:center;padding:4px 0">Shallow & faithful cost function</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Desirable for NISQ devices</div>`,
            `<div style="text-align:center;padding:4px 0">Problem-agnostic ansatz is better</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Usually faces more challenges</div>`,
            `<div style="text-align:center;padding:4px 0">Deep Circuits display Barren Plateau</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Vanishing gradient problem</div>`
        ],
        answer: [1, 3],
        explanation: "A shallow and faithful cost function is desirable for efficient optimization. Randomly initialized deep circuits suffer from Barren Plateaus where gradients vanish exponentially, making optimization nearly impossible.",
        clue: "<b>Variational Algorithms</b>: Focus on what makes VQAs practical — shallow cost functions avoid deep circuits, and Barren Plateaus are a known challenge with random initialization."
    },
    "4_31_2": {
        q: "Select all the statements that hold for $U_{ENT}$ and the unitaries $U^{i,j}(\\Theta_k)$.",
        options: [
            `<div style="text-align:center;padding:4px 0">Together form the trial state</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Basis of the ansatz</div>`,
            `<div style="text-align:center;padding:4px 0">$U_{ENT}$ is the entangling block</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Inter-qubit correlation layer</div>`,
            `<div style="text-align:center;padding:4px 0">$U^{i,j}(\\Theta_k)$ are multiqubit</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Parameterized single-qubit rotations</div>`,
            `<div style="text-align:center;padding:4px 0">Create Superposition & Entanglement</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Rich state space preparation</div>`
        ],
        answer: [0, 1, 3],
        explanation: "U_ENT is the entangling block that creates entanglement between qubits. Together with the parameterized single-qubit rotations U^{i,j}(Θ_k), they form the trial state (ansatz). The resulting state exhibits both superposition and entanglement. The U^{i,j}(Θ_k) are single-qubit (not multiqubit) unitaries.",
        clue: "<b>Ansatz Structure</b>: The variational circuit has two key components — parameterized rotations (single-qubit) and entangling blocks. Together they prepare a rich trial state."
    },
    "4_31_3": {
        q: "The number of layers $d$ in a NISQ circuit is primarily a function of:",
        options: [
            `<div style="text-align:center;padding:4px 0">Gates being performed</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Computational complexity</div>`,
            `<div style="text-align:center;padding:4px 0">Number of qubits</div><div style="font-size:0.82em;opacity:0.72;text-align:center">System size</div>`,
            `<div style="text-align:center;padding:4px 0">Gating & Scaling</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Combined software factors</div>`,
            `<div style="text-align:center;padding:4px 0">Available Coherence Time</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Hardware noise constraint</div>`
        ],
        answer: 3,
        explanation: "On NISQ hardware, the number of layers d is limited by the coherence time of the qubits. Deeper circuits accumulate more noise and decoherence errors, so the available coherence time is the primary constraint.",
        clue: "<b>Circuit Depth</b>: Real quantum hardware has a finite 'lifetime' for quantum information. The circuit must complete before decoherence destroys the state."
    },
    "4_31_4": {
        q: "Quantum Generative Adversarial Networks (QGANs) consists of which competing parts?",
        options: [
            `<div style="text-align:center;padding:4px 0">Encoder</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Information compression</div>`,
            `<div style="text-align:center;padding:4px 0">Generator</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Synthetic state preparation</div>`,
            `<div style="text-align:center;padding:4px 0">Decoder</div><div style="font-size:0.82em;opacity:0.72;text-align:center">State classification</div>`,
            `<div style="text-align:center;padding:4px 0">Discriminator</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Turing test for data</div>`
        ],
        answer: [1, 3],
        explanation: "QGANs, like classical GANs, consist of a Generator (which creates synthetic data) and a Discriminator (which tries to distinguish real from fake data). They compete in a minimax game.",
        clue: "<b>Adversarial Training</b>: The two competing components in a GAN are the one that creates and the one that judges."
    },
    "4_31_5": {
        q: "Which of the following statements is an accurate description of the phenomenon of decoherence?",
        options: [
            `<div style="text-align:center;padding:4px 0">Decoherence causes a pure quantum state to transform into an incoherent mixture of multiple states.</div>`,
            `<div style="text-align:center;padding:4px 0">Decoherence is caused when a quantum system evolves with time via a unitary transformation.</div>`,
            `<div style="text-align:center;padding:4px 0">Decoherence is caused when a quantum system is coupled to a bath or environment and the joint system evolves via a unitary transformation.</div>`,
            `<div style="text-align:center;padding:4px 0">Decoherence is a reversible process.</div>`
        ],
        answer: [0, 2],
        explanation: "Decoherence involves the transformation of pure states into mixed states due to interaction with an external environment (bath). While the combined system+bath evolves unitarily, the subsystem alone does not, leading to the loss of coherence.",
        clue: "<b>Open Quantum Systems</b>: Think about how interaction with the environment changes a 'pure' superposition into a 'mixture'."
    },
    "4_31_6": {
        q: "Select all the options that apply to the three-qubit quantum error correcting code.",
        options: [
            `<div style="text-align:center;padding:4px 0">The three-qubit code assumes that the bit-flip noise occurs identically and independently on the encoded qubits.</div>`,
            `<div style="text-align:center;padding:4px 0">The encoding transforms the state $\\alpha|0\\rangle + \\beta|1\\rangle$ to $(\\alpha|0\\rangle + \\beta|1\\rangle)^{\\otimes 3}$ where $|\\alpha|^2 + |\\beta|^2 = 1$.</div>`,
            `<div style="text-align:center;padding:4px 0">The bit-flip noise flips the qubit with some probability $p$ and leaves it untouched with probability $1-p$.</div>`,
            `<div style="text-align:center;padding:4px 0">The encoding transforms the state $\\alpha|0\\rangle + \\beta|1\\rangle$ to $(\\alpha|000\\rangle + \\beta|111\\rangle)$ where $|\\alpha|^2 + |\\beta|^2 = 1$.</div>`
        ],
        answer: [0, 2, 3],
        explanation: "The three-qubit code protects against bit-flips by encoding a logical qubit into three physical qubits using entanglement (not independent copies, which would violate the No-Cloning theorem). It assumes independent and identically distributed (i.i.d.) noise on each qubit.",
        clue: "<b>3-Qubit Code</b>: Check the definitions for encoding and the base assumptions of the noise model."
    },
    "4_31_7": {
        q: "Let $S_1$ and $S_2$ denote the syndrome bits at the end of the 3-qubit bit-flip code. Match the syndrome bit values to their respective recovery gates.<br><br><table style='width:100%;border-collapse:collapse; margin:10px 0; background:rgba(30,41,59,0.5); border:1px solid var(--glass-border); border-radius:8px; overflow:hidden'><tr style='border-bottom:2px solid var(--primary); color:var(--text-main); font-weight:700'><td style='padding:8px;text-align:center'>Syndrome $(S_1, S_2)$</td><td style='padding:8px;text-align:center'>Recovery Gates</td></tr><tr style='border-bottom:1px solid var(--glass-border)'><td style='padding:6px;text-align:center'>x. (0, 1)</td><td style='padding:6px;text-align:center'>i. $I \\otimes I \\otimes X$</td></tr><tr style='border-bottom:1px solid var(--glass-border)'><td style='padding:6px;text-align:center'>y. (1, 1)</td><td style='padding:6px;text-align:center'>ii. $X \\otimes I \\otimes I$</td></tr><tr><td style='padding:6px;text-align:center'>z. (1, 0)</td><td style='padding:6px;text-align:center'>iii. $I \\otimes X \\otimes I$</td></tr></table>",
        options: [
            `<div style="text-align:center;padding:4px 0">x-i, y-ii, z-iii</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Incorrect mapping</div>`,
            `<div style="text-align:center;padding:4px 0">x-i, y-iii, z-ii</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Standard syndrome decoding</div>`,
            `<div style="text-align:center;padding:4px 0">x-ii, y-iii, z-i</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Bit-reversal error</div>`,
            `<div style="text-align:center;padding:4px 0">x-iii, y-i, z-ii</div><div style="font-size:0.82em;opacity:0.72;text-align:center">Logic mismatch</div>`
        ],
        answer: 1,
        explanation: "Syndrome (0,1) means error on qubit 3 → recovery I⊗I⊗X (x-i). Syndrome (1,1) means error on qubit 2 → recovery I⊗X⊗I (y-iii). Syndrome (1,0) means error on qubit 1 → recovery X⊗I⊗I (z-ii).",
        clue: "<b>Syndrome Decoding</b>: Each syndrome pattern uniquely identifies which qubit was flipped. Map the bit pattern to the position of the error."
    },
    "4_31_8": {
        q: `What is the probability for the state $|0100111\\rangle$ when measured at the end of the following circuit for Deutsch-Jozsa algorithm on 7 qubits?<br><br>
        <div style="text-align:center; margin-top: 1rem;">
            <img src="/week4_images/week4_q8.png" alt="Quantum Circuit" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--glass-border);">
        </div>`,
        options: [
            `<div style="text-align:center;padding:4px 0">0</div>`,
            `<div style="text-align:center;padding:4px 0">1/128</div>`,
            `<div style="text-align:center;padding:4px 0">1/64</div>`,
            `<div style="text-align:center;padding:4px 0">1</div>`
        ],
        answer: 3,
        explanation: "In the 7-qubit Deutsch-Jozsa algorithm with $f(x)=1$ (constant), the initial state $|0,0,0,0,0,0,1\\rangle$ is transformed. After Hadamard gates on all qubits and the oracle application, the output for a constant function always returns to the all-zeros basis state with probability 1 if the oracle is identity or equivalent constant transform.",
        clue: "<b>Constant Function Oracle</b>: If the oracle represents a constant function ($f(x)=1$), the circuit results in the $|0\\dots 0\\rangle$ basis state with probability 1 at the end of the interference."
    },
    "4_31_9": {
        q: "Consider the encoded (or logical) state $|\\psi_L\\rangle = \\alpha|000\\rangle + \\beta|111\\rangle$ subject to a quantum noise channel where each qubit can undergo a bit flip with probability $p$. The exact probability that the 3-qubit bit-flip quantum error correcting code fails to recover the original state is given by $x \\cdot p^y \\cdot (1-p)^z + p^3$, where $p$ is the bit-flip probability and $x, y, z$ are the variables to be identified. The value of $y \\cdot x + z$_______ (here, $\\cdot$ denotes multiplication).",
        options: [
            `<div style="text-align:center;padding:4px 0">6</div>`,
            `<div style="text-align:center;padding:4px 0">7</div>`,
            `<div style="text-align:center;padding:4px 0">10</div>`,
            `<div style="text-align:center;padding:4px 0">5</div>`
        ],
        answer: 1,
        explanation: "Failures occur with 2 errors ($3p^2(1-p)$) or 3 errors ($p^3$). Thus $x=3, y=2, z=1$. The required value is $y \\cdot x + z = 2 \\cdot 3 + 1 = 7$.",
        clue: "<b>Probability Analysis</b>: Identify the coefficients from the failure probability formula for a majority-vote decoding scheme."
    },
    "4_31_10": {
        q: "Consider a 3-qubit state in the $\{|+\\rangle, |-\\rangle\}$ basis, of the form $\\frac{1}{\\sqrt{2}}(|{+++}\\rangle + |{---}\\rangle)$. Which of the following sets of errors can be detected on this state?",
        options: [
            `<div style="text-align:center;padding:4px 0">$\{XII, IXI, IIX\}$</div>`,
            `<div style="text-align:center;padding:4px 0">$\{IZI, ZIZ\}$</div>`,
            `<div style="text-align:center;padding:4px 0">$\{ZII, IZI, IIZ\}$</div>`,
            `<div style="text-align:center;padding:4px 0">$\{ZII, IZZ, ZZZ\}$</div>`
        ],
        answer: 2,
        explanation: "This state is a logical '+' basis GHZ state. It is essentially the phase-flip equivalent of the bit-flip code. Therefore, it is capable of detecting single Z-errors (phase flips) on any of the three qubits.",
        clue: "<b>Error Detection</b>: Basis-dependent sensitivity. A code in the Hadamard basis protects against flips in the dual basis."
    },
};

const STEPS = [
    {
        id: 0,
        title: "Welcome to Week 4: Variational & Error Correction",
        content: `
            <div style="text-align:center; padding:2rem 0;">
                <p style="font-size:1.1rem; color:#cbd5e1">The Frontier of Quantum Computing</p>
                <div style="text-align:left; display:inline-block; border-left:2px solid #38bdf8; padding-left:1rem; margin:2rem 0;">
                    <div style="font-weight:600; margin-bottom:0.8rem; color:#f8fafc">You will study:</div>
                    <ul style="margin:0; padding-left:1rem; color:#cbd5e1; list-style-type:circle; line-height:1.8">
                        <li>Variational Quantum Eigensolver (VQE)</li>
                        <li>Ansatz Circuits</li>
                        <li>Quantum Error Correction (QEC)</li>
                        <li>Syndrome Measurements</li>
                    </ul>
                </div>
                <div style="margin-top:2rem">
                    <button class="btn btn-primary" onclick="nextStep()" style="flex:0; width:180px; padding: 10px 16px; font-size: 0.85rem;">Start Week 4 →</button>
                    <div style="margin-top:1rem; font-size:0.9rem"><a href="../" style="color:#64748b">Exit to Dashboard</a></div>
                </div>
            </div>
        `
    },
    {
        id: 1,
        title: "Task 1: The VQE Goal",
        reference: "<strong>Key Concept:</strong><br>VQE is a hybrid quantum-classical algorithm used to find the minimum eigenvalue of a Hamiltonian $H$. This is typically the 'Ground State Energy' of a molecule.",
        question: "What is VQE primarily used to find in quantum chemistry?",
        answerValues: ["energy", "ground state", "eigenvalue", "minimum"],
        correctAnswer: "Ground State Energy",
        explanation: "Correct! Solving for the ground state is a major application for NISQ devices.",
        simulatorCode: ["H"],
        diagramExplain: "📖 A simple starting point for VQE: preparing a trial state.",
        quantumLogic: "Hybrid Quantum-Classical Optimization",
        packageRef: "from qiskit.algorithms import VQE\n# Find minimum energy"
    },
    {
        id: 2,
        title: "Task 2: The Ansatz",
        reference: "<strong>Key Concept:</strong><br>An 'Ansatz' is a parameterized quantum circuit $|\psi(\theta)\rangle$ whose parameters $\theta$ are optimized by a classical computer to minimize the energy.",
        question: "What is the name for the parameterized trial circuit in VQE?",
        answerValues: ["ansatz", "trial", "parameterized"],
        correctAnswer: "Ansatz",
        explanation: "Correct! The choice of ansatz is critical for the success of VQE.",
        simulatorCode: ["H", "Z"],
        diagramExplain: "📖 A simple parameterized logic: rotating the phase before measurement.",
        quantumLogic: "Heuristic Ansatz Preparation",
        packageRef: "qc.ry(theta, 0)\n# Parameterized rotation"
    },
    {
        id: 3,
        title: "Task 3: Cost Function",
        reference: "<strong>Key Concept:</strong><br>The 'Cost Function' in VQE is the expectation value $\langle\psi(\theta)|H|\psi(\theta)\rangle$. The classical optimizer tries to find $\min_{\theta} E(\theta)$.",
        question: "What component do we minimize to reach the ground state in VQE?",
        answerValues: ["cost", "function", "energy", "expectation"],
        correctAnswer: "Cost Function",
        explanation: "Correct! The classical computer calculates the next set of parameters based on the current cost.",
        simulatorCode: ["H", "X"],
        diagramExplain: "📖 Evaluating different points in the Hilbert space.",
        quantumLogic: "Expectation Value Calculation",
        packageRef: "cost = Estimator().run(circuit, H)"
    },
    {
        id: 4,
        title: "Task 4: Error Correction (Bit-Flip)",
        reference: "<strong>Key Concept:</strong><br>The simplest QEC is the 3-qubit repetition code. We encode one logical qubit $|0\rangle_L$ into three physical qubits $|000\rangle$. If one qubit flips, we can 'majority vote' it back.",
        question: "To protect against a single bit-flip, how many physical qubits are needed in a basic repetition code?",
        answerValues: ["3", "three", "triple"],
        correctAnswer: "3",
        explanation: "Correct! 3 physical qubits allow us to detect and correct 1 error.",
        simulatorCode: [{ name: "CX", targets: [0, 1] }, { name: "CX", targets: [0, 2] }],
        num_qubits: 3,
        num_bits: 3,
        diagramExplain: "📖 This circuit 'spreads' the information of q0 to q1 and q2. This is called 'Encoding'.",
        quantumLogic: "Quantum Error Coding",
        packageRef: "qc.cx(0, 1)\nqc.cx(0, 2)\n# Triple repetition coding"
    },
    {
        id: 5,
        title: "Task 5: Syndrome Measurement",
        reference: "<strong>Key Concept:</strong><br>In QEC, we don't measure the qubits directly (which would collapse the state). We perform 'Syndrome' measurements to detect errors while preserving the logical state.",
        question: "What is the process of measuring 'parities' to detect errors without destroying data called?",
        answerValues: ["syndrome", "parity", "detection"],
        correctAnswer: "Syndrome Measurement",
        explanation: "Correct! Syndromes tell us 'what' went wrong without revealing 'what' the data is.",
        simulatorCode: [{ name: "CX", targets: [0, 1] }, { name: "CX", targets: [0, 2] }, { name: "CX", targets: [1, 2] }],
        num_qubits: 3,
        num_bits: 3,
        diagramExplain: "📖 Checking correlations between physical qubits to extract the error syndrome.",
        quantumLogic: "Non-Destructive Syndrome Detection",
        packageRef: "qc.measure_all()\n# Extract error patterns"
    },
    {
        id: 6,
        title: "Course Completion!",
        content: `
            <div style="text-align:center; padding:2rem 0;">
                <h2 style="color:#facc15">🌟 Quantum Engineering Mastered!</h2>
                <p style="color:#cbd5e1; margin-top:1rem">You have completed all 4 weekly simulators of the Quantum Study Portal.</p>
                <div style="margin-top:2rem">
                    <a href="../" class="btn btn-primary" style="width:180px; padding: 10px 16px; font-size: 0.85rem;">Return to Dashboard</a>
                </div>
            </div>
        `
    }
];

let currentStepIdx = 0;

function renderStep(idx) {
    const step = STEPS[idx];
    const container = document.getElementById('content-area');
    currentStepIdx = idx;
    const counter = document.getElementById('task-counter');
    if (counter) {
        if (idx === 0) {
            counter.style.display = 'none';
        } else {
            counter.style.display = 'block';
            counter.innerText = `Task ${idx} / ${STEPS.length - 1}`;
        }
    }
    if (step.content) { container.innerHTML = step.content; return; }
    container.innerHTML = `
        <h2 style="color:var(--text-muted); font-family:var(--font-heading); font-weight:400; font-size:1.1rem; margin-bottom:1rem; text-align:center">${step.title}</h2>
        <div class="sim-grid" style="display:grid; grid-template-columns:0.9fr 1fr 0.9fr; gap:24px; align-items:start;">

            <!-- COLUMN 1: Question -->
            <div class="question-box" style="display:flex; flex-direction:column; padding: 1.5rem; position: relative; min-height: 320px;">
                <button class="btn" onclick="viewAnswer()" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--primary); cursor: pointer; font-size: 0.75rem; padding: 0; white-space: nowrap; display: flex; align-items: center; gap: 6px; font-weight: 600; z-index: 10;" title="View Answer">
                    <span>👁️</span> <span style="text-decoration: underline; text-underline-offset: 4px;">View Answer</span>
                </button>
                <div style="margin-bottom:1.25rem; padding-right: 100px;">
                    <div class="question-text" style="font-size: 1.05rem; line-height: 1.6; color:#fff">${step.question}</div>
                </div>
                <div style="margin-bottom:1.25rem">
                    <input type="text" id="user-input" placeholder="Type answer here..." autocomplete="off" style="padding: 12px 16px; font-size: 1rem;">
                </div>
                <div class="btn-container" style="margin-bottom:1.25rem; gap: 12px;">
                    <button class="btn btn-primary" style="padding: 10px 20px; font-size: 0.85rem;" onclick="checkAnswer()">CHECK ANSWER</button>
                    <button id="run-sim-btn" class="btn btn-secondary" style="padding: 10px 20px; font-size: 0.85rem;" disabled onclick="runSimulator()">RUN ▶</button>
                </div>
                <div style="margin-bottom:0.5rem;">
                    <button onclick="toggleReference()" style="background:var(--primary-glow); border:1px solid var(--primary); color:var(--primary); cursor:pointer; font-size:0.75rem; padding:6px 16px; border-radius:20px; transition:all 0.3s; font-weight:600">💡 SHOW HINT</button>
                    <div id="ref-content" style="display:none; margin-top:12px; background:rgba(255,255,255,0.04); border:1px solid var(--glass-border); padding:12px; border-radius:10px; font-size:0.95rem; color:var(--text-muted); line-height:1.6;">${step.reference}</div>
                </div>
                <div id="feedback-msg" class="feedback" style="margin-top:auto; padding: 10px 14px; font-size:1rem; border-radius:10px"></div>
            </div>

            <!-- COLUMN 2: Simulator Output -->
            <div class="result-box" style="display:flex; flex-direction:column; padding: 1.5rem; min-height: 320px;">
                <h3 style="margin:0 0 12px 0; color:var(--primary); font-size:0.95rem; font-family:var(--font-heading); text-transform:uppercase; letter-spacing:1px">Simulator Visualization</h3>
                <div style="background:rgba(0,0,0,0.25); border-radius:12px; height:140px; display:flex; align-items:center; justify-content:center; overflow:hidden; margin-bottom:15px; border: 1px solid var(--glass-border);">
                    <div id="circuit-viz" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;"><span style="color:var(--text-muted); font-size:0.9rem">Run circuit to see diagram</span></div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom: 20px;">
                    <div class="sim-block" style="padding: 12px; background: rgba(255,255,255,0.02); border-radius:12px">
                        <div class="sim-label" style="font-size: 0.75rem; margin-bottom: 6px;">Statevector</div>
                        <div id="statevector-display" style="font-family:monospace; color:var(--accent); font-size:0.85rem; line-height:1.4">—</div>
                    </div>
                    <div class="sim-block" style="padding: 12px; background: rgba(255,255,255,0.02); border-radius:12px">
                        <div class="sim-label" style="font-size: 0.75rem; margin-bottom: 6px;">Probabilities</div>
                        <div style="margin-bottom:10px">
                            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px"><span>|0...0⟩</span><span id="prob-0">0%</span></div>
                            <div class="prob-bar" style="height: 8px;"><div id="bar-0" class="prob-fill"></div></div>
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px"><span>Others</span><span id="prob-1">0%</span></div>
                            <div class="prob-bar" style="height: 8px;"><div id="bar-1" class="prob-fill"></div></div>
                        </div>
                    </div>
                </div>
                <div style="margin-top:auto; display:flex; justify-content:space-between; gap:12px">
                    <button class="btn btn-outline" style="padding: 12px 24px; font-size: 0.9rem; flex:1; border-radius:12px; border:1px solid var(--glass-border); color:var(--text-muted)" onclick="prevStep()">← PREVIOUS TASK</button>
                    <button class="btn btn-primary" style="padding: 12px 24px; font-size: 0.9rem; flex:1; border-radius:12px" onclick="nextStep()">NEXT TASK →</button>
                </div>
            </div>

            <!-- COLUMN 3: Explanation & Logic -->
            <div class="result-box" style="display:flex; flex-direction:column; padding: 1.5rem; background: rgba(15, 23, 42, 0.4); border: 1px solid rgba(255,255,255,0.08); min-height: 320px;">
                <h3 style="margin:0 0 15px 0; color:var(--secondary); font-size:0.95rem; font-family:var(--font-heading); text-transform:uppercase; letter-spacing:1px">Explanation & Logic</h3>
                <div id="diagram-explain" style="font-size:0.9rem; color:#cbd5e1; line-height:1.6; padding:12px; background:rgba(255,255,255,0.03); border-radius:10px; margin-bottom:20px; border-left:4px solid var(--primary);">🔍 Run the simulator to see the explanation.</div>
                <div style="font-size: 0.7rem; color: var(--primary); text-transform: uppercase; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.5px;">Quantum Logic</div>
                <div id="quantum-logic-ref" style="font-size:0.9rem; color:#fff; margin-bottom:15px; padding:0 5px;">
                    ${step.quantumLogic || 'VQE & Error Correction'}
                </div>
                <div style="font-size: 0.7rem; color: var(--primary); text-transform: uppercase; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.5px;">Package Reference</div>
                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.6; padding:12px; background:rgba(0,0,0,0.3); border-radius:10px; border: 1px solid rgba(255,255,255,0.05);">
                    <code id="package-ref-code" style="color:var(--accent); display:block; white-space: pre-wrap; font-family: monospace; font-size: 0.8rem;">${step.packageRef || 'from qiskit import QuantumCircuit'}</code>
                </div>
            </div>
        </div>
    `;
}

function toggleReference() { const el = document.getElementById('ref-content'); el.style.display = el.style.display === 'none' ? 'block' : 'none'; }
function viewAnswer() { const step = STEPS[currentStepIdx]; const input = document.getElementById('user-input'); input.value = step.correctAnswer; checkAnswer(); }
// ─── Local Emulator Fallback (No Backend Required) ───
const LocalEmulator = {
    simulate(gates, num_qubits = 1) {
        let size = Math.pow(2, num_qubits);
        let state = new Array(size).fill(0).map(() => ({ re: 0, im: 0 }));
        state[0].re = 1; // Default |0...0>

        gates.forEach(g => {
            const name = (typeof g === 'string' ? g : g.name).toUpperCase();
            const targets = typeof g === 'string' ? [0] : g.targets;

            if (name === 'X') {
                targets.forEach(t => {
                    let newState = JSON.parse(JSON.stringify(state));
                    for (let i = 0; i < size; i++) {
                        if ((i >> t) & 1) { // bit t is 1
                            let pair = i ^ (1 << t);
                            newState[pair] = state[i];
                            newState[i] = state[pair];
                        }
                    }
                    state = newState;
                });
            } else if (name === 'H') {
                targets.forEach(t => {
                    const invSqrt2 = 1 / Math.sqrt(2);
                    let newState = new Array(size).fill(0).map(() => ({ re: 0, im: 0 }));
                    for (let i = 0; i < size; i++) {
                        let bit = (i >> t) & 1;
                        let pair = i ^ (1 << t);
                        if (bit === 0) {
                            newState[i].re += state[i].re * invSqrt2 + state[pair].re * invSqrt2;
                            newState[i].im += state[i].im * invSqrt2 + state[pair].im * invSqrt2;
                            newState[pair].re += state[i].re * invSqrt2 - state[pair].re * invSqrt2;
                            newState[pair].im += state[i].im * invSqrt2 - state[pair].im * invSqrt2;
                        }
                    }
                    state = newState;
                });
            } else if (name === 'Z') {
                targets.forEach(t => {
                    for (let i = 0; i < size; i++) {
                        if ((i >> t) & 1) {
                            state[i].re *= -1;
                            state[i].im *= -1;
                        }
                    }
                });
            } else if (name === 'CX') {
                const ctrl = targets[0];
                const target = targets[1];
                let newState = JSON.parse(JSON.stringify(state));
                for (let i = 0; i < size; i++) {
                    if ((i >> ctrl) & 1) {
                        let pair = i ^ (1 << target);
                        newState[pair] = state[i];
                    } else {
                        newState[i] = state[i];
                    }
                }
                state = newState;
            }
        });

        let sv_strings = state.map(v => `${v.re.toFixed(3)} + ${v.im.toFixed(3)}j`);
        let probs = {};
        state.forEach((v, i) => {
            let p = v.re * v.re + v.im * v.im;
            if (p > 0.001) probs[i.toString(2).padStart(num_qubits, '0')] = p;
        });

        return {
            statevector: sv_strings,
            probabilities: probs,
            diagram: this.generateDiagram(gates, num_qubits)
        };
    },
    generateDiagram(gates, num_qubits) {
        let svg = `<svg viewBox="0 0 ${gates.length * 60 + 100} ${num_qubits * 50 + 50}" xmlns="http://www.w3.org/2000/svg" style="background:transparent">`;
        for (let i = 0; i < num_qubits; i++) {
            svg += `<line x1="20" y1="${40 + i * 50}" x2="${gates.length * 60 + 80}" y2="${40 + i * 50}" stroke="var(--text-muted)" stroke-width="2" />`;
            svg += `<text x="5" y="${45 + i * 50}" fill="var(--text-muted)" font-size="12" font-family="monospace">q${i}</text>`;
        }
        gates.forEach((g, idx) => {
            const name = (typeof g === 'string' ? g : g.name).toUpperCase();
            const targets = typeof g === 'string' ? [0] : g.targets;
            const x = 50 + idx * 60;
            if (name === 'X' || name === 'H' || name === 'Z') {
                targets.forEach(t => {
                    const y = 40 + t * 50;
                    svg += `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" rx="4" fill="var(--panel-bg)" stroke="var(--primary)" stroke-width="2" />`;
                    svg += `<text x="${x}" y="${y + 5}" fill="var(--primary)" font-size="14" font-weight="900" text-anchor="middle" font-family="sans-serif">${name}</text>`;
                });
            } else if (name === 'CX') {
                const cy = 40 + targets[0] * 50;
                const ty = 40 + targets[1] * 50;
                svg += `<circle cx="${x}" cy="${cy}" r="4" fill="var(--primary)" />`;
                svg += `<line x1="${x}" y1="${cy}" x2="${x}" y2="${ty}" stroke="var(--primary)" stroke-width="2" />`;
                svg += `<circle cx="${x}" cy="${ty}" r="10" fill="transparent" stroke="var(--primary)" stroke-width="2" />`;
                svg += `<line x1="${x - 6}" y1="${ty}" x2="${x + 6}" y2="${ty}" stroke="var(--primary)" stroke-width="2" />`;
                svg += `<line x1="${x}" y1="${ty - 6}" x2="${x}" y2="${ty + 6}" stroke="var(--primary)" stroke-width="2" />`;
            }
        });
        svg += '</svg>';
        return svg;
    }
};

function checkAnswer() {
    const step = STEPS[currentStepIdx]; const input = document.getElementById('user-input').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback-msg'); const isCorrect = step.answerValues.some(v => input.includes(v.toLowerCase()));
    if (isCorrect) { feedback.className = "feedback correct"; feedback.innerHTML = `<strong>Correct!</strong><br>${step.explanation}`; document.getElementById('run-sim-btn').disabled = false; }
    else { feedback.className = "feedback wrong"; feedback.innerHTML = "Try again!"; }
}

async function runSimulator() {
    const step = STEPS[currentStepIdx];
    const gates = step.simulatorCode;
    const num_qubits = step.num_qubits || 1;
    const num_bits = step.num_bits || 1;
    const svDisplay = document.getElementById('statevector-display');
    svDisplay.innerHTML = "Calculating...";

    const applyResults = (data) => {
        const viz = document.getElementById('circuit-viz');
        if (data.diagram) {
            viz.innerHTML = data.diagram;
            const svg = viz.querySelector('svg');
            if (svg) {
                svg.removeAttribute('width'); svg.removeAttribute('height');
                svg.style.maxWidth = '100%'; svg.style.maxHeight = '100%'; svg.style.display = 'block';
            }
        }
        document.getElementById('diagram-explain').innerHTML = step.diagramExplain;
        svDisplay.innerHTML = data.statevector.map((v, i) => {
            const label = i.toString(2).padStart(num_qubits, '0');
            return `|${label}⟩: ${v}`;
        }).join('<br>');

        const bitstring0 = "0".repeat(num_qubits);
        const p0 = data.probabilities[bitstring0] || 0;
        updateBar('prob-0', 'bar-0', p0);
        updateBar('prob-1', 'bar-1', 1 - p0);
    };

    try {
        const res = await fetch('http://localhost:5000/api/week1/simulate', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gates, num_qubits, num_bits })
        });
        if (!res.ok) throw new Error("Backend offline");
        const data = await res.json();
        applyResults(data);
    } catch (e) {
        console.warn("Simulator Backend offline, switching to Local Mode.", e);
        const data = LocalEmulator.simulate(gates, num_qubits);
        applyResults(data);
        svDisplay.innerHTML += `<div style="margin-top:8px; font-size:0.65rem; color:var(--text-muted); border-top:1px solid rgba(255,255,255,0.05); padding-top:4px">⚠️ Local Mode (Backend unreachable)</div>`;
    }
}

function updateBar(textId, barId, val) {
    const t = document.getElementById(textId); const b = document.getElementById(barId);
    if (t) t.innerText = Math.round(val * 100) + "%"; if (b) b.style.width = (val * 100) + "%";
}
function nextStep() { if (currentStepIdx < STEPS.length - 1) { currentStepIdx++; renderStep(currentStepIdx); } }
function prevStep() { if (currentStepIdx > 0) { currentStepIdx--; renderStep(currentStepIdx); } }
renderStep(0);

// Global exposure for HTML onclick handlers
window.nextStep = nextStep;
window.prevStep = prevStep;
window.checkAnswer = checkAnswer;
window.viewAnswer = viewAnswer;
window.runSimulator = runSimulator;
window.toggleReference = toggleReference;

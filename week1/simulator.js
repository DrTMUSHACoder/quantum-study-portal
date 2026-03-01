const STEPS = [
    {
        id: 0,
        title: "Welcome",
        content: `
            <div style="text-align:center; padding:2rem 0;">
                <p style="font-size:1.1rem; color:var(--text-muted)">Welcome to Week 1 Quantum Simulator</p>
                <div style="text-align:left; display:inline-block; border-left:2px solid var(--primary); padding-left:1rem; margin:2rem 0;">
                    <div style="font-weight:600; margin-bottom:0.8rem; color:var(--text-main)">You will learn:</div>
                    <ul style="margin:0; padding-left:1rem; color:var(--text-muted); list-style-type:circle; line-height:1.8">
                        <li>What is a qubit (Initialization)</li>
                        <li>X gate (Bit Flip)</li>
                        <li>Hadamard gate (Superposition)</li>
                        <li>Measurement</li>
                    </ul>
                </div>
                <div style="margin-top:2rem">
                    <button class="btn btn-primary" onclick="nextStep()" style="flex:0; width:180px; padding: 10px 16px; font-size: 0.85rem;">Start Learning →</button>
                    <div style="margin-top:1rem; font-size:0.9rem"><a href="../" style="color:#64748b">Exit to Dashboard</a></div>
                </div>
            </div>
        `
    },
    {
        id: 1,
        title: "Task No 1: Learn Qubit Initialization",
        reference: "<strong>Key Concept:</strong><br>In quantum computing (Qiskit), all qubits are initialized to the <b>Ground State |0⟩</b> by default. This is analogous to setting a bit to 0 at the start of a program.",
        question: "A qubit is initially in which state?<br><br>A) |0⟩ &nbsp; B) |1⟩ &nbsp; C) Both &nbsp; D) None",
        answerValues: ["a", "|0>", "|0⟩", "0"],
        correctAnswer: "|0⟩",
        explanation: "Correct Answer: A) |0⟩<br>By default, qubit starts in |0⟩ state.",
        simulatorCode: ["INIT"],
        diagramExplain: "📖 <b>q</b> = Qubit (your quantum bit, like a coin). It starts in state |0⟩ (heads up).<br><b>c</b> = Classical bit (where the result is stored after measurement).<br>The <b>line</b> after q shows no gate is applied — just initialization.",
        quantumLogic: "Ground State Initialization",
        packageRef: "qc = QuantumCircuit(1)\n# Initial state is |0⟩"
    },
    {
        id: 2,
        title: "Task No 2: Learn X Gate (Bit Flip)",
        reference: "<strong>Key Concept:</strong><br>The <b>Pauli-X Gate</b> is the quantum NOT gate. It flips:<br>• |0⟩ → |1⟩<br>• |1⟩ → |0⟩",
        question: "Apply X gate to |0⟩. What is the output state?",
        answerValues: ["|1>", "|1⟩", "1", "one"],
        correctAnswer: "|1⟩",
        explanation: "Correct ✓<br>|0⟩ → |1⟩. X gate flips the qubit.",
        simulatorCode: ["X"],
        diagramExplain: "📖 <b>q</b> = Qubit line. <b>c</b> = Classical bit line.<br>The <b style='color:var(--accent)'>X</b> box on the q line = <b>X Gate</b> (like flipping a coin from heads to tails).<br>It changes |0⟩ → |1⟩.",
        quantumLogic: "Pauli-X (NOT) Operation",
        packageRef: "qc.x(0)\n# Flip qubit at index 0"
    },
    {
        id: 3,
        title: "Task No 3: Hadamard Gate (Superposition)",
        reference: "<strong>Key Concept:</strong><br>The <b>Hadamard (H) Gate</b> creates <b>Superposition</b>. Applied to |0⟩, the qubit has equal (50%) probability of being 0 or 1.",
        question: "Apply Hadamard gate to |0⟩. What is probability of |1⟩?",
        answerValues: ["50%", "0.5", "1/2", "half", "50"],
        correctAnswer: "50%",
        explanation: "Correct ✓<br>Probability of |1⟩ = 50%. Hadamard creates superposition.",
        simulatorCode: ["H"],
        diagramExplain: "📖 <b>q</b> = Qubit line. <b>c</b> = Classical bit line.<br>The <b style='color:var(--accent)'>H</b> box on the q line = <b>Hadamard Gate</b>.<br>Think of it as spinning a coin in the air — it's both heads AND tails (50/50) until you look at it!",
        quantumLogic: "Hadamard (Superposition) Gate",
        packageRef: "qc.h(0)\n# Put qubit 0 into superposition"
    },
    {
        id: 4,
        title: "Task No 4: Measurement",
        reference: "<strong>Key Concept:</strong><br><b>Measurement</b> is destructive. It forces the qubit to 'collapse' from superposition into a definite state (|0⟩ or |1⟩).",
        question: "What happens after measurement of a superposition?",
        answerValues: ["collapse", "collapses", "0 or 1", "definite", "outcome"],
        correctAnswer: "collapse",
        explanation: "Correct.<br>Measurement collapses the qubit to |0⟩ or |1⟩.",
        simulatorCode: ["H", "MEASURE"],
        diagramExplain: "📖 <b>q</b> = Qubit line. <b>c</b> = Classical bit line.<br>The <b style='color:var(--accent)'>H</b> box = Hadamard (creates superposition).<br>The <b style='color:var(--accent)'>meter icon ⊳</b> = <b>Measurement</b> — like catching the spinning coin. The arrow from q to c means the result is sent to the classical bit.<br>After measurement, the coin lands — either 0 or 1!",
        quantumLogic: "Observation & Collapse",
        packageRef: "qc.measure(0, 0)\n# Measure qubit 0 to bit 0"
    },
    {
        id: 5,
        title: "Task No 5: Double Bit Flip (Inverse)",
        reference: "<strong>Key Concept:</strong><br>Applying the X (NOT) gate twice returns the qubit to its original state. It is its own inverse!",
        question: "If you apply X gate twice to |0⟩, what is the final state?",
        answerValues: ["|0>", "|0⟩", "0", "zero"],
        correctAnswer: "|0⟩",
        explanation: "Correct ✓<br>X then X = No change. |0⟩ → |1⟩ → |0⟩.",
        simulatorCode: ["X", "X"],
        diagramExplain: "📖 Two <b style='color:var(--accent)'>X</b> boxes. First flip makes it |1⟩, second flip brings it back to |0⟩.",
        quantumLogic: "Self-Inverting Gates (X² = I)",
        packageRef: "qc.x(0)\nqc.x(0)\n# Double flip"
    },
    {
        id: 6,
        title: "Task No 6: Superposition from |1⟩",
        reference: "<strong>Key Concept:</strong><br>The H gate creates superposition regardless of the starting state. |1⟩ also becomes a 50/50 mix.",
        question: "Apply X then H. What is the probability of the |1⟩ state?",
        answerValues: ["50%", "0.5", "50"],
        correctAnswer: "50%",
        explanation: "Correct ✓<br>H gate always creates a 50/50 split on a single qubit.",
        simulatorCode: ["X", "H"],
        diagramExplain: "📖 <b style='color:var(--accent)'>X</b> flips it to |1⟩, then <b style='color:var(--accent)'>H</b> puts it in superposition.",
        quantumLogic: "State Transformation",
        packageRef: "qc.x(0)\nqc.h(0)\n# |0⟩ -> |1⟩ -> |+⟩"
    },
    {
        id: 7,
        title: "Task No 7: Hadamard is its own Inverse",
        reference: "<strong>Key Concept:</strong><br>Like the X gate, applying H twice returns the state to normal. H(H|0⟩) = |0⟩.",
        question: "Apply H twice to |0⟩. What is the final state?",
        answerValues: ["|0>", "|0⟩", "0"],
        correctAnswer: "|0⟩",
        explanation: "Correct ✓<br>H then H cancels out. Quantum gates are often reversible!",
        simulatorCode: ["H", "H"],
        diagramExplain: "📖 Two <b style='color:var(--accent)'>H</b> boxes. The first creates superposition, the second reverses it back to |0⟩.",
        quantumLogic: "Quantum Reversibility (H² = I)",
        packageRef: "qc.h(0)\nqc.h(0)\n# Superposition and Back"
    },
    {
        id: 8,
        title: "Task No 8: Measuring after Bit Flip",
        reference: "<strong>Key Concept:</strong><br>If you measure a qubit that is definitely in state |1⟩, you will get '1' every time.",
        question: "Apply X then Measure. What outcome will you see in 'c' (Classical bit)?",
        answerValues: ["1", "|1>", "|1⟩"],
        correctAnswer: "1",
        explanation: "Correct ✓<br>X flips it to |1⟩, and measurement confirms it.",
        simulatorCode: ["X", "MEASURE"],
        diagramExplain: "📖 <b style='color:var(--accent)'>X</b> flips the qubit, and the <b>meter</b> reads the final state."
    },
    {
        id: 9,
        title: "Task No 9: The Identity Gate (I)",
        reference: "<strong>Key Concept:</strong><br>The <b>Identity (I) Gate</b> is a gate that does nothing. It is used in quantum circuits as a placeholder or time-delay.",
        question: "Which gate acts as a 'no-operation' and keeps the state same?",
        answerValues: ["identity", "i", "i gate"],
        correctAnswer: "Identity",
        explanation: "Correct ✓<br>The I gate is the mathematical identity: I|ψ⟩ = |ψ⟩.",
        simulatorCode: ["I"],
        diagramExplain: "📖 The qubit state remains unchanged."
    },
    {
        id: 10,
        title: "Task No 10: Phase Flip (Z Gate)",
        reference: "<strong>Key Concept:</strong><br>The <b>Pauli-Z Gate</b> flips the phase of the |1⟩ component. It does not change the probability of |0⟩ if applied to |0⟩.",
        question: "Apply Z to |0⟩. Does the probability of |0⟩ change from 100%?",
        answerValues: ["no", "never", "0", "false"],
        correctAnswer: "No",
        explanation: "Correct ✓<br>Z|0⟩ = |0⟩. It only affects the 'phase' of the |1⟩ state.",
        simulatorCode: ["Z"],
        diagramExplain: "📖 The <b style='color:var(--accent)'>Z</b> box flips the phase. Since we are in |0⟩, nothing visible changes in the probabilities."
    },
    {
        id: 11,
        title: "Task No 11: Final Practice",
        content: `
            <h2 style="font-size:1.1rem; color:var(--text-main); text-align:center; margin-bottom:0.8rem">🎉 Task No 11: Final Practice Circuit</h2>
            
            <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:16px; align-items:start;">
                
                <!-- LEFT: Steps + Run -->
                <div class="question-box">
                    <div style="font-size:0.9rem; margin-bottom:0.8rem; color:var(--text-muted); line-height:1.8">
                        <div>✅ Step 1: Initialize |0⟩</div>
                        <div>✅ Step 2: Apply Hadamard</div>
                        <div>✅ Step 3: Measure</div>
                    </div>
                    <button class="btn btn-primary" onclick="runSimulator(['H','MEASURE'])" style="width:100%">Run Circuit ▶</button>
                    
                    <div style="margin-top:1rem; padding-top:0.8rem; border-top:1px solid var(--glass-border); text-align:center">
                        <p style="color:#4ade80; font-size:0.85rem; margin:0 0 8px 0">🏆 You completed Week 1 Simulator!</p>
                        <a href="../" class="btn btn-secondary" style="text-decoration:none; display:inline-block; width:140px; text-align:center; padding:8px">Finish & Exit</a>
                    </div>
                </div>

                <!-- RIGHT: Output -->
                <div class="result-box" style="display:block;">
                    <h3 style="margin:0 0 8px 0; color:var(--primary); font-size:0.9rem">Simulation Output</h3>
                    <div style="background:var(--card-hover); border-radius:6px; height:120px; display:flex; align-items:center; justify-content:center; overflow:hidden; margin-bottom:10px">
                        <div id="circuit-viz" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
                            <span style="color:#64748b; font-size:0.8rem">Run circuit to see diagram</span>
                        </div>
                    </div>
                    <div id="diagram-explain" style="font-size:0.75rem; color:var(--text-muted); line-height:1.4; padding:5px 8px; background:var(--card-hover); border-radius:4px; margin-bottom:8px; border-left:2px solid var(--primary);">
                        📖 Run the circuit to see the diagram explained.
                    </div>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px">
                        <div class="sim-block" style="padding:8px">
                            <div class="sim-label">State |0⟩</div>
                            <div style="font-size:1.1rem; font-weight:bold" id="prob-0">0%</div>
                            <div class="prob-bar"><div id="bar-0" class="prob-fill"></div></div>
                        </div>
                        <div class="sim-block" style="padding:8px">
                            <div class="sim-label">State |1⟩</div>
                            <div style="font-size:1.1rem; font-weight:bold" id="prob-1">0%</div>
                            <div class="prob-bar"><div id="bar-1" class="prob-fill"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
];

let currentStepIdx = 0;

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

// ─── Render Step ───
function renderStep(idx) {
    const step = STEPS[idx];
    const container = document.getElementById('content-area');
    currentStepIdx = idx; // Update current index when rendering

    const counter = document.getElementById('task-counter');
    if (counter) {
        if (idx === 0) {
            counter.style.display = 'none';
        } else {
            counter.style.display = 'block';
            counter.innerText = `Task ${idx} / ${STEPS.length - 1}`;
        }
    }

    if (step.content) {
        container.innerHTML = step.content;
        return;
    }

    container.innerHTML = `
        <h2 style="color:var(--text-muted); font-family:var(--font-heading); font-weight:400; font-size:1.1rem; margin-bottom:1rem; text-align:center">${step.title}</h2>
        <div class="sim-grid" style="display:grid; grid-template-columns:0.9fr 1fr 0.9fr; gap:24px; align-items:start;">

            <!-- COLUMN 1: Question -->
            <div class="question-box" style="display:flex; flex-direction:column; padding: 1.5rem; position: relative; min-height: 320px;">
                <button class="btn" onclick="viewAnswer()" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--primary); cursor: pointer; font-size: 0.75rem; padding: 0; white-space: nowrap; display: flex; align-items: center; gap: 6px; font-weight: 600; z-index: 10;" title="View Answer">
                    <span>👁️</span> <span style="text-decoration: underline; text-underline-offset: 4px;">View Answer</span>
                </button>
                <div style="margin-bottom:1.25rem; padding-right: 100px;">
                    <div class="question-text" style="font-size: 1.05rem; line-height: 1.6; color:var(--text-main)">${step.question}</div>
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
                    <div id="ref-content" style="display:none; margin-top:12px; background:var(--panel-bg); border:1px solid var(--glass-border); padding:12px; border-radius:10px; font-size:0.95rem; color:var(--text-muted); line-height:1.6;">
                        ${step.reference}
                    </div>
                </div>
                <div id="feedback-msg" class="feedback" style="margin-top:auto; padding: 10px 14px; font-size:1rem; border-radius:10px"></div>
            </div>

            <!-- COLUMN 2: Simulator Output -->
            <div class="result-box" style="display:flex; flex-direction:column; padding: 1.5rem; min-height: 320px;">
                <h3 style="margin:0 0 12px 0; color:var(--primary); font-size:0.95rem; font-family:var(--font-heading); text-transform:uppercase; letter-spacing:1px">Simulator Visualization</h3>
                <div style="background:rgba(0,0,0,0.25); border-radius:12px; height:140px; display:flex; align-items:center; justify-content:center; overflow:hidden; margin-bottom:15px; border: 1px solid var(--glass-border);">
                    <div id="circuit-viz" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
                        <span style="color:var(--text-muted); font-size:0.9rem">Run circuit to see diagram</span>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom: 20px;">
                    <div class="sim-block" style="padding: 12px; background: rgba(255,255,255,0.02); border-radius:12px">
                        <div class="sim-label" style="font-size: 0.75rem; margin-bottom: 6px;">Statevector</div>
                        <div id="statevector-display" style="font-family:monospace; color:var(--accent); font-size:0.85rem; line-height:1.4">—</div>
                    </div>
                    <div class="sim-block" style="padding: 12px; background: rgba(255,255,255,0.02); border-radius:12px">
                        <div class="sim-label" style="font-size: 0.75rem; margin-bottom: 6px;">Probabilities</div>
                        <div style="margin-bottom:10px">
                            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px"><span>|0⟩</span><span id="prob-0">0%</span></div>
                            <div class="prob-bar" style="height: 8px;"><div id="bar-0" class="prob-fill"></div></div>
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px"><span>|1⟩</span><span id="prob-1">0%</span></div>
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
            <div class="result-box" style="display:flex; flex-direction:column; padding: 1.75rem; background: var(--panel-bg); border: 1px solid var(--glass-border); border-radius: 20px; min-height: 320px;">
                <h3 style="margin:0 0 20px 0; color:var(--secondary); font-size:1rem; font-family:var(--font-heading); text-transform:uppercase; letter-spacing:1px">Explanation & Logic</h3>
                <div id="diagram-explain" style="font-size:1rem; color:var(--text-muted); line-height:1.7; padding:15px; background:var(--card-hover); border-radius:12px; margin-bottom:25px; border-left:5px solid var(--primary);">
                    🔍 Run the simulator to see the explanation.
                </div>
                <div style="font-size: 0.75rem; color: var(--primary); text-transform: uppercase; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.5px;">Quantum Logic</div>
                <div id="quantum-logic-ref" style="font-size:0.9rem; color:var(--text-main); margin-bottom:15px; padding:0 5px;">
                    ${step.quantumLogic || 'Qiskit Implementation'}
                </div>
                <div style="font-size: 0.75rem; color: var(--primary); text-transform: uppercase; font-weight: 700; margin-bottom: 12px; letter-spacing: 0.5px;">Package Reference</div>
                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.7; padding:12px; background:var(--card-hover); border-radius:12px; border: 1px solid var(--glass-border-bright);">
                    <code id="package-ref-code" style="color:var(--accent); display:block; white-space: pre-wrap; font-family: monospace; font-size: 0.85rem;">${step.packageRef || 'from qiskit import QuantumCircuit'}</code>
                </div>
            </div>
    </div>
    `;
}

// ─── Toggle Reference ───
function toggleReference() {
    const el = document.getElementById('ref-content');
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// ─── View Answer ───
function viewAnswer() {
    const step = STEPS[currentStepIdx];
    const input = document.getElementById('user-input');
    input.value = step.correctAnswer;
    // Auto-trigger check so it unlocks Run Simulator
    checkAnswer();
}

// ─── Check Answer ───
function checkAnswer() {
    const step = STEPS[currentStepIdx];
    const input = document.getElementById('user-input').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback-msg');
    const isCorrect = step.answerValues.some(v => input.includes(v.toLowerCase()));

    if (isCorrect) {
        feedback.className = "feedback correct";
        feedback.innerHTML = `<strong>Correct!</strong><br>${step.explanation}`;
        const simBtn = document.getElementById('run-sim-btn');
        simBtn.disabled = false;
        simBtn.style.opacity = "1";
        simBtn.innerHTML = "Run Simulator ▶";
    } else {
        feedback.className = "feedback wrong";
        feedback.innerHTML = "Try again! Click <b>? Hint</b> for reference.";
    }
}

// ─── Run Simulator ───
async function runSimulator(customGates = null) {
    const step = STEPS[currentStepIdx];
    const gates = customGates || step.simulatorCode;
    const num_qubits = step.num_qubits || 1;
    const num_bits = step.num_bits || 1;

    const svDisplay = document.getElementById('statevector-display');
    if (svDisplay) svDisplay.innerHTML = "Calculating...";

    const applyResults = (data) => {
        const vizDisplay = document.getElementById('circuit-viz');
        if (data.diagram && vizDisplay) {
            vizDisplay.innerHTML = data.diagram;
            const svg = vizDisplay.querySelector('svg');
            if (svg) {
                svg.removeAttribute('width'); svg.removeAttribute('height');
                svg.style.maxWidth = '100%'; svg.style.maxHeight = '100%';
                svg.style.width = 'auto'; svg.style.height = 'auto'; svg.style.display = 'block';
            }
        }
        const explainEl = document.getElementById('diagram-explain');
        if (explainEl && step.diagramExplain) {
            explainEl.innerHTML = step.diagramExplain;
        }
        if (data.statevector && svDisplay) {
            svDisplay.innerHTML = data.statevector.map((v, i) => {
                const label = i.toString(2).padStart(num_qubits, '0');
                return `|${label}⟩: ${v}`;
            }).join('<br>');
        }
        const bitstring0 = "0".repeat(num_qubits);
        const p0 = data.probabilities[bitstring0] || 0;
        updateBar('prob-0', 'bar-0', p0);
        updateBar('prob-1', 'bar-1', 1 - p0);
    };

    try {
        const res = await fetch('http://localhost:5000/api/week1/simulate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gates: gates, num_qubits, num_bits })
        });
        if (!res.ok) throw new Error("Backend offline");
        const data = await res.json();
        applyResults(data);
    } catch (e) {
        console.warn("Simulator Backend offline, switching to Local Mode.", e);
        const data = LocalEmulator.simulate(gates, num_qubits);
        applyResults(data);
        if (svDisplay) svDisplay.innerHTML += `<div style="margin-top:8px; font-size:0.65rem; color:var(--text-muted); border-top:1px solid rgba(255,255,255,0.05); padding-top:4px">⚠️ Local Mode (Backend unreachable)</div>`;
    }
}

function updateBar(textId, barId, val) {
    const t = document.getElementById(textId);
    const b = document.getElementById(barId);
    if (t) t.innerText = Math.round(val * 100) + "%";
    if (b) b.style.width = (val * 100) + "%";
}

function nextStep() {
    if (currentStepIdx < STEPS.length - 1) {
        currentStepIdx++;
        renderStep(currentStepIdx);
    }
}

function prevStep() {
    if (currentStepIdx > 0) {
        currentStepIdx--;
        renderStep(currentStepIdx);
    }
}

// Init
renderStep(0);

// Global exposure for HTML onclick handlers
window.nextStep = nextStep;
window.prevStep = prevStep;
window.checkAnswer = checkAnswer;
window.viewAnswer = viewAnswer;
window.runSimulator = runSimulator;
window.toggleReference = toggleReference;

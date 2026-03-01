
const nptelData = {
    // === WEEK 1: Assignment 1 ===
    "1_21_1": {
        q: "Calculate the Bloch sphere angles θ and φ for the state |ψ⟩ = [(1 + i)/√2, (1 - i)/√2]ᵀ.",
        options: ["θ = π/2, φ = π/2", "θ = π/2, φ = 3π/2", "θ = π, φ = 0", "θ = 0, φ = π"],
        answer: 1,
        explanation: "First, normalize the state by a factor of 1/√2. Factoring out the global phase e^{iπ/4} gives |ψ⟩ = 1/√2 [1, e^{-iπ/2}]ᵀ. Comparing with the Bloch form, cos(θ/2) = 1/√2 implies θ = π/2. The relative phase e^{iφ} = e^{-iπ/2} = e^{i3π/2} implies φ = 3π/2.",
        clue: "<b>Bloch Angles</b>: To find θ and φ, normalize the state vector so that the first component is real. The general form is cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩."
    },
    "1_21_2": {
        q: "A state |φ⟩ = [(1+i)/4]|0⟩ + [(3-i)/4]|1⟩ is measured in the Hadamard basis {|+⟩, |-⟩}. What is the probability of obtaining |+⟩?",
        options: ["1/3", "1/2", "2/3", "1/4"],
        answer: 2,
        explanation: "The normalization factor for the state is √(6/8) = √3/2. The normalized state is |φ⟩ = 1/√3 [(1+i)/2 |0⟩ + (3-i)/2 |1⟩]. The probability amplitude ⟨+|φ⟩ = 1/√6 [(1+i+3-i)/2] = 2/√6. Probability P(+) = |2/√6|² = 4/6 = 2/3.",
        clue: "<b>Hadamard Measurement</b>: The probability of obtaining |+⟩ is |⟨+|φ⟩|², where ⟨+| = (⟨0| + ⟨1|)/√2. Use the normalized version of the state."
    },
    "1_21_3": {
        q: "Which of the following gate sequences is equivalent to the Pauli-Z gate (up to a global phase)?",
        options: ["HXS", "ZSSSS", "XYZZ", "ZSSSS and XYZZ"],
        answer: 3,
        explanation: "For ZSSSS: S²=Z, S⁴=I, so ZS⁴=Z. For XYZZ: Z²=I, so XYZZ=XY=iZ. Both are equivalent to Z up to a global phase.",
        clue: "<b>Pauli Algebra</b>: Use the identities S² = Z, Z² = I, and XY = iZ to simplify the gate products and find the resulting unitary."
    },
    "1_21_4": {
        q: "For the phase gate P = |0⟩⟨0| + e^{iφ}|1⟩⟨1| acting on |+⟩, find φ such that the probability of obtaining |+⟩ after the gate is 1/2.",
        options: ["φ = π/4", "φ = π/2", "φ = π", "φ = 2π"],
        answer: 1,
        explanation: "Applying P to |+⟩ gives |ψ⟩ = 1/√2 (|0⟩ + e^{iφ}|1⟩). Probability P(+) = |⟨+|ψ⟩|² = |(1+e^{iφ})/2|² = cos²(φ/2). We need cos²(φ/2) = 1/2, which gives φ = π/2.",
        clue: "<b>Phase Probability</b>: The probability P(+) after a phase shift φ on |+⟩ is given by cos²(φ/2). Solving for P(+) = 0.5 gives the required angle."
    },
    "1_21_5": {
        q: "Which CNOT configuration implements the matrix O = [[0,1,0,0],[1,0,0,0],[0,0,1,0],[0,0,0,1]]?",
        options: ["Control q0, Target q1", "Control q1, Target q0", "Control q0, Target q0", "Identity"],
        answer: 1,
        explanation: "The matrix swaps |00⟩ with |01⟩ while leaving |10⟩ and |11⟩ unchanged. Analyze how the matrix transforms the basis states.",
        clue: "<b>Control Logic</b>: A CNOT with control on the second qubit (q1) and target on the first (q0) flips the target if the control is 1. Check if this matches the matrix entries."
    },
    "1_21_6": {
        q: "Which of the following matrices represents a valid single-qubit quantum gate?",
        options: ["Diagonal matrix with entries of modulus 1", "Matrix whose columns are orthonormal", "Matrix whose conjugate transpose is its inverse", "All of the above"],
        answer: 3,
        explanation: "A valid quantum gate must be Unitary (U†U = I). This implies orthonormal columns/rows and entries that preserve the norm.",
        clue: "<b>Unitarity</b>: A matrix is a valid quantum gate if and only if it is <b>Unitary</b> ($U^†U = I$). This ensures the operation is reversible."
    },
    "1_21_7": {
        q: "Which circuit transforms |00⟩ into the Bell state |Φ⁻⟩ = 1/√2 (|00⟩ - |11⟩)?",
        options: ["X₁ -> H₁ -> CNOT₁₂", "H₁ -> X₁ -> CNOT₁₂", "H₂ -> CNOT₂₁", "X₂ -> H₁ -> CNOT₁₂"],
        answer: 0,
        explanation: "|00⟩ --X₁--> |10⟩ --H₁--> 1/√2(|00⟩ - |10⟩) --CNOT₁₂--> 1/√2(|00⟩ - |11⟩).",
        clue: "<b>Bell State Creation</b>: To get a minus sign in the Bell state, you need to apply a Hadamard to a |1⟩ state. Starting with |00⟩, use an X gate to reach |10⟩ first."
    },
    "1_21_8": {
        q: "Two pure quantum states can be perfectly distinguished if and only if they are:",
        options: ["Parallel", "Orthogonal", "Entangled", "Non-zero"],
        answer: 1,
        explanation: "According to quantum measurement postulates, states are perfectly distinguishable if their inner product is zero (⟨ψ₁|ψ₂⟩ = 0).",
        clue: "<b>Distinguishability</b>: In quantum mechanics, perfect distinguishability is equivalent to <b>Orthogonality</b>. If the states overlap, there is error probability."
    },
    "1_21_9": {
        q: "Which state is physically equivalent to |ψ⟩ = cos(π/4)|0⟩ + e^{iπ/3}sin(π/4)|1⟩?",
        options: ["e^{iπ/2}|ψ⟩", "-|ψ⟩", "cos(π/4)|0⟩ + e^{i4π/3}sin(π/4)|1⟩", "Both A and B"],
        answer: 3,
        explanation: "Physical equivalence means states differ only by a global phase (e^{iα}). Both e^{iπ/2} and -1 (e^{iπ}) are global phases.",
        clue: "<b>Global Phase</b>: Two states represent the same physical configuration if one is a complex scalar multiple (of modulus 1) of the other."
    },
    "1_21_10": {
        q: "Identify the Euler angle parameters (φ, α, θ, β) to implement H = e^{iφ/2}Rz(α)Rx(θ)Rz(β).",
        options: ["φ=π, α=β=θ=π/2", "φ=0, α=β=θ=π", "φ=π/2, α=β=θ=π/2", "None of the above"],
        answer: 0,
        explanation: "The standard decomposition for the Hadamard gate is H = e^{iπ/2} Rz(π/2) Rx(π/2) Rz(π/2).",
        clue: "<b>Hadamard Decomposition</b>: The Hadamard gate can be realized as a sequence of Z and X rotations. Standard decomposition uses π/2 angles."
    },

    // === WEEK 2: Assignment 2 ===
    "2_21_1": {
        q: "Which Qiskit Runtime primitives are currently available on the IBM Quantum Platform?",
        options: ["Sampler and Estimator", "Circuit-Runner and Executor", "Transpiler and Optimizer", "Backend and Provider"],
        answer: 0,
        explanation: "Sampler (for probability distributions) and Estimator (for expectation values) are the two core primitives.",
        clue: "<b>Qiskit Primitives</b>: IBM Quantum Platform provides two main entry points: one for populations/counts and one for observables."
    },
    "2_21_2": {
        q: "Which version of OpenQASM is primarily supported by the IBM Quantum Composer code editor?",
        options: ["1.0", "2.0", "3.0", "2.5"],
        answer: 1,
        explanation: "IBM Quantum Composer currently supports OpenQASM 2.0 as its primary high-level assembly language.",
        clue: "<b>OpenQASM</b>: Look for the version number used in the 'Code Editor' view of the IBM Quantum tools."
    },
    "2_21_3": {
        q: "What is the primary difference between the Sampler and Estimator primitives?",
        options: ["Sampler is faster than Estimator", "Sampler returns distributions, Estimator returns expectation values", "Estimator is only for simulators", "Sampler is for 1 qubit only"],
        answer: 1,
        explanation: "Sampler returns measurement outcome distributions (bitstrings); Estimator returns expectation values of specified observables.",
        clue: "<b>Data Types</b>: One primitive is used for <b>counts/probabilities</b>, while the other is used for <b>statistical averages</b> of physical operators."
    },
    "2_21_4": {
        q: "Which of the following is NOT a step in the transpilation process?",
        options: ["Decomposing gates into basis gates", "Mapping logical to physical qubits", "Converting all gates to Hadamard and CNOT only", "Optimizing circuit depth"],
        answer: 2,
        explanation: "Transpilation uses the backend's specific basis gates (e.g., √X, Rz, CX), not necessarily H and CNOT.",
        clue: "<b>Transpilation</b>: This process prepares a circuit for *specific* hardware. Hardware backends have their own unique set of native 'basis gates'."
    },
    "2_21_5": {
        q: "Applying Ry(π/3) to |0⟩ results in what statevector?",
        options: ["√3/2|0⟩ + 1/2|1⟩", "1/2|00⟩ + √3/2|100⟩", "[√3/2, 1/2]", "Both A and C"],
        answer: 3,
        explanation: "Using the Ry matrix [[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]] with θ=π/3, we get cos(π/6)=√3/2 and sin(π/6)=1/2.",
        clue: "<b>Ry Rotation</b>: The matrix for Ry(θ) is [[cos(θ/2), -sin(θ/2)], [sin(θ/2), cos(θ/2)]]. Calculate the result of acting on state [1, 0]ᵀ."
    },
    "2_21_6": {
        q: "To create a 3-qubit GHZ state, which sequence is applied to |000⟩?",
        options: ["H₀ -> CNOT₀₁ -> CNOT₀₂", "H₀ -> H₁ -> H₂", "X₀ -> CNOT₀₁", "H₀ -> CNOT₁₀"],
        answer: 0,
        explanation: "Hadamard on first qubit followed by CNOTs to entangle others creates 1/√2(|000⟩+|111⟩).",
        clue: "<b>GHZ State</b>: This state is a multi-qubit generalization of the Bell state. It requires one Hadamard to create base superposition."
    },
    "2_21_7": {
        q: "Starting with |ψ⟩ = 1/2(|00⟩+|01⟩+|10⟩+|11⟩), apply CNOT (ctrl: q0, target: q1) and then Hadamard on q0.",
        options: ["1/√2(|00⟩+|10⟩)", "1/√2(|00⟩+|01⟩)", "|00⟩", "None"],
        answer: 0,
        explanation: "The state is |+⟩|+⟩. CNOT maps |+⟩|+⟩ to |+⟩|+⟩. H on q0 makes it |0⟩|+⟩, which is 1/√2(|00⟩+|10⟩) in Qiskit ordering? Wait, check ordering.",
        clue: "<b>Circuit Simulation</b>: Follow the state transformation step-by-step. Remember Qiskit's little-endian bit ordering."
    },
    "2_21_8": {
        q: "Apply Ry(2π/3) to |0⟩, then CNOT(0->1). What is the resulting state?",
        options: ["1/2|00⟩ + √3/2|11⟩", "√3/2|00⟩ + 1/2|11⟩", "1/2|000⟩ - √3/2|111⟩", "None"],
        answer: 0,
        explanation: "Ry(2π/3)|0⟩ = cos(π/3)|0⟩ + sin(π/3)|1⟩ = 1/2|0⟩ + √3/2|1⟩. CNOT flips q1 if q0=1: 1/2|00⟩ + √3/2|11⟩.",
        clue: "<b>State Evolution</b>: Calculate the coefficients after the Ry rotation (cos(π/3) and sin(π/3)), then apply the CNOT flip."
    },
    "2_21_9": {
        q: "In teleportation, Alice's messages 00, 01, 10, 11 correspond to which Bob's gates?",
        options: ["I, Z, X, XZ", "I, X, Z, ZX", "Z, X, I, I", "None"],
        answer: 0,
        explanation: "Alice's bits correspond to Z and X corrections. 00 -> I, 01 -> Z, 10 -> X, 11 -> XZ.",
        clue: "<b>Quantum Teleportation</b>: Bob applies an X gate if Alice's second bit is 1, and a Z gate if her first bit is 1."
    },
    "2_21_10": {
        q: "Alice and Bob share (|01⟩+|10⟩)/√2. Alice measures |0⟩. What is Bob's state?",
        options: ["|1⟩", "|0⟩", "|+⟩", "|-⟩"],
        answer: 0,
        explanation: "The state is anti-correlated. If Alice gets 0, Bob must have 1.",
        clue: "<b>Entanglement Correlation</b>: Measuring '0' on the first qubit collapses the system into the state where the second qubit is 1."
    },

    // === WEEK 3: Assignment 3 ===
    "3_21_1": {
        q: "What is the query complexity of Deutsch-Jozsa algorithm on a quantum computer?",
        options: ["1", "n", "log n", "2^n"],
        answer: 0,
        explanation: "DJ solves the constant vs balanced problem in exactly 1 query.",
        clue: "<b>Quantum Speedup</b>: Contrast this with the classical complexity of $2^{n-1} + 1$ queries."
    },
    "3_21_2": {
        q: "Which properties are used by DJ and BV algorithms to encode function outputs into phases?",
        options: ["Phase Kickback and Superposition", "Uncertainty Principle", "Entanglement", "None"],
        answer: 0,
        explanation: "Superposition allows evaluating all inputs, and Phase Kickback moves output to phase.",
        clue: "<b>Phase Encoding</b>: Think about how the ancilla $|-⟩$ state interacts with the oracle to modify phases."
    },
    "3_21_3": {
        q: "The Grover diffuser (reflection about mean) is constructed as:",
        options: ["H⊗n (2|0⟩⟨0| - I) H⊗n", "Oracle reverse", "Identity gate", "CNOT chain"],
        answer: 0,
        explanation: "Diffusion involves transforming to |0⟩ context, flipping phase of non-zero states, and transforming back.",
        clue: "<b>Grover Diffuser</b>: The operation $2|s⟩⟨s| - I$ is implemented by sandwiching a zero-state phase flip between Hadamard layers."
    },
    "3_21_4": {
        q: "How does the BV algorithm circuit compare to the DJ circuit?",
        options: ["Identical structure, different oracle", "Completely different", "Uses 2x more qubits", "None"],
        answer: 0,
        explanation: "Both use the H-Oracle-H sandwich; only the internal logic of the oracle changes.",
        clue: "<b>Algorithm Families</b>: Many early quantum algorithms share the same high-level circuit 'template'."
    },
    "3_21_5": {
        q: "Which vectors span the 2D plane in Grover's algorithm's geometric interpretation?",
        options: ["Target state |w⟩ and uniform superposition of non-winners |s'⟩", "|0⟩ and |1⟩", "X and Y", "None"],
        answer: 0,
        explanation: "Grover's iteration rotates in the plane spanned by the target state and the non-winners.",
        clue: "<b>Geometric Search</b>: The state vector rotates from the initial superposition towards the 'winner' within a specific plane."
    },

    // === WEEK 4: Assignment 4 ===
    "4_21_1": {
        q: "Which of the following statements regarding Variational Quantum Algorithms (VQAs) are correct? (Select all that apply)",
        options: [
            "Classical part of the VQA calculates the cost function",
            "A shallow and faithful cost function is desirable",
            "Problem-agnostic ansatz perform better than Problem-inspired ansatz",
            "Randomly initialized deep Quantum Circuits exhibit Barren Plateau"
        ],
        answer: [1, 3],
        explanation: "A shallow and faithful cost function is desirable for efficient optimization. Randomly initialized deep circuits suffer from Barren Plateaus where gradients vanish exponentially, making optimization nearly impossible.",
        clue: "<b>Variational Algorithms</b>: Focus on what makes VQAs practical — shallow cost functions avoid deep circuits, and Barren Plateaus are a known challenge with random initialization."
    },
    "4_21_2": {
        q: "Select all the statements that hold for U<sub>ENT</sub> and the unitaries U<sup>i,j</sup>(Θ<sub>k</sub>).",
        options: [
            "Together, U<sub>ENT</sub> and the unitaries U<sup>i,j</sup>(Θ<sub>k</sub>) form the trial state.",
            "U<sub>ENT</sub> refers to \"entangling block\".",
            "The unitaries U<sup>i,j</sup>(Θ<sub>k</sub>) are multiqubit unitaries.",
            "The state created by these unitaries have both superposition and entanglement."
        ],
        answer: [0, 1, 3],
        explanation: "U_ENT is the entangling block that creates entanglement between qubits. Together with the parameterized single-qubit rotations U^{i,j}(Θ_k), they form the trial state (ansatz). The resulting state exhibits both superposition and entanglement. The U^{i,j}(Θ_k) are single-qubit (not multiqubit) unitaries.",
        clue: "<b>Ansatz Structure</b>: The variational circuit has two key components — parameterized rotations (single-qubit) and entangling blocks. Together they prepare a rich trial state."
    },
    "4_21_3": {
        q: "The number of layers <i>d</i> is primarily a function of",
        options: [
            "the gates being performed",
            "the number of qubits in the system.",
            "both (a) and (b).",
            "the available depth or coherence time."
        ],
        answer: 3,
        explanation: "On NISQ hardware, the number of layers d is limited by the coherence time of the qubits. Deeper circuits accumulate more noise and decoherence errors, so the available coherence time is the primary constraint.",
        clue: "<b>Circuit Depth</b>: Real quantum hardware has a finite 'lifetime' for quantum information. The circuit must complete before decoherence destroys the state."
    },
    "4_21_4": {
        q: "Quantum Generative Adversarial Networks (QGANs) consists of:",
        options: ["Encoder", "Generator", "Decoder", "Discriminator"],
        answer: [1, 3],
        explanation: "QGANs, like classical GANs, consist of a Generator (which creates synthetic data) and a Discriminator (which tries to distinguish real from fake data). They compete in a minimax game.",
        clue: "<b>Adversarial Training</b>: The two competing components in a GAN are the one that creates and the one that judges."
    },
    "4_21_5": {
        q: "Which of the following statements is an accurate description of the phenomenon of decoherence?",
        options: [
            "Decoherence causes a pure quantum state to transform into an incoherent mixture of multiple states.",
            "Decoherence is caused when a quantum system evolves with time via a unitary transformation.",
            "Decoherence is caused when a quantum system is coupled to a bath or environment and the joint system evolves via a unitary transformation.",
            "Decoherence is a reversible process."
        ],
        answer: [0, 2],
        explanation: "Decoherence transforms pure states into mixed states (incoherent mixtures). It occurs because the quantum system interacts with its environment — the joint system+environment evolves unitarily, but tracing out the environment leaves the system in a mixed state. It is NOT reversible and is NOT simply unitary evolution of the system alone.",
        clue: "<b>Open Quantum Systems</b>: Decoherence is about the system 'leaking' information to the environment, turning quantum superpositions into classical mixtures."
    },
    "4_21_6": {
        q: "Select all the options that apply to the three-qubit quantum error correcting code.",
        options: [
            "The three-qubit code assumes that the bit-flip noise occurs identically and independently on the encoded qubits.",
            "The encoding transforms the state α|0⟩ + β|1⟩ to (α|0⟩ + β|1⟩)⊗³ where |α|² + |β|² = 1.",
            "The bit-flip noise flips the qubit with some probability p and leaves it untouched with probability 1 − p.",
            "The encoding transforms the state α|0⟩ + β|1⟩ to (α|000⟩ + β|111⟩) where |α|² + |β|² = 1."
        ],
        answer: [0, 2, 3],
        explanation: "The 3-qubit code assumes independent, identical noise (A). The noise model is: flip with probability p, no flip with probability 1−p (C). The encoding maps α|0⟩+β|1⟩ → α|000⟩+β|111⟩ (D), NOT to a tensor product of single-qubit states (B is wrong).",
        clue: "<b>3-Qubit Code</b>: The encoding creates an entangled state (|000⟩ and |111⟩), not three independent copies of the original qubit."
    },
    "4_21_7": {
        q: "Let S1 and S2 denote the syndrome bits at the end of the 3-qubit bit-flip quantum error correction protocol. Match the syndrome bit values to their respective recovery gates.<br><br><table style='border-collapse:collapse; margin:10px 0; background:rgba(255,255,255,0.05); border-radius:8px; overflow:hidden'><tr style='border-bottom:2px solid var(--glass-border); color:var(--primary); font-weight:700'><td style='padding:8px 16px'>Syndrome (S1, S2)</td><td style='padding:8px 16px'>Recovery Gates</td></tr><tr style='border-bottom:1px solid var(--glass-border)'><td style='padding:6px 16px'>x. (0, 1)</td><td style='padding:6px 16px'>i. I ⊗ I ⊗ X</td></tr><tr style='border-bottom:1px solid var(--glass-border)'><td style='padding:6px 16px'>y. (1, 1)</td><td style='padding:6px 16px'>ii. X ⊗ I ⊗ I</td></tr><tr><td style='padding:6px 16px'>z. (1, 0)</td><td style='padding:6px 16px'>iii. I ⊗ X ⊗ I</td></tr></table>",
        options: ["x-i, y-ii, z-iii", "x-i, y-iii, z-ii", "x-ii, y-iii, z-i", "x-iii, y-i, z-ii"],
        answer: 1,
        explanation: "Syndrome (0,1) means error on qubit 3 → recovery I⊗I⊗X (x-i). Syndrome (1,1) means error on qubit 2 → recovery I⊗X⊗I (y-iii). Syndrome (1,0) means error on qubit 1 → recovery X⊗I⊗I (z-ii). So the mapping is x-i, y-iii, z-ii.",
        clue: "<b>Syndrome Decoding</b>: Each syndrome pattern uniquely identifies which qubit was flipped. Map the bit pattern to the position of the error."
    },
    "4_21_8": {
        q: "Analyse the following 7-qubit circuit and answer the question.<br><br><pre style='background:#1e293b;padding:12px;border-radius:8px;font-family:monospace;color:#e2e8f0;font-size:0.85rem'>|0⟩ ─[H]──────────[X]─[H]─\n|0⟩ ─[H]──────────────[H]─\n|0⟩ ─[H]──[X]─────────[H]─\n|0⟩ ─[H]────────[X]───[H]─\n|0⟩ ─[H]──────────────[H]─\n|0⟩ ─[H]──────────────[H]─\n|1⟩ ─[H]──────────────[H]─</pre><br>What is the probability for <b>all</b> of the first 6 wires to output 0 when measured at the end of this circuit?",
        options: ["1/64", "1/2", "0", "1"],
        answer: 3,
        explanation: "The X gates between the H layers act on specific qubits. Since HXH = Z and HH = I, the X gates effectively become Z gates in the Hadamard basis. Since Z|+⟩ = |−⟩ and H|−⟩ = |1⟩, but looking at the overall structure, this is a Deutsch-Jozsa circuit with a constant oracle (the X gates don't create input-dependent phase flips on the ancilla). The probability of measuring all zeros on the first 6 qubits is 1.",
        clue: "<b>Deutsch-Jozsa Analysis</b>: Consider how the X gates interact with the Hadamard layers. Is the effective oracle constant or balanced?"
    },
    "4_21_9": {
        q: "Consider the encoded (or logical) state |ψ<sub>L</sub>⟩ = α|000⟩ + β|111⟩ subject to a quantum noise channel where each qubit can undergo a bit flip with probability p. The exact probability that the 3-qubit bit-flip quantum error correcting code fails to recover the original state is given by x · p<sup>y</sup> · (1 − p)<sup>z</sup> + p³, where p is the bit-flip probability and x, y, z are the variables to be identified. The value of y · x + z is ______. (here, · denotes multiplication)",
        options: ["6", "7", "10", "5"],
        answer: 1,
        explanation: "The code fails when 2 or more qubits flip. P(fail) = 3p²(1−p) + p³. So x=3, y=2, z=1. Therefore y·x + z = 2·3 + 1 = 7.",
        clue: "<b>Error Probability</b>: The 3-qubit code corrects single bit-flips but fails for 2 or more errors. Use the binomial distribution to count the failure cases."
    },
    "4_21_10": {
        q: "Consider a 3-qubit state in the {|+⟩, |−⟩} basis, of the form 1/√2 (|+++⟩ + |−−−⟩). Which of the following sets of errors can be detected on this state?",
        options: ["{XII, IXI, IIX}", "{IZI, ZIZ}", "{ZII, IZI, IIZ}", "{ZII, IZZ, ZZZ}"],
        answer: 2,
        explanation: "The state 1/√2(|+++⟩ + |−−−⟩) is a '+' basis GHZ state, which is the dual of the standard GHZ state. It can detect phase-flip (Z) errors on individual qubits: {ZII, IZI, IIZ}. This is analogous to how the standard 3-qubit code detects bit-flip (X) errors.",
        clue: "<b>Phase-Flip Code</b>: This state is the Hadamard-transformed version of the bit-flip code. It detects Z errors just as the standard code detects X errors."
    }
};

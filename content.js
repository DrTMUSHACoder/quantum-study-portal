export const WEEKS_DATA = [
    {
        week: 1,
        title: "Quantum Basics & Postulates",
        notes: `
            <h3>1. Introduction to Quantum Computing</h3>
            <p>Quantum computing leverages quantum mechanical phenomena like <b>superposition</b> and <b>entanglement</b> to perform computations that are intractable for classical computers.</p>
            
            <h3>2. The Qubit</h3>
            <p>A qubit is the basic unit of quantum information. Unlike a classical bit (0 or 1), a qubit can exist in a linear combination of both states: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers satisfying |α|² + |β|² = 1.</p>
            
            <h3>3. Postulates of Quantum Mechanics</h3>
            <ul>
                <li><b>State Space:</b> Any isolated physical system is associated with a Hilbert space known as the state space.</li>
                <li><b>Evolution:</b> The evolution of a closed quantum system is described by a <b>unitary transformation</b>.</li>
                <li><b>Measurement:</b> Quantum measurements are described by a collection of measurement operators {Mm}.</li>
            </ul>

            <h3>4. Basic Gates</h3>
            <p><b>Hadamard (H):</b> Creates superposition. H|0⟩ = ( |0⟩ + |1⟩ ) / √2.</p>
            <p><b>Pauli-X (NOT):</b> Flips the state. X|0⟩ = |1⟩, X|1⟩ = |0⟩.</p>
        `,
        assignmentSolution: `
            <h4>Assignment 1 - Key Solutions</h4>
            <ol>
                <li><b>Q:</b> What is the probability of measuring |0⟩ for state (1/√3)|0⟩ + (√2/√3)|1⟩?<br><b>A:</b> |1/√3|² = 1/3.</li>
                <li><b>Q:</b> Is the gate U = [[0, i], [i, 0]] unitary?<br><b>A:</b> Yes, U†U = I.</li>
            </ol>
        `,
        quiz: [
            { set: 1, title: "Recall & Recognition", count: 10, goal: "Foundation: Master the basic symbols and postulates with trivial numbers." },
            { set: 2, title: "Conceptual Reasoning", count: 10, goal: "Method: Learn the application of rules with easy integers." },
            { set: 3, title: "Guided Problem-Solving", count: 10, goal: "Master It: Solve medium-level problems with fractional amplitudes." },
            { set: 4, title: "Original NPTEL Questions", count: 10, goal: "NPTEL Standard: The exact assignment questions from this week." },
            { set: 5, title: "Exam-Style Variations", count: 10, goal: "Exam Ready: Original NPTEL methods applied to complex variations." },
            { set: 6, title: "Tough Variations & Traps", count: 10, goal: "Ultimate: Master the methodology even with tricky traps and hard math." }
        ]
    },
    {
        week: 2,
        title: "Programming with Qiskit",
        notes: `
            <h3>1. IBM Quantum & Qiskit</h3>
            <p>Qiskit is an open-source SDK for working with quantum computers at the level of pulses, circuits, and application modules.</p>
            
            <h3>2. Entanglement & Bell States</h3>
            <p>Entanglement is a phenomenon where the state of one qubit cannot be described independently of the other. The <b>Bell State</b> |Φ+⟩ = (|00⟩ + |11⟩)/√2 is created using an H gate and a CNOT gate.</p>
            
            <h3>3. Visualizing Qubits</h3>
            <ul>
                <li><b>Bloch Sphere:</b> Visualizes the state of a single qubit.</li>
                <li><b>State City:</b> Visualizes the density matrix.</li>
                <li><b>QSphere:</b> Shows multi-qubit states with phase information.</li>
            </ul>
        `,
        assignmentSolution: `
            <h4>Assignment 2 - Key Solutions</h4>
            <ol>
                <li><b>Q:</b> Which Qiskit class is used to create a circuit?<br><b>A:</b> QuantumCircuit.</li>
                <li><b>Q:</b> How do you add a CNOT gate between qubit 0 and 1?<br><b>A:</b> qc.cx(0, 1).</li>
            </ol>
        `,
        quiz: [
            { question: "Which Qiskit module is used to build quantum circuits?", options: ["qiskit.circuit", "qiskit.execute", "qiskit.tools", "qiskit.aqua"], answer: 0, clue: "It's the fundamental building block for logic.", explanation: "QuantumCircuit class resides in qiskit.circuit." },
            { question: "What gates are needed to create the Bell State (|00> + |11>)/√2?", options: ["X and Z", "H and CNOT", "H and X", "CNOT and Z"], answer: 1, clue: "You need superposition first, then a controlled flip.", explanation: "Apply H on qubit 0, then CNOT(0, 1)." },
            { question: "What does the Bloch Sphere represent?", options: ["Two-qubit states", "Single-qubit states", "Classical bits", "Quantum noise"], answer: 1, clue: "It's a geometrical representation of a single unit of quantum info.", explanation: "Bloch sphere is for single-qubit state visualization." },
            { question: "In Qiskit, what is the default initial state of a qubit?", options: ["|1⟩", "|+⟩", "|0⟩", "Random"], answer: 2, clue: "Computers usually start at ground zero.", explanation: "Qubits are initialized to the |0⟩ state by default." },
            { question: "Which simulator is used to get the statevector of a circuit?", options: ["qasm_simulator", "statevector_simulator", "unitary_simulator", "pulse_simulator"], answer: 1, clue: "The name tells you exactly what it gives back.", explanation: "Statevector_simulator provides the full quantum state." },
            { question: "What is the purpose of the 'measure' method in Qiskit?", options: ["To add errors", "To map quantum bits to classical bits", "To entangle qubits", "To visualize the Bloch sphere"], answer: 1, clue: "You need this to get a readable output from the hardware.", explanation: "Measurement records the quantum state into a classical register." },
            { question: "How is a CNOT gate represented in Qiskit code?", options: ["qc.cnot()", "qc.ctrl_x()", "qc.cx()", "qc.nx()"], answer: 2, clue: "It's a shorthand for 'Controlled-X'.", explanation: "The method is 'cx(control, target)'." },
            { question: "A State City plot uses which mathematical representation?", options: ["Statevector", "Bloch Vector", "Density Matrix", "Probability Histogram"], answer: 2, clue: "It shows the real and imaginary parts of ρ.", explanation: "State City plots the density matrix components." },
            { question: "What is a 'Backend' in Qiskit context?", options: ["A database", "The user interface", "A simulator or quantum hardware", "The Python compiler"], answer: 2, clue: "It's where the circuit actually runs.", explanation: "Backends can be local simulators or remote IBM Quantum devices." },
            { question: "Which gate is a controlled-NOT with one control?", options: ["Toffoli", "Fredkin", "CNOT", "SWAP"], answer: 2, clue: "Classic two-qubit gate.", explanation: "CNOT (Controlled-X) uses one control qubit." }
        ]
    },
    {
        week: 3,
        title: "Quantum Algorithms I",
        notes: `
            <h3>1. Oracle-Based Algorithms</h3>
            <p>Many quantum algorithms use a "Black Box" or <b>Oracle</b> that implements a function f(x). The goal is to find a property of f(x) with fewer queries than classical methods.</p>
            
            <h3>2. Deutsch-Jozsa Algorithm</h3>
            <p>Determines if a function f: {0,1}^n -> {0,1} is <b>constant</b> (same output for all inputs) or <b>balanced</b> (output is 0 for half and 1 for half). Quantumly, it only takes <b>1 query</b>.</p>
            
            <h3>3. Bernstein-Vazirani</h3>
            <p>Finds a hidden bitstring <b>s</b> such that f(x) = s · x (mod 2). Classical complexity: O(n). Quantum: <b>1 query</b>.</p>
        `,
        assignmentSolution: `
            <h4>Assignment 3 - Key Solutions</h4>
            <ol>
                <li><b>Q:</b> If Bernstein-Vazirani measures '101', what is the hidden string?<br><b>A:</b> '101'.</li>
                <li><b>Q:</b> Does Deutsch-Jozsa work for non-balanced functions?<br><b>A:</b> It assumes the function is either constant or balanced.</li>
            </ol>
        `,
        quiz: [
            { question: "Consider |X⟩ = |X_{N-1}X_{N-2}...X_1X_0⟩, a N-qubit state, is there a simple unitary Û such that: Û|X⟩ = |ψ⟩ = 1/√(2^N) ∑_{Y∈{0,1}^N} (-1)^{X·Y} |Y⟩ where X·Y denotes the mod 2 bitwise inner product. Starting from the state |ψ⟩, can one get complete information of X by applying some unitary gates followed by measurement?", options: ["Û = Ŝ^{⊗N}, Yes we can get information about X starting from |ψ⟩ by using Ŝ^{⊗N} followed by measurement.", "Such a unitary cannot be achieved.", "Û = Ĥ^{⊗N}, Yes we can get information about X starting from |ψ⟩ by using Ĥ^{⊗N} followed by measurement.", "Û = T̂^{⊗N}, We cannot infer X from |ψ⟩."], answer: 2, clue: "Which gate transforms the computational basis into the Fourier/phase basis symmetrically?", explanation: "The Hadamard transform is its own inverse. By applying it again, we recover the initial state |X⟩, thus getting complete information." },
            { question: "In the Deutsch-Jozsa problem, what is the minimum number of queries a classical deterministic algorithm must make to determine with 100% certainty whether a function of input size n is constant or balanced?", options: ["2^n", "n", "2^{n-1} + 1", "2"], answer: 2, clue: "Think about the worst-case scenario where half the outputs check out as the same.", explanation: "To be absolutely certain, you must check one more than half of the total possible inputs, which is 2^{n-1} + 1." },
            { question: "What are the possible outputs when the first 3 qubits are measured at the end of the circuit? Follow qiskit ordering.<br><br><pre style='background:#f4f4f4;padding:10px;border-radius:5px;font-family:monospace;letter-spacing:0'>\n|0⟩ ─[ H ]─────■─────[ H ]─\n|0⟩ ─[ H ]─────┼──■──[ H ]─\n|0⟩ ─[ H ]──■──┼──┼──[ H ]─\n|1⟩ ─[ H ]──⊕──⊕──⊕────────\n</pre>", options: ["|000⟩", "|101⟩", "|010⟩", "|110⟩"], answer: [2, 3], clue: "This is a Bernstein-Vazirani oracle for some secret string. Map the CNOT controls to the indices.", explanation: "Depending on bit ordering conventions, the string corresponds to the active CNOTs. NPTEL accepted both |010⟩ and |110⟩." },
            { question: "Which properties of a quantum mechanical system are exploited by both the Deutsch-Jozsa and Bernstein-Vazirani algorithms to encode the function's output f(x) onto the phase of the input state?", options: ["Uncertainty Principle", "Phase Kickback", "Superposition", "All the above"], answer: [1, 2], clue: "You need to evaluate all inputs at once, and flip their signs based on the target.", explanation: "Superposition allows evaluating all states simultaneously, while phase kickback encodes the oracle's output into the phase of those states." },
            { question: "What is the expected output when the qubits are measured at the end of the circuit?<br><br><pre style='background:#f4f4f4;padding:10px;border-radius:5px;font-family:monospace;letter-spacing:0'>\n|0⟩ ─[ H ]───────────[ X ]─[ H ]─\n|0⟩ ─[ H ]─────────────────[ H ]─\n|0⟩ ─[ H ]─[ Z ]─[ H ]─────[ X ]─\n</pre>", options: ["|010⟩", "|110⟩", "|001⟩", "|000⟩", "None of these"], answer: 3, clue: "Calculate the effect of X and Z on the |+⟩ and |-⟩ states. Remember X|+⟩ = |+⟩, and H|+⟩ = |0⟩.", explanation: "H|0⟩ is |+⟩. For top wire: X|+⟩ = |+⟩, then H|+⟩ = |0⟩. Middle wire: H|+⟩ = |0⟩. Bottom wire: Z|+⟩ = |-⟩, then H|-⟩ = |1⟩, then X|1⟩ = |0⟩. So output is |000⟩." },
            { question: "What is the probability for all the first 4 wires to output 0 when measured at the end of the following circuit?<br><br><pre style='background:#f4f4f4;padding:10px;border-radius:5px;font-family:monospace;letter-spacing:0'>\n|0⟩ ─[ H ]──■───────────[ X ]─[ H ]─\n|0⟩ ─[ H ]──┼──[ X ]─■────────[ H ]─\n|0⟩ ─[ H ]──┼────────┼────────[ H ]─\n|0⟩ ─[ H ]──┼──[ X ]─┼────────[ H ]─\n|1⟩ ─[ H ]──⊕────────⊕──────────────\n</pre>", options: ["1/4", "1/16", "0", "1", "None of these"], answer: 2, clue: "Trace the phase kickback. Consider the final state before the last H layer.", explanation: "This oracle maps a specific non-zero bitstring's phases. The final H layer will destructively interfere to 0 amplitude for the |0000> state, resulting in 0 probability." },
            { question: "How does the quantum circuit for the Bernstein-Vazirani algorithm fundamentally compare to the circuit for the Deutsch-Jozsa algorithm?", options: ["It requires n repetitions of the Deutsch-Jozsa circuit to find each bit of the secret string.", "It is completely different, using a new set of gates and a novel structure.", "It replaces all Hadamard gates with CNOT gates to determine the secret string.", "It is identical in structure, differing only in the function implemented by the oracle."], answer: 3, clue: "Think about the high-level outline: prepare superposition, query oracle, transform back.", explanation: "Both algorithms use exactly the same structural template: apply H to all inputs, query the oracle with a phase kickback ancilla, apply H to all inputs again, and measure." },
            { question: "How is the reflection about the uniform superposition state |u⟩ (the Grover diffuser) constructed?", options: ["By transforming |u⟩ to |0...0⟩ with Hadamard gates, reflecting about |0...0⟩, and transforming back", "It is implemented by a different oracle designed to mark the state |u⟩.", "It is a fundamental quantum gate that can be applied directly.", "By applying the oracle in reverse on the state |u⟩."], answer: 0, clue: "We know how to reflect around the |0...0⟩ state easily. How can we use that?", explanation: "We change basis using Hadamard gates to map |u⟩ to |0...0⟩, perform a phase flip conditional on being in |0...0⟩ (reflection), and then use Hadamard gates again to return to the original basis." },
            { question: "What does the following quantum circuit represent?<br><br><pre style='background:#f4f4f4;padding:10px;border-radius:5px;font-family:monospace;letter-spacing:0'>\nq_0 ─[ H ]─[ H ]─[ M ]─\nq_1 ─[ H ]─[ H ]─[ M ]─\nq_2 ─[ H ]─[ H ]─[ M ]─\nq_3 ─[ X ]─[ H ]───────\n</pre>", options: ["Deutsch-Jozsa with Constant Function Oracle", "Deutsch-Jozsa with Balanced Function Oracle", "Bernstein-Vazirani with hidden string 111", "Grover's Search"], answer: 0, clue: "Notice that there are no gates connecting the input qubits to the ancilla.", explanation: "Since there is no interaction between the inputs and q_3, the oracle function is effectively f(x) = 0 for all x. This is a constant function in the Deutsch-Jozsa framework." },
            { question: "The geometric interpretation of Grover's algorithm involves a rotation within a 2D plane. Which two orthogonal basis vectors span this plane?", options: ["The initial uniform superposition state |u⟩ and the final target state |a⟩.", "The target state |a⟩ and a uniform superposition of all non-target states, |e⟩.", "The input register state |x⟩ and the output register state |f(x)⟩.", "The all-zeros state |0...0⟩ and the all-ones state |1...1⟩."], answer: 1, clue: "The plane must contain both the starting point and our destination, and its axes must be mutually orthogonal.", explanation: "The algorithm rotates the state vector in the 2D subspace spanned by the target state(s) |a⟩ and the uniform superposition of all other incorrect states |e⟩." }
        ]
    },
    {
        week: 4,
        title: "Grover's Algorithm & QFT",
        notes: `
            <h3>1. Grover's Search Algorithm</h3>
            <p>Searches an unstructured database of N items in <b>O(√N)</b> queries. It uses <b>Amplitude Amplification</b> to increase the probability of the correct state.</p>
            
            <h3>2. Iterative Process</h3>
            <ol>
                <li>Start with uniform superposition.</li>
                <li>Apply the Oracle (flips phase of the target).</li>
                <li>Apply the Grover Diffuser (reflects about the mean).</li>
                <li>Repeat ~π/4 √N times.</li>
            </ol>
            
            <h3>3. Quantum Fourier Transform (QFT)</h3>
            <p>A linear transformation on qubits, analogous to the discrete Fourier transform. It is the heart of Shor's algorithm and Phase Estimation.</p>
        `,
        assignmentSolution: `
            <h4>Assignment 4 - Key Solutions</h4>
            <ol>
                <li><b>Q:</b> If N=8, how many Grover iterations are optimal?<br><b>A:</b> floor(π/4 √8) ≈ 2.</li>
                <li><b>Q:</b> What does the Diffuser do?<br><b>A:</b> It performs reflection about the average amplitude.</li>
            </ol>
        `,
        quiz: [
            { question: "What is the speedup provided by Grover's Algorithm?", options: ["Exponential", "Linear", "Quadratic", "No speedup"], answer: 2, clue: "It changes N to √N.", explanation: "Grover's algorithm provides a quadratic speedup for unstructured search." },
            { question: "The Grover Diffuser is also known as...?", options: ["Oracle", "Phase Flip", "Inversion about the mean", "Hadamard sandwich"], answer: 2, clue: "It reflects amplitudes across their average.", explanation: "It amplifies the state with a negative amplitude relative to others." },
            { question: "For N=100, roughly how many iterations does Grover take?", options: ["100", "50", "10", "1"], answer: 2, clue: "Calculate the square root.", explanation: "√100 = 10 iterations." },
            { question: "What does the Oracle do in Grover's algorithm?", options: ["Finds the result", "Mark the solution by flipping its phase", "Deletes wrong items", "Measures the qubit"], answer: 1, clue: "It flags the correct answer without revealing it yet.", explanation: "The Oracle multiplies the target state's coefficient by -1." },
            { question: "What happens if you run too many Grover iterations?", options: ["Probability stays at 100%", "The state collapses", "Probability decreases (over-rotation)", "The computer crashes"], answer: 2, clue: "Imagine a rotation going past the target axis.", explanation: "Grover's is a rotation in Hilbert space; over-rotation leads back to the initial state." },
            { question: "QFT is primarily used for which property?", options: ["Search", "Period Finding", "Error Correction", "Database indexing"], answer: 1, clue: "Essential for Shor's algorithm.", explanation: "QFT maps time-domain states to frequency-domain, revealing periods." },
            { question: "What is the complexity of QFT for n qubits?", options: ["O(n)", "O(n²)", "O(2^n)", "O(log n)"], answer: 1, clue: "It requires n(n+1)/2 gates.", explanation: "QFT has O(n²) gate complexity." },
            { question: "The Grover algorithm is optimal for searching in...", options: ["Sorted lists", "Unstructured databases", "Binary trees", "Linked lists"], answer: 1, clue: "Situations where you have no prior knowledge of index.", explanation: "It works on any black-box search problem." },
            { question: "Phase Estimation requires which algorithm as a component?", options: ["Grover's", "Deutsch-Jozsa", "QFT", "Shor's"], answer: 2, clue: "Specifically, the inverse of this algorithm.", explanation: "Quantum Phase Estimation uses Inverse QFT." },
            { question: "Who developed the unstructured search algorithm?", options: ["Peter Shor", "Lov Grover", "Richard Feynman", "David Deutsch"], answer: 1, clue: "The algorithm is named after him.", explanation: "Lov Grover published it in 1996." }
        ]
    }
];

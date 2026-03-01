
// Mock external constraints
const videoQuestionsData = {};

const technicalLibrary = {
    "State Space": "...",
    "Dirac Notation": "...",
    "Qubits": "...",
    "Bloch Sphere": "...",
    "Postulates": "...",
    "Linear Algebra": "...",
    "Inner Product": "...",
    "Measurement": "...",
    "Unitary Gates": "...",
    "Probability": "...",
    "Qiskit SDK": "...",
    "Quantum Circuits": "...",
    "Gates (X,Y,Z,H)": "...",
    "CNOT / Entanglement": "...",
    "Bell States": "...",
    "Simulators": "...",
    "Statevector": "...",
    "Visualization": "...",
    "Measurements Logic": "...",
    "Register Logic": "...",
    "Algorithms Speedups": "...",
    "Deutch Algorithm": "...",
    "DJ Algorithm": "...",
    "Bernstein Vazirani": "...",
    "Oracles": "...",
    "Phase Kickback": "...",
    "Balanced vs Constant": "...",
    "Query Complexity": "...",
    "Hidden Bitstring": "...",
    "Logic Reversibility": "...",
    "Grover Search": "...",
    "QFT": "...",
    "Amplitude Amplification": "...",
    "Diffuser": "...",
    "Phase Estimation": "...",
    "Period Finding": "...",
    "Iterations count": "...",
    "Oracle types": "...",
    "Complexity √N": "...",
    "Phase shift": "..."
};

// Mock questionsData with just the keys to verify existence
const questionsData = {
    "State Space": { q: "...", options: [], answer: 0, explanation: "..." },
    "Dirac Notation": { q: "...", options: [], answer: 0, explanation: "..." },
    "Qubits": { q: "...", options: [], answer: 0, explanation: "..." },
    "Bloch Sphere": { q: "...", options: [], answer: 0, explanation: "..." },
    "Postulates": { q: "...", options: [], answer: 0, explanation: "..." },
    "Linear Algebra": { q: "...", options: [], answer: 0, explanation: "..." },
    "Inner Product": { q: "...", options: [], answer: 0, explanation: "..." },
    "Measurement": { q: "...", options: [], answer: 0, explanation: "..." },
    "Unitary Gates": { q: "...", options: [], answer: 0, explanation: "..." },
    "Probability": { q: "...", options: [], answer: 0, explanation: "..." },
    "Qiskit SDK": { q: "...", options: [], answer: 0, explanation: "..." },
    "Quantum Circuits": { q: "...", options: [], answer: 0, explanation: "..." },
    "Gates (X,Y,Z,H)": { q: "...", options: [], answer: 0, explanation: "..." },
    "CNOT / Entanglement": { q: "...", options: [], answer: 0, explanation: "..." },
    "Bell States": { q: "...", options: [], answer: 0, explanation: "..." },
    "Simulators": { q: "...", options: [], answer: 0, explanation: "..." },
    "Statevector": { q: "...", options: [], answer: 0, explanation: "..." },
    "Visualization": { q: "...", options: [], answer: 0, explanation: "..." },
    "Measurements Logic": { q: "...", options: [], answer: 0, explanation: "..." },
    "Register Logic": { q: "...", options: [], answer: 0, explanation: "..." },
    "Algorithms Speedups": { q: "...", options: [], answer: 0, explanation: "..." },
    "Deutch Algorithm": { q: "...", options: [], answer: 0, explanation: "..." },
    "DJ Algorithm": { q: "...", options: [], answer: 0, explanation: "..." },
    "Bernstein Vazirani": { q: "...", options: [], answer: 0, explanation: "..." },
    "Oracles": { q: "...", options: [], answer: 0, explanation: "..." },
    "Phase Kickback": { q: "...", options: [], answer: 0, explanation: "..." },
    "Balanced vs Constant": { q: "...", options: [], answer: 0, explanation: "..." },
    "Query Complexity": { q: "...", options: [], answer: 0, explanation: "..." },
    "Hidden Bitstring": { q: "...", options: [], answer: 0, explanation: "..." },
    "Logic Reversibility": { q: "...", options: [], answer: 0, explanation: "..." },
    "Grover Search": { q: "...", options: [], answer: 0, explanation: "..." },
    "QFT": { q: "...", options: [], answer: 0, explanation: "..." },
    "Amplitude Amplification": { q: "...", options: [], answer: 0, explanation: "..." },
    "Diffuser": { q: "...", options: [], answer: 0, explanation: "..." },
    "Phase Estimation": { q: "...", options: [], answer: 0, explanation: "..." },
    "Period Finding": { q: "...", options: [], answer: 0, explanation: "..." },
    "Iterations count": { q: "...", options: [], answer: 0, explanation: "..." },
    "Oracle types": { q: "...", options: [], answer: 0, explanation: "..." },
    "Complexity √N": { q: "...", options: [], answer: 0, explanation: "..." },
    "Phase shift": { q: "...", options: [], answer: 0, explanation: "..." }
};

const topics = [
    ["State Space", "Dirac Notation", "Qubits", "Bloch Sphere", "Postulates", "Linear Algebra", "Inner Product", "Measurement", "Unitary Gates", "Probability"],
    ["Qiskit SDK", "Quantum Circuits", "Gates (X,Y,Z,H)", "CNOT / Entanglement", "Bell States", "Simulators", "Statevector", "Visualization", "Measurements Logic", "Register Logic"],
    ["Algorithms Speedups", "Deutch Algorithm", "DJ Algorithm", "Bernstein Vazirani", "Oracles", "Phase Kickback", "Balanced vs Constant", "Query Complexity", "Hidden Bitstring", "Logic Reversibility"],
    ["Grover Search", "QFT", "Amplitude Amplification", "Diffuser", "Phase Estimation", "Period Finding", "Iterations count", "Oracle types", "Complexity √N", "Phase shift"]
];

function generateQuestion(week, setId, qNum) {
    // Check for video-specific override
    const overrideKey = `${week}_${setId}_${qNum}`;
    if (videoQuestionsData[overrideKey]) {
        return {};
    }

    const topicName = topics[week - 1][(qNum - 1) % 10];

    if (!topicName) {
        console.error(`FATAL: No topic found for week ${week}, qNum ${qNum}`);
        process.exit(1);
    }

    const technicalExtract = technicalLibrary[topicName];
    const qInfo = questionsData[topicName];

    if (!qInfo) {
        console.error(`FATAL: qInfo missing for topic '${topicName}' (Week ${week}, qNum ${qNum})`);
        process.exit(1);
    }

    return {
        question: `Challenge ${qNum}: ${qInfo.q}`,
        options: qInfo.options,
        answer: qInfo.answer
    };
}

try {
    console.log("Starting Data Generation...");
    const WEEKS_DATA = [1, 2, 3, 4].map(w => {
        const quizzes = [];
        const videoCounts = { 1: 8, 2: 4, 3: 4, 4: 7 };
        const videoCount = videoCounts[w];
        const lectureCount = (w === 1) ? 8 : 10;

        // Lecture PDF
        for (let i = 1; i <= lectureCount; i++) {
            quizzes.push({ id: i, type: 'lecture', questions: Array.from({ length: 10 }, (_, q) => generateQuestion(w, i, q + 1)) });
        }

        // Video Lessons (Limited by availability of PDFs: 8, 4, 4, 7)
        for (let i = 11; i < 11 + videoCount; i++) {
            quizzes.push({ id: i, type: 'video', questions: Array.from({ length: 10 }, (_, q) => generateQuestion(w, i, q + 1)) });
        }

        // 5 NPTEL (Assignment & Solutions)
        for (let i = 21; i <= 25; i++) {
            quizzes.push({ id: i, type: 'nptel', questions: Array.from({ length: 10 }, (_, q) => generateQuestion(w, i, q + 1)) });
        }

        return {
            week: w,
            quizzes: quizzes
        };
    });
    console.log("Data Generation Successful!");
} catch (e) {
    console.error("Data Generation Failed:", e);
}

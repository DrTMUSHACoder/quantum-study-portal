from fpdf import FPDF
import os

class QAPDF(FPDF):
    def header(self):
        self.set_fill_color(15, 23, 42)
        self.rect(0, 0, 210, 30, 'F')
        self.set_text_color(255, 255, 255)
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, 'LNQ 1.1: Quantum Computing Introduction', 0, 1, 'L')
        self.set_font('Arial', '', 10)
        self.set_text_color(148, 163, 184)
        self.cell(0, 5, 'Week 1 | Lecture Quiz 1 | Set 1 - Answer Key', 0, 1, 'L')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, 'Quantum Master Pro | Internal Academic Resource', 0, 0, 'C')

def generate_pdf():
    data = [
        {
            "q": "What is the fundamental unit of quantum information?",
            "options": ["Bit", "Qubit", "Trit", "Byte"],
            "answer": 1,
            "explanation": "A qubit (quantum bit) is the fundamental unit of quantum information, analogous to a classical bit but capable of superposition."
        },
        {
            "q": "Which property allows a qubit to be in both |0> and |1> simultaneously?",
            "options": ["Entanglement", "Superposition", "Decoherence", "Tunneling"],
            "answer": 1,
            "explanation": "Superposition allows a qubit to exist in a linear combination alpha|0> + beta|1>."
        },
        {
            "q": "A classical computer with n bits can store how many states at once?",
            "options": ["2^n", "n", "1", "n^2"],
            "answer": 2,
            "explanation": "A classical n-bit register stores exactly 1 state at a time, while a quantum register can be in a superposition of up to 2^n states."
        },
        {
            "q": "Who proposed the idea of a quantum computer in 1982?",
            "options": ["Alan Turing", "Richard Feynman", "Peter Shor", "David Deutsch"],
            "answer": 1,
            "explanation": "Richard Feynman proposed that quantum systems could be efficiently simulated by quantum computers."
        },
        {
            "q": "What is the computational basis for a single qubit?",
            "options": ["{|+>, |->}", "{|0>, |1>}", "{|i>, |-i>}", "{|L>, |R>}"],
            "answer": 1,
            "explanation": "The computational basis for a qubit is {|0>, |1>}, corresponding to the standard basis vectors."
        },
        {
            "q": "Which of the following is NOT a potential application of quantum computing?",
            "options": ["Drug discovery", "Cryptography breaking", "Classical file compression", "Optimization problems"],
            "answer": 2,
            "explanation": "Classical file compression is not a quantum computing application. Quantum computing excels at simulation, cryptography, and optimization."
        },
        {
            "q": "The state |psi> = alpha|0> + beta|1> must satisfy which condition?",
            "options": ["|alpha|^2 + |beta|^2 = 1", "alpha + beta = 1", "alpha^2 + beta^2 = 1", "|alpha| + |beta| = 1"],
            "answer": 0,
            "explanation": "The normalization condition requires that the sum of the squared amplitudes equals 1: |alpha|^2 + |beta|^2 = 1."
        },
        {
            "q": "How many classical bits are needed to describe an arbitrary single qubit state?",
            "options": ["1", "2", "Infinite", "4"],
            "answer": 2,
            "explanation": "An arbitrary qubit state requires two continuous real parameters (theta and phi), which need infinite classical bits for exact description."
        },
        {
            "q": "What does the no-cloning theorem state?",
            "options": ["Quantum states can be copied freely", "An unknown quantum state cannot be perfectly copied", "Entanglement is impossible", "Measurement is reversible"],
            "answer": 1,
            "explanation": "The no-cloning theorem states that it is impossible to create an identical copy of an arbitrary unknown quantum state."
        },
        {
            "q": "Which complexity class contains problems efficiently solvable by quantum computers?",
            "options": ["P", "NP", "BQP", "PSPACE"],
            "answer": 2,
            "explanation": "BQP (Bounded-error Quantum Polynomial time) is the class of problems efficiently solvable by quantum computers."
        }
    ]

    pdf = QAPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=11)

    for i, item in enumerate(data, 1):
        # Question
        pdf.set_font('Arial', 'B', 11)
        pdf.set_text_color(30, 41, 59)
        pdf.multi_cell(0, 6, f"Q{i}: {item['q']}")
        
        # Answer
        pdf.set_font('Arial', 'B', 10)
        pdf.set_text_color(16, 185, 129) # Green
        pdf.cell(0, 6, f"Correct Answer: {item['options'][item['answer']]}", 0, 1)
        
        # Explanation
        pdf.set_font('Arial', '', 10)
        pdf.set_text_color(71, 85, 105) # Gray-ish
        pdf.multi_cell(0, 5, f"Explanation: {item['explanation']}")
        
        pdf.ln(5)
        pdf.set_draw_color(226, 232, 240)
        pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 190, pdf.get_y())
        pdf.ln(5)

    output_path = r"d:\Research\35 Antigravity Projects\quantum-study-portal - 20-02-2026\quantum-study-portal - 20-02-2026\resources\week_1\Lecture Notes\Answer Keys\Lec_1\Set1.pdf"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    print(f"PDF successfully generated at: {output_path}")

if __name__ == "__main__":
    generate_pdf()

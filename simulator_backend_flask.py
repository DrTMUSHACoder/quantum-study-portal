from flask import Flask, jsonify, request
from qiskit import QuantumCircuit, transpile
from qiskit.quantum_info import Statevector
from qiskit_aer import AerSimulator
from flask_cors import CORS
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
import base64
import io

app = Flask(__name__)
CORS(app)

simulator = AerSimulator()

@app.route('/api/week1/simulate', methods=['POST'])
def simulate_circuit():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
            
        gates = data.get('gates', [])
        shots = data.get('shots', 1024)
        num_qubits = data.get('num_qubits', 1)
        num_bits = data.get('num_bits', 1)
        
        qc = QuantumCircuit(num_qubits, num_bits)
        
        for gate_entry in gates:
            if isinstance(gate_entry, str):
                gate = gate_entry.strip().upper()
                targets = [0]
            else:
                gate = gate_entry.get('name', '').strip().upper()
                targets = gate_entry.get('targets', [0])

            if gate == 'X':
                for t in targets: qc.x(t)
            elif gate == 'H':
                for t in targets: qc.h(t)
            elif gate == 'Z':
                for t in targets: qc.z(t)
            elif gate == 'Y':
                for t in targets: qc.y(t)
            elif gate == 'CX' or gate == 'CNOT':
                if len(targets) >= 2:
                    qc.cx(targets[0], targets[1])
            elif gate == 'MEASURE':
                for i, t in enumerate(targets):
                    if i < num_bits:
                        qc.measure(t, i)
            elif gate == 'INIT':
                pass 
            else:
                pass 

        # 1. Generate Circuit Diagram (SVG)
        try:
            # Draw to a buffer
            # Use 'mpl' output which requires matplotlib and pylatexenc (for latex labels if needed)
            # We catch errors to avoid crashing if libs are missing
            fig = qc.draw(output='mpl', style='clifford')
            buf = io.BytesIO()
            fig.savefig(buf, format='svg', bbox_inches='tight')
            buf.seek(0)
            diagram_svg = buf.getvalue().decode('utf-8')
            plt.close(fig)
        except Exception as e:
            print(f"Diagram error: {e}")
            # Fallback to text drawing if mpl fails (though frontend expects SVG, so maybe send error)
            diagram_svg = None

        # 2. Statevector (before measurement for visualization)
        qc_state = qc.copy()
        qc_state.remove_final_measurements()
        
        try:
            state = Statevector.from_instruction(qc_state)
            sv_data = []
            for c in state.data:
                re = np.round(c.real, 3)
                im = np.round(c.imag, 3)
                sv_data.append(f"{re} + {im}j")
            probs = state.probabilities_dict()
        except Exception as e:
            sv_data = ["State Error"]
            probs = {"0": 0, "1": 0}

        # 3. Measurement simulation
        if 'MEASURE' in gates or any('measure' in g.lower() for g in gates):
            transpiled_qc = transpile(qc, simulator)
            result = simulator.run(transpiled_qc, shots=shots).result()
            counts = result.get_counts()
        else:
            counts = {k: int(v * shots) for k, v in probs.items()}

        return jsonify({
            'statevector': sv_data,
            'probabilities': probs,
            'counts': counts,
            'diagram': diagram_svg
        })

    except Exception as e:
        print(f"Backend Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

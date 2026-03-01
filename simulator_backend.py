from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import numpy as np
try:
    from qiskit import QuantumCircuit
    from qiskit.quantum_info import Statevector
    HAS_QISKIT = True
except ImportError:
    HAS_QISKIT = False

app = Flask(__name__)
CORS(app)

@app.route('/api/week1/simulate', methods=['POST'])
def simulate_week1():
    if not HAS_QISKIT:
        return jsonify({"error": "Qiskit is not installed"}), 500

    try:
        data = request.json
        # Support both 'gate' (single) and 'gates' (list)
        gates = data.get('gates', [])
        if not gates and 'gate' in data:
            gates = [data['gate']]
        
        qc = QuantumCircuit(1)
        
        for g in gates:
            g = g.upper()
            if g in ["H", "X", "Y", "Z", "S", "T"]:
                if g == "H": qc.h(0)
                elif g == "X": qc.x(0)
                elif g == "Y": qc.y(0)
                elif g == "Z": qc.z(0)
                elif g == "S": qc.s(0)
                elif g == "T": qc.t(0)
            elif g == "I" or g == "INIT":
                pass
            elif g == "MEASURE":
                qc.measure_all()
            else:
                return jsonify({"error": f"Unknown gate: {g}"}), 400
            
        state = Statevector.from_instruction(qc)
        probs = state.probabilities_dict()
        
        sv_data = state.data
        # Clean amplitude formatting
        components = []
        for c in sv_data:
            real = f"{c.real:.3f}"
            imag = f"{abs(c.imag):.3f}j"
            sign = "+" if c.imag >= 0 else "-"
            components.append(f"{real} {sign} {imag}")
            
        sv_str = "[" + ", ".join(components) + "]"

        return jsonify({
            "statevector": sv_str,
            "probabilities": {
                "0": probs.get('0', 0),
                "1": probs.get('1', 0)
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

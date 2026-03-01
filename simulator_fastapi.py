from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from qiskit import QuantumCircuit, transpile
from qiskit.quantum_info import Statevector
from qiskit_aer import AerSimulator
from typing import List, Dict, Union, Optional
from pydantic import BaseModel
import numpy as np

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize simulator
simulator = AerSimulator()

class CircuitInput(BaseModel):
    gates: List[str]
    shots: Optional[int] = 1024

@app.post("/api/week1/simulate")
async def simulate_circuit(input_data: CircuitInput):
    try:
        gates = input_data.gates
        shots = input_data.shots or 1024
        
        qc = QuantumCircuit(1, 1) # 1 qubit, 1 classical bit
        
        # Apply gates based on input
        # Step-by-step construction
        for gate in gates:
            gate = gate.strip().upper()
            if gate == "X":
                qc.x(0)
            elif gate == "H":
                qc.h(0)
            elif gate == "Z":
                qc.z(0)
            elif gate == "Y":
                qc.y(0)
            elif gate == "MEASURE":
                qc.measure(0, 0)
            elif gate == "INIT":
                pass # Already initialized
            else:
                pass # Ignore unknown
                
        # 1. Get Statevector (before measurement for visualization)
        # We need a copy without measurement for statevector if measurement collapses it
        qc_state = qc.copy()
        qc_state.remove_final_measurements() # Remove measurement to see the superposition
        
        try:
            state = Statevector.from_instruction(qc_state)
            # Format statevector
            sv_data = []
            for c in state.data:
                # Format to a readable string like "0.707+0.000j"
                re = np.round(c.real, 3)
                im = np.round(c.imag, 3)
                sv_data.append(f"{re} + {im}j")
            
            probs = state.probabilities_dict()
        except Exception as e:
            # If circuit is invalid for statevector (e.g. mid-circuit measurement without reset?), fallback
            sv_data = ["Error calculating state"]
            probs = {"0": 0, "1": 0}

        # 2. Run Measurement Simulation (Counts)
        if "MEASURE" in gates or "measure" in [g.lower() for g in gates]:
            transpiled_qc = transpile(qc, simulator)
            result = simulator.run(transpiled_qc, shots=shots).result()
            counts = result.get_counts()
        else:
            # Ideal probabilities converted to estimated counts
            counts = {k: int(v * shots) for k, v in probs.items()}

        return {
            "statevector": sv_data,
            "probabilities": probs,
            "counts": counts,
            "shots": shots
        }

    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

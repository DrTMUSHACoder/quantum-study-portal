import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
in_data_block = False

commands = [
    "theta", "phi", "psi", "cos", "sin", "frac", "left", "right", 
    "rangle", "langle", "binom", "sqrt", "pi", "alpha", "beta", "gamma",
    "begin", "end", "pmatrix", "rightarrow", "delta", "epsilon", "hbar",
    "Vert", "vert", "dagger", "otimes", "sum", "equiv"
]

for line in lines:
    if "const videoQuestionsData =" in line:
        in_data_block = True
    
    if in_data_block:
        # Step 1: Reduce all backslash sequences to single backslash literal in the file
        # Replacement r"\\" (2 backslashes) -> re.sub produces 1 backslash
        line = re.sub(r"\\+", r"\\", line)
        
        # Step 2: Escape commands (e.g., \theta -> \\theta)
        # We want 2 in the file. Replacement r"\\\\" (4 backslashes) -> re.sub produces 2
        cmd_pattern = r"\\(" + "|".join(commands) + r")"
        line = re.sub(cmd_pattern, r"\\\\\1", line)
        
        # Step 3: Escape matrix newlines (e.g., \  -> \\\\ )
        # Currently single \. We want 4 in the file. 
        # Replacement r"\\\\\\\\" (8 backslashes) -> re.sub produces 4
        line = re.sub(r"\\(?=[ \d\n])", r"\\\\\\\\", line)
        
        # Step 4: Special cases
        line = line.replace("\\|", "\\\\|")
    
    if "const TRANSLATIONS =" in line:
        in_data_block = False
    
    new_lines.append(line)

with open(filepath, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Normalization complete.")

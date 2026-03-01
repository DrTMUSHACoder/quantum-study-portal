import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
in_data_block = False

# Comprehensive list of LaTeX commands found in the quiz data
commands = [
    "theta", "phi", "psi", "cos", "sin", "frac", "left", "right", 
    "rangle", "langle", "binom", "sqrt", "pi", "alpha", "beta", "gamma",
    "begin", "end", "pmatrix", "rightarrow", "delta", "epsilon", "hbar",
    "Vert", "vert", "langle", "rangle", "dagger", "otimes", "sum", "equiv"
]

# Unique commands only
commands = list(set(commands))

for line in lines:
    if "const videoQuestionsData =" in line:
        in_data_block = True
    
    if in_data_block:
        # 1. Reset: Reduce all sequences of backslashes to a single backslash literal in the file
        # We use four backslashes in the replacement argument to represent one literal backslash to re.sub
        line = re.sub(r"\\+", r"\\\\", line)
        
        # 2. Commands: Escape commands (e.g., \theta -> \\theta)
        # We want two backslashes in the file. Re replacement needs 4 to produce 2.
        cmd_pattern = r"\\(" + "|".join(commands) + r")"
        line = re.sub(cmd_pattern, r"\\\\\\\\\1", line)
        
        # 3. Newlines/Spaces: Escape matrix newlines (e.g., \\ -> \\\\)
        # They are currently single \ due to step 1. We want four in the file. 
        # Re replacement needs 8 to produce 4.
        line = re.sub(r"\\(?=[ \d\n])", r"\\\\\\\\\\\\\\\\", line)
        
        # 4. Special cases
        line = line.replace("\\|", "\\\\|")
    
    if "const TRANSLATIONS =" in line:
        in_data_block = False
    
    new_lines.append(line)

with open(filepath, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Math rendering strings fully normalized (v3).")

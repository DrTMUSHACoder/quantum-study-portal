import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

# We'll use start/end line numbers to be safe, or detection
# videoQuestionsData starts around line 130
# TRANSLATIONS starts around line 1500

new_lines = []
in_data_block = False

for line in lines:
    if "const videoQuestionsData =" in line:
        in_data_block = True
    
    if in_data_block:
        # 1. Reduce all backslash sequences to single backslash
        # (This resets any mess from previous runs)
        line = re.sub(r"\\{1,}", r"\\", line)
        
        # 2. Fix common LaTeX commands to have double backslashes for JS strings
        commands = [
            "theta", "phi", "psi", "cos", "sin", "frac", "left", "right", 
            "rangle", "langle", "binom", "sqrt", "pi", "alpha", "beta", "gamma",
            "begin", "end", "pmatrix", "rightarrow", "psi", "phi", "delta", "epsilon"
        ]
        for cmd in commands:
            # Replace \cmd with \\cmd
            line = line.replace("\\" + cmd, "\\\\" + cmd)
        
        # 3. Fix matrix newlines and explicit spaces
        # These are now single \. They should be \\ in memory, so \\\\ in file.
        line = re.sub(r"\\(?=[ \d\n])", r"\\\\\\\\", line)
        
        # 4. Handle ket/bra bars \|
        line = line.replace("\\|", "\\\\|")
        
        # 5. Handle cases like \binom{...}{...} where reduction might have left \
        # This is already covered by the command list.
    
    if "const TRANSLATIONS =" in line:
        in_data_block = False
    
    new_lines.append(line)

with open(filepath, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Math rendering strings normalized.")

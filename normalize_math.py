import re
import os

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Step 1: Normalize over-escaped backslashes from previous run.
# Change 4 backslashes before a letter back to 2.
# In regex: \\\\\\\\([a-zA-Z]) -> \\\\\1
# (Each \\ in re.sub replacement means one literal \, so \\\\ means \\)
content = re.sub(r"\\\\\\\\([a-zA-Z])", r"\\\\\1", content)

# Step 2: Ensure single backslashes before common LaTeX commands are escaped once.
# This fixes cases where the data was injected with single backslashes.
commands = ["theta", "phi", "psi", "cos", "sin", "frac", "left", "right", "rangle", "langle", "binom", "sqrt", "pi", "alpha", "beta", "gamma", "begin", "end", "pmatrix", "binom", "left", "right"]
for cmd in commands:
    # Match single \ followed by cmd, but not preceded by \
    content = re.sub(r"(?<!\\)\\{}".format(cmd), r"\\\\" + cmd, content)

# Step 3: Fix matrix newlines. 
# They should be \\ in JS memory, which means \\\\ in the file.
# If they are currently \\ in the file followed by something NOT a letter (like a space or digit), 
# turn them into \\\\.
content = re.sub(r"(?<!\\)\\\\\\\\(?![a-zA-Z])", r"\\\\\\\\", content) # This is already correct if it's 4.
# If they are single \\ in the file followed by non-letter:
content = re.sub(r"(?<!\\)\\\\(?![a-zA-Z])", r"\\\\\\\\", content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Math backslashes normalized to 2 for commands and 4 for newlines.")

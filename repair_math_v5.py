import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Step 1: Fix single backslashes followed by letters
# We target the common LaTeX start characters to avoid false positives in HTML
# p (phi, psi, pi, pmatrix), t (theta, tau), c (cos, chi), s (sin, sqrt, sigma, sum), f (frac), l (left, lambda), r (right, rho), a (alpha), b (beta, binom, begin), g (gamma), d (delta, dagger), e (epsilon, eta, equiv), o (otimes), v (vert, Vert)
target_chars = "ptcsflrabgdeov"
pattern = r"(?<!\\)\\([{}])" .format(target_chars + target_chars.upper())
content = re.sub(pattern, r"\\\\\1", content)

# Step 2: Fix single backslashes followed by other common LaTeX symbols
# \vert, \|, \{, \}, \[, \], \(, \)
symbols = [r"\{", r"\}", r"\|", r"\(", r"\)", r"\[", r"\]"]
for sym in symbols:
    # Escape the backslash in the symbol for the regex
    # We want to match literally \ followed by the symbol
    # e.g. match \{ and turn it into \\{
    # In the file, it's \ and {
    p = r"(?<!\\)\\" + sym
    r = r"\\\\" + sym
    content = re.sub(p, r, content)

# Step 3: Handle matrix newlines \\
# If we see two backslashes NOT followed by another backslash, and NOT preceded by one, 
# it means it's a double backslash in the file, which becomes a single backslash in memory.
# KaTeX needs a double backslash in memory, so we need FOUR in the file.
content = re.sub(r"(?<!\\)\\\\(?!\\)", r"\\\\\\\\", content)

# Step 4: Verification
# Let's count how many \theta we have (should be \\theta in file)
thetas = len(re.findall(r"\\theta", content))
double_thetas = len(re.findall(r"\\\\theta", content))
print(f"Stats: single-backslash thetas: {thetas}, double-backslash thetas: {double_thetas}")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Math backslashes repaired.")

import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    full_content = f.read()

def normalize_math_strings(content):
    # This function safely normalizes backslashes for JS strings in HTML
    # Step 1: Reduce all backslash sequences to single backslashes
    content = re.sub(r"\\+", r"\\", content)
    # Step 2: Ensure all characters following a backslash that are letters get a double backslash
    # (JS: \\theta -> memory: \theta)
    content = re.sub(r"\\([a-zA-Z])", r"\\\\\1", content)
    # Step 3: Ensure all characters following a backslash that are NOT letters (like space, digits, or end of line) 
    # get a quadruple backslash (JS: \\\\ -> memory: \\ which is LaTeX newline)
    content = re.sub(r"\\(?![a-zA-Z])", r"\\\\\\\\", content)
    return content

# We only want to apply this to the data sections to avoid breaking HTML/CSS escapes
# Find the start of the data
data_start_markers = ["const videoQuestionsData =", "const WEEKS_DATA ="]
sections = []
last_pos = 0

# Sort markers by appearance
markers = []
for m in data_start_markers:
    pos = full_content.find(m)
    if pos != -1:
        markers.append((pos, m))
markers.sort()

new_content = ""
for pos, marker in markers:
    # Add non-data part
    new_content += full_content[last_pos:pos]
    
    # Find end of data block (roughly)
    # We look for the next major variable or end of script
    end_markers = ["const TRANSLATIONS =", "const app =", "</script>"]
    end_pos = len(full_content)
    for em in end_markers:
        found_em = full_content.find(em, pos)
        if found_em != -1 and found_em < end_pos:
            end_pos = found_em
            
    data_block = full_content[pos:end_pos]
    normalized_block = normalize_math_strings(data_block)
    new_content += normalized_block
    last_pos = end_pos

# Add remaining content
new_content += full_content[last_pos:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Backslash normalization (2 for commands, 4 for newlines) complete.")

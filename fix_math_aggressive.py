import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# We only want to target the data sections.
# There are two main data sections in index.html:
# 1. const videoQuestionsData
# 2. const WEEKS_DATA

def fix_section(section_name, text):
    start_pattern = f"const {section_name} ="
    start_pos = text.find(start_pattern)
    if start_pos == -1:
        return text
    
    # Efficiently find end of assignment (assuming it ends with ]; or }; or similar)
    # Since these are large blocks, we'll look for the next major variable declaration.
    end_markers = ["const TRANSLATIONS =", "const app =", "window.addEventListener"]
    end_pos = len(text)
    for marker in end_markers:
        pos = text.find(marker, start_pos)
        if pos != -1 and pos < end_pos:
            end_pos = pos
            
    head = text[:start_pos]
    body = text[start_pos:end_pos]
    tail = text[end_pos:]
    
    # Step 1: Normalize all backslash sequences to single \
    # We use a lambda to avoid re-escaping issues in the replacement string
    body = re.sub(r"\\+", r"\\", body)
    
    # Step 2: Now every LaTeX command starts with a single \
    # Turn every single \ into quadruple \\\\ for the file
    # (So it becomes double \\ in memory, which is a literal \ for KaTeX)
    # Wait, if I want double \\ in JS memory, I need quadruple \\\\ in the file?
    # No, for a JS string literal in an HTML file:
    # " \\ " in file -> " \ " in memory -> KaTeX sees \.
    # So TWO backslashes in the file are enough?
    # YES, " \\theta " in file -> \theta in memory.
    
    # Let's verify: 
    # In index.html: <script> var s = "\\theta"; </script>
    # The browser parses the script. the string constant s has 6 characters: \, t, h, e, t, a.
    # KaTeX sees \theta. Correct.
    
    # So we want TWO backslashes in the file.
    body = body.replace("\\", "\\\\")
    
    return head + body + tail

content = fix_section("videoQuestionsData", content)
content = fix_section("WEEKS_DATA", content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Backslashes normalized to double in data sections.")

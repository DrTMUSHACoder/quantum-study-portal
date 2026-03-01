import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

def safe_fix(text):
    # This function uses non-backslash delimiters to avoid re-escaping hell
    # 1. Standardize all backslash sequences to a single marker
    text = re.sub(r"\\+", "MARKER", text)
    
    # 2. Commands (MARKER followed by letter) -> Two backslashes in the file
    # We use a lambda to avoid backslash processing in the replacement string
    text = re.sub(r"MARKER([a-zA-Z])", lambda m: "\\\\" + m.group(1), text)
    
    # 3. Newlines/Standalone (Remaining MARKERs) -> Four backslashes in the file
    text = text.replace("MARKER", "\\\\\\\\")
    
    return text

new_content = content
for marker in ["const videoQuestionsData =", "const WEEKS_DATA ="]:
    start_pos = new_content.find(marker)
    if start_pos == -1: continue
    
    end_markers = ["const TRANSLATIONS =", "const app =", "</script>"]
    end_pos = len(new_content)
    for em in end_markers:
        found_em = new_content.find(em, start_pos)
        if found_em != -1 and found_em < end_pos:
            end_pos = found_em
            
    block = new_content[start_pos:end_pos]
    fixed = safe_fix(block)
    new_content = new_content[:start_pos] + fixed + new_content[end_pos:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Safe fix applied.")

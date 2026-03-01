import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

def final_fix(text):
    # Step 1: Reduce all sequences of 2 or more backslashes to exactly TWO
    # In regex, the replacement r"\\" produces one backslash. 
    # We want TWO backslashes in the file. So we need r"\\\\" in the replacement.
    text = re.sub(r"\\{2,}", r"\\\\\\\\", text)
    
    # Step 2: Fix single backslashes followed by a letter (they should be TWO)
    text = re.sub(r"(?<!\\)\\([a-zA-Z])", r"\\\\\\\\\1", text)
    
    # Step 3: Standalone single backslashes (not followed by letter)
    # These are likely matrix newlines that were single. They should be FOUR.
    # Actually, let's keep it simple. If we want matrix newlines to work,
    # they must be \\ in memory. So FOUR in file.
    # But usually people write them as \\ in the quiz data.
    text = re.sub(r"(?<!\\)\\(?![a-zA-Z])", r"\\\\\\\\\\\\\\\\", text)
    
    return text

new_content = content
for marker in ["const videoQuestionsData =", "const WEEKS_DATA ="]:
    pos = new_content.find(marker)
    if pos == -1: continue
    
    end_markers = ["const TRANSLATIONS =", "const app =", "</script>"]
    end_pos = len(new_content)
    for em in end_markers:
        found_em = new_content.find(em, pos)
        if found_em != -1 and found_em < end_pos:
            end_pos = found_em
            
    block = new_content[pos:end_pos]
    fixed = final_fix(block)
    new_content = new_content[:pos] + fixed + new_content[end_pos:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Final fix applied.")

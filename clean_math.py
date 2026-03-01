import re

filepath = r"e:\projects\quantum-study-portal\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

def clean_block(text):
    # 1. Reduce all backslash sequences to single backslashes
    while "\\\\" in text:
        text = text.replace("\\\\", "\\")
    
    # At this point, all math commands are \theta, \phi, etc.
    # All matrix newlines are also single \ (because \\ was reduced to \)
    
    # 2. Turn single backslashes followed by letters into double backslashes
    # (JS: \\theta -> memory: \theta)
    text = re.sub(r"\\([a-zA-Z])", r"\\\\\1", text)
    
    # 3. Turn remaining single backslashes into quadruple backslashes
    # This covers matrix newlines and explicit escapes for special chars
    # (JS: \\\\ -> memory: \\)
    text = text.replace("\\", "\\\\") # Wait! If I do this, it will double the existing \\theta!
    return text

def clean_block_v2(text):
    # 1. Reduce all backslash sequences to single backslash literals
    while "\\\\" in text:
        text = text.replace("\\\\", "\\")
    
    # 2. All commands like \theta are now \theta. Matrix newlines are now \.
    # Turn EVERY backslash into TWO
    text = text.replace("\\", "\\\\")
    
    # 3. Now everything has TWO: \\theta, \\ (matrix newline)
    # Turn \\ followed by non-letter into FOUR
    text = re.sub(r"\\\\(?![a-zA-Z])", r"\\\\\\\\", text)
    
    return text

# Apply to both blocks
new_content = content
for marker in ["const videoQuestionsData =", "const WEEKS_DATA ="]:
    start_pos = new_content.find(marker)
    if start_pos == -1: continue
    
    # Find end of block
    end_markers = ["const TRANSLATIONS =", "const app =", "</script>"]
    end_pos = len(new_content)
    for em in end_markers:
        found_em = new_content.find(em, start_pos)
        if found_em != -1 and found_em < end_pos:
            end_pos = found_em
            
    block = new_content[start_pos:end_pos]
    cleaned = clean_block_v2(block)
    new_content = new_content[:start_pos] + cleaned + new_content[end_pos:]

with open(filepath, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Math backslashes cleaned and normalized.")

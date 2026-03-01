"""
Parse OCR text files into structured Quiz JSON data.
Targets NPTEL quiz formats extracted by Mistral OCR.
"""

import re
import json
import os
from pathlib import Path

def parse_quiz_file(file_path):
    print(f"Parsing {file_path}...")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by pages to handle headers/footers if needed, 
    # but for questions cross-page splitting might be better to just ignore page separators.
    # The OCR output has "--- Page X ---" lines. We can filter them out or use them.
    # Let's remove page markers to treat text as a continuous stream.
    lines = content.splitlines()
    cleaned_lines = []
    skip_next = False
    
    # Pre-processing to remove headers/footers
    for line in lines:
        if line.startswith("--- Page") or line.startswith("2/12/26") or "Introduction to Quantum Computing" in line:
            continue
        if "https://onlinecourses.nptel.ac.in" in line:
            continue
        if line.strip() == "":
            continue
        cleaned_lines.append(line)

    text = "\n".join(cleaned_lines)
    
    # Split text into chunks based on Question numbering "1) ", "2) " ... "10) "
    # Regex to find question starters: named group for number
    # We look for a number at start of line followed by )
    question_pattern = re.compile(r'\n(\d+)\)\s')
    
    # Find all matches
    matches = list(question_pattern.finditer(text))
    
    questions = []
    
    for i in range(len(matches)):
        start_idx = matches[i].start()
        # End is start of next match or end of text
        end_idx = matches[i+1].start() if i + 1 < len(matches) else len(text)
        
        q_block = text[start_idx:end_idx]
        
        # Parse the individual block
        parsed_q = parse_question_block(q_block)
        if parsed_q:
            questions.append(parsed_q)

    return questions

def parse_question_block(block):
    # Split into lines
    lines = block.strip().splitlines()
    if not lines:
        return None
    
    # First line usually contains the question number and text
    # e.g. "1) Recall the Bloch sphere..."
    # We already know it matches the patter, let's extract ID
    first_line = lines[0]
    match = re.match(r'(\d+)\)\s*(.*)', first_line)
    if not match:
        return None
        
    q_num = match.group(1)
    q_text_start = match.group(2)
    
    # Collect full question text (it might be multi-line)
    # The question text ends when we see options or "Accepted Answers" or "Score"
    
    full_q_text = [q_text_start]
    current_idx = 1
    
    # Heuristics to stop question text:
    # - Line starts with "☐" (checkbox)
    # - Line starts with "(a)", "(b)"
    # - Line is "Accepted Answers:"
    # - Line is "Score:"
    # - Line is "Yes, the answer is correct." / "No,..."
    
    extracted_options = []
    accepted_answer_text = ""
    
    while current_idx < len(lines):
        line = lines[current_idx].strip()
        
        # Check for stop markers
        if (line.startswith("☐") or 
            re.match(r'\([a-d]\)', line) or 
            "Accepted Answers:" in line or 
            "Score:" in line or
            line.startswith("Yes,") or line.startswith("No,") or
            line.startswith("$$") and extracted_options): # LaTeX block usually option if we already have some text
            
            break
            
        full_q_text.append(line)
        current_idx += 1
        
    q_text_final = " ".join(full_q_text).strip()
    
    # Now extract options and metadata
    # We scan from current_idx onwards
    
    raw_options = []
    
    while current_idx < len(lines):
        line = lines[current_idx].strip()
        
        if line.startswith("☐"):
            raw_options.append(line.replace("☐", "").strip())
        elif re.match(r'^\([a-d]\)', line):
            raw_options.append(line)
        elif line.startswith("$$"):
             raw_options.append(line.replace("$$", "").strip())
        elif "Accepted Answers:" in line:
            # Handle Accepted Answers
            parts = line.split("Accepted Answers:", 1)
            if parts[1].strip():
                accepted_answer_text = parts[1].strip()
            elif current_idx + 1 < len(lines):
                 accepted_answer_text = lines[current_idx+1].strip()
            current_idx += 1 # skip next line if we consumed it? No, loop handles incr
            continue
        elif "Score:" in line or "Yes, the answer" in line or "No, the answer" in line:
            pass
        else:
             # Heuristic for implicit options (e.g. math lines in Week 1)
             # If line is short-ish and we are in the "options zone" (after question text), treat as option
             # OR if it looks like a continuation of previous option
             # OR if it's a math expression
             is_math = "$" in line or "\\" in line or "=" in line
             if is_math and len(line) < 100:
                 raw_options.append(line)
             elif len(raw_options) > 0:
                 # Append to previous option if it looks like continuation
                 raw_options[-1] += " " + line
             elif len(line) < 50 and len(full_q_text) > 2: # Short line after long question text
                 raw_options.append(line)
        
        current_idx += 1

    # Cleanup options
    # Some quizzes don't have explicit options (text entry?), but OCR often captures checking boxes "☐"
    # If no options found but there is an Accepted Answer, we might need to infer or it's a "fill in blank" turned into multiple choice in our app?
    # Our app expects options.
    
    # If accepted answer is present, try to match it to options to find index
    correct_idx = 0
    
    if len(raw_options) == 0 and accepted_answer_text:
        # Maybe the options weren't captured with checkboxes. 
        # Sometimes options are just lines.
        # But broadly, if we can't find options, we treat it as a single-answer question? 
        # For now let's just create an option with the correct answer so it's usable.
        raw_options = [accepted_answer_text]
        correct_idx = 0
    else:
        # fuzzy match accepted answer
        best_ratio = 0
        for i, opt in enumerate(raw_options):
            # very simple exact match check first
            if accepted_answer_text in opt or opt in accepted_answer_text:
                correct_idx = i
                break
            
            # Use basic overlap
            common = set(accepted_answer_text.split()) & set(opt.split())
            if len(common) > 0:
                correct_idx = i # primitive
                
    return {
        "id": q_num,
        "q": q_text_final,
        "options": raw_options if raw_options else ["True", "False"], # Fallback
        "answer": correct_idx,
        "explanation": f"Accepted Answer: {accepted_answer_text}"
    }

def main():
    base_path = Path("ocr_output")
    files_to_parse = [
        ("Week1_Quiz_ocr.txt", 1),
        ("assigment2_ocr.txt", 2),
         # Add others if they exist
    ]
    
    # Check for other assignment files
    if (base_path / "assigment3_ocr.txt").exists():
        files_to_parse.append(("assigment3_ocr.txt", 3))
    if (base_path / "assigment4_ocr.txt").exists():
        files_to_parse.append(("assigment4_ocr.txt", 4))

    all_data = {}

    for fname, week_num in files_to_parse:
        fpath = base_path / fname
        if not fpath.exists():
            print(f"Skipping {fname}, not found.")
            continue
            
        questions = parse_quiz_file(fpath)
        print(f"Extracted {len(questions)} questions from Week {week_num}")
        
        # converting to the format used in index.html var videoQuestionsData
        # structure: { week_num: { "Set 1": [ ...questions... ] } }
        
        quiz_set_key = f"Assignment {week_num}"
        
        formatted_qs = []
        for q in questions:
            formatted_qs.append({
                "q": q["q"],
                "options": q["options"],
                "answer": q["answer"],
                "explanation": q["explanation"],
                "id": f"{week_num}_{q['id']}" 
            })
            
        if week_num not in all_data:
            all_data[week_num] = {}
        
        all_data[week_num][quiz_set_key] = formatted_qs

    # Write to file
    out_file = base_path / "extracted_quizzes.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)
        
    print(f"Saved extracted quizzes to {out_file}")

if __name__ == "__main__":
    main()

"""
Inject extracted quiz data into index.html
Maps "Assignment X" to Set 21 for each week.
"""

import json
import re
from pathlib import Path

def main():
    html_path = Path("index.html")
    json_path = Path("ocr_output/extracted_quizzes.json")
    
    if not html_path.exists() or not json_path.exists():
        print("Files not found.")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        quiz_data = json.load(f)

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Generate new JS entries
    new_js_entries = []
    
    new_js_entries.append("\n      // --- INJECTED OCT EXTRACTED QUIZZES ---")

    for week_str, week_content in quiz_data.items():
        week_num = int(week_str)
        # Find the assignment array
        # Key in json is like "Assignment 1"
        assignment_key = f"Assignment {week_num}"
        if assignment_key not in week_content:
            # Try to find any key
            keys = list(week_content.keys())
            if keys:
                assignment_key = keys[0]
            else:
                continue

        questions = week_content[assignment_key]
        
        new_js_entries.append(f"\n      // Week {week_num} - NPTEL Assignment (Set 21)")
        
        for i, q in enumerate(questions):
            q_idx = i + 1
            # key format: week_set_question
            # Set 21 is the first NPTEL set slot in the app
            js_key = f"{week_num}_21_{q_idx}"
            
            # Escape quotes in strings
            q_text = q['q'].replace('"', '\\"').replace('\n', ' ')
            ans_idx = q['answer']
            explanation = q['explanation'].replace('"', '\\"').replace('\n', ' ')
            
            # Options array
            opts_js = "[" + ", ".join([f'"{opt.replace("\"", "\\\"").strip()}"' for opt in q['options']]) + "]"
            
            entry = f'      "{js_key}": {{ q: "{q_text}", options: {opts_js}, answer: {ans_idx}, explanation: "{explanation}", clue: "From NPTEL Assignment" }},'
            new_js_entries.append(entry)

    # Join all new entries
    injection_block = "\n".join(new_js_entries)
    
    # Find insertion point: the end of videoQuestionsData object
    # We look for "const WEEKS_DATA" and find the closing "};" before it
    
    match = re.search(r'(};\s*const WEEKS_DATA)', html_content)
    if not match:
        # Try finding just const WEEKS_DATA
        match = re.search(r'(const WEEKS_DATA)', html_content)
        if not match:
            print("Could not find insertion point (videoQuestionsData end or WEEKS_DATA start).")
            return
        
        # Look backwards for "};"
        # minimal approach: insert before the match
        # But we need to be inside the previous object.
        # This regex approach is risky if formatting varies.
        pass

    # Alternative: Look for the specific line 1412 "      }" and 1413 "    };" context from previous view_file
    # We saw:
    # 1411:         quiz_nptel: "NPTEL Quiz/Solutions (5)"
    # 1412:       }
    # 1413:     };
    
    # We want to insert into videoQuestionsData, so BEFORE line 1413.
    # The videoQuestionsData ends at 1413.
    # But wait, line 1412 "}" is closing TRANSLATIONS object?
    # Let me check "view_file" again.
    # Ah, I see "1412: }" and "1413: };".
    # And BEFORE that at 1411 it was closing TRANSLATIONS keys?
    # NO. 
    # Line 1400-1412 is "enrolled: ... quiz_nptel: ...". 
    # THAT looks like "TRANSLATIONS" object, NOT "videoQuestionsData".
    
    # I need to find where "videoQuestionsData" ENDS.
    # In the view_file of lines 1-100, videoQuestionsData started at line 80.
    # It must contain the questions.
    # The block I saw at 1400 was TRANSLATIONS!
    
    # I need to search for "videoQuestionsData" closing brace.
    # Since I don't know exactly where it ends, I'll search for the start of TRANSLATIONS or WEEKS_DATA and assume videoQuestionsData ends before it?
    # Let's check where videoQuestionsData IS defined.
    
    # Re-reading file content logic...
    # I will modify this script to FIND the end of videoQuestionsData properly.
    pass

if __name__ == "__main__":
    main()

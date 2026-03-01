import re
import json
import os

def extract_questions(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the videoQuestionsData object
    # It starts with 'const videoQuestionsData = {' and ends with '};'
    match = re.search(r'const videoQuestionsData = \{(.*?)\};', content, re.DOTALL)
    if not match:
        print("Could not find videoQuestionsData in the file.")
        return

    data_str = match.group(1)
    
    # Simple regex to extract the keys and values
    # Format: "key": { q: "...", options: [...], answer: X, explanation: "...", clue: "..." }
    pattern = r'"(\d+_\d+_\d+)":\s*\{\s*q:\s*"(.*?)",\s*options:\s*\[(.*?)\]\s*,\s*answer:\s*(\d+),\s*explanation:\s*"(.*?)",\s*clue:\s*"(.*?)"\s*\}'
    
    questions = {}
    for match in re.finditer(pattern, data_str, re.DOTALL):
        key, q, options_str, answer, explanation, clue = match.groups()
        
        # Clean up options
        options = [opt.strip().strip('"').strip("'") for opt in options_str.split(',')]
        
        questions[key] = {
            "question": q,
            "options": options,
            "answer": int(answer),
            "explanation": explanation,
            "clue": clue
        }
    
    return questions

file_path = r"e:\projects\quantum-study-portal\index.html"
data = extract_questions(file_path)

if data:
    output_file = r"e:\projects\quantum-study-portal\quiz_data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"Successfully extracted {len(data)} questions to {output_file}")
else:
    print("No data extracted.")

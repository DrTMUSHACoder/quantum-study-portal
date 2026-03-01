import PyPDF2
import os

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        return f"Error: {e}"

base_path = r"e:\projects\quantum-study-portal\resources\Transcript"
weeks = [1, 2, 3, 4]

for w in weeks:
    week_dir = os.path.join(base_path, f"Week{w}")
    if not os.path.exists(week_dir):
        continue
    print(f"--- WEEK {w} ---")
    files = sorted([f for f in os.listdir(week_dir) if f.endswith('.pdf')])
    for f in files:
        f_path = os.path.join(week_dir, f)
        text = extract_text_from_pdf(f_path)
        # Just print first 1000 chars to avoid overwhelming output
        print(f"[{f}] {text[:500]}...")
    print("\n")

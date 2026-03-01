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

pdf_files = ["week 1 NQ.pdf", "week 2 NQ.pdf", "week 3 NQ.pdf", "week 4 NQ.pdf"]

for f in pdf_files:
    if os.path.exists(f):
        print(f"--- {f} ---")
        text = extract_text_from_pdf(f)
        print(text[:2000])
        print("\n" + "="*50 + "\n")
    else:
        print(f"File not found: {f}")

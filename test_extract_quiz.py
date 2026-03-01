import PyPDF2
import os

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            print(f"Number of pages: {len(reader.pages)}")
            print(f"Is encrypted: {reader.is_encrypted}")
            text = ""
            for i, page in enumerate(reader.pages):
                page_text = page.extract_text()
                print(f"Page {i} text length: {len(page_text) if page_text else 0}")
                if page_text:
                    text += page_text
            return text
    except Exception as e:
        return f"Error: {e}"

pdf_path = r"e:\projects\quantum-study-portal\resources\week_1\Quiz\Week1_Quiz.pdf"
print(f"Checking {pdf_path}...")
if not os.path.exists(pdf_path):
    print("File does not exist!")
else:
    text = extract_text_from_pdf(pdf_path)
    print(f"Extracted length: {len(text)}")
    print(text)

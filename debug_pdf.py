import PyPDF2
import os

def debug_pdf(pdf_path):
    print(f"Checking {pdf_path}...")
    if not os.path.exists(pdf_path):
        print("File does not exist!")
        return

    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            print(f"Num Pages: {len(reader.pages)}")
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                print(f"Page {i+1} text length: {len(text)}")
                if text:
                    print(f"Sample: {text[:100]}...")
                
                # Check for images or other objects
                if '/Resources' in page:
                    res = page['/Resources']
                    if '/XObject' in res:
                        xobj = res['/XObject']
                        print(f"Page {i+1} XObjects: {list(xobj.keys())}")
                    else:
                        print(f"Page {i+1} No XObjects")
                else:
                    print(f"Page {i+1} No Resources")

    except Exception as e:
        print(f"Error: {e}")

pdf_path = r"e:\projects\quantum-study-portal\resources\week_1\Quiz\Week1_Quiz.pdf"
debug_pdf(pdf_path)

pdf_path = r"e:\projects\quantum-study-portal\resources\week_1\Quiz\assignment _solutions.pdf"
debug_pdf(pdf_path)

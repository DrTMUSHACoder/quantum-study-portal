"""
Retry script for 2 failed PDFs with increased timeout.
"""
import os, sys, json, base64, time
from pathlib import Path

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

MISTRAL_API_KEY = "OOwIqsR3RhSz9oPPoq2tAqQh3x2L34fD"
OUTPUT_DIR = Path("ocr_output")

FAILED_FILES = [
    Path("resources/week_3/lecture note/Grover_lecture_whiteboard_notes.pdf"),
    Path("resources/week_4/lecture notes/Week4_QEC.pdf"),
]

def extract_with_retry(pdf_path, max_retries=3):
    from mistralai import Mistral
    import httpx

    # Initialize client with extended timeout via httpx
    client = Mistral(
        api_key=MISTRAL_API_KEY,
        server_url="https://api.mistral.ai",
    )
    # Override the HTTP client timeout for large files
    client._client = httpx.Client(timeout=httpx.Timeout(600.0, connect=60.0))

    file_size_mb = pdf_path.stat().st_size / (1024 * 1024)
    print(f"\n>> Processing: {pdf_path}")
    print(f"   File size: {file_size_mb:.1f} MB")

    for attempt in range(1, max_retries + 1):
        print(f"   Attempt {attempt}/{max_retries}...", end=" ", flush=True)
        start = time.time()

        try:
            with open(pdf_path, "rb") as f:
                pdf_data = base64.standard_b64encode(f.read()).decode("utf-8")

            ocr_response = client.ocr.process(
                model="mistral-ocr-latest",
                document={
                    "type": "document_url",
                    "document_url": f"data:application/pdf;base64,{pdf_data}"
                }
            )

            pages = []
            if hasattr(ocr_response, 'pages'):
                for page in ocr_response.pages:
                    pages.append({
                        "page_number": page.index if hasattr(page, 'index') else len(pages) + 1,
                        "text": page.markdown if hasattr(page, 'markdown') else str(page),
                        "text_length": len(page.markdown) if hasattr(page, 'markdown') else 0,
                    })

            elapsed = time.time() - start
            total_chars = sum(p["text_length"] for p in pages)
            print(f"OK! ({elapsed:.1f}s, {total_chars} chars, {len(pages)} pages)")

            result = {
                "file": str(pdf_path),
                "file_name": pdf_path.name,
                "success": True,
                "winner": "mistral",
                "total_pages": len(pages),
                "total_chars": total_chars,
                "pages": pages,
            }

            # Save JSON
            out_json = OUTPUT_DIR / (pdf_path.stem + "_ocr.json")
            with open(out_json, "w", encoding="utf-8") as f:
                json.dump(result, f, indent=2, ensure_ascii=False)

            # Save TXT
            out_txt = OUTPUT_DIR / (pdf_path.stem + "_ocr.txt")
            with open(out_txt, "w", encoding="utf-8") as f:
                f.write(f"# OCR Extraction: {pdf_path.name}\n")
                f.write(f"# Engine: mistral (retry)\n")
                f.write(f"# Pages: {len(pages)}\n")
                f.write(f"# Total Characters: {total_chars}\n")
                f.write("=" * 60 + "\n\n")
                for page in pages:
                    f.write(f"\n--- Page {page['page_number']} ---\n\n")
                    f.write(page["text"])
                    f.write("\n")

            print(f"   Saved: {out_json.name} + {out_txt.name}")
            return True

        except Exception as e:
            elapsed = time.time() - start
            print(f"FAIL ({elapsed:.1f}s) - {str(e)[:100]}")
            if attempt < max_retries:
                wait = 10 * attempt
                print(f"   Waiting {wait}s before retry...")
                time.sleep(wait)

    print(f"   All {max_retries} attempts failed for {pdf_path.name}")
    return False


if __name__ == "__main__":
    print("=" * 60)
    print("  RETRY: 2 Failed PDFs (with 10-min timeout)")
    print("=" * 60)

    success = 0
    for pdf in FAILED_FILES:
        if pdf.exists():
            if extract_with_retry(pdf):
                success += 1
        else:
            print(f"\n[SKIP] File not found: {pdf}")

    print(f"\n{'=' * 60}")
    print(f"  DONE: {success}/{len(FAILED_FILES)} files recovered")
    print(f"{'=' * 60}")

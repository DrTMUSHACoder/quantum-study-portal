"""
============================================================
  DUAL OCR PIPELINE: Mistral OCR + Chandra OCR
  Extract text from image-based NPTEL PDFs
============================================================

This script uses BOTH Mistral OCR and Chandra OCR APIs to extract
text from image-based PDFs, compares results, and picks the best
output for each page.

Setup:
  pip install mistralai httpx

API Keys (set as environment variables or edit below):
  MISTRAL_API_KEY  -> from https://console.mistral.ai
  CHANDRA_API_KEY  -> from https://www.datalab.to
"""

import os
import sys
import json
import base64
import time
from pathlib import Path

# Force UTF-8 output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# ------------------------------------------
# CONFIGURATION
# ------------------------------------------
MISTRAL_API_KEY = os.environ.get("MISTRAL_API_KEY", "OOwIqsR3RhSz9oPPoq2tAqQh3x2L34fD")
CHANDRA_API_KEY = os.environ.get("CHANDRA_API_KEY", "2YQd12PGhI08GPfRx26wRBx1cy5tNao2zk889cbq4Wc")

# Output directory
OUTPUT_DIR = Path("ocr_output")
OUTPUT_DIR.mkdir(exist_ok=True)

# PDF directories to process
PDF_DIRS = [
    Path("resources/week_1/Quiz"),
    Path("resources/week_1/Lecture Notes"),
    Path("resources/week_2/lecture note"),
    Path("resources/week_2/quize"),
    Path("resources/week_3/lecture note"),
    Path("resources/week_3/quizes"),
    Path("resources/week_4/lecture notes"),
    Path("resources/week_4/quiz"),
    Path("resources/Transcript"),
]


# ------------------------------------------
# MISTRAL OCR ENGINE
# ------------------------------------------
class MistralOCR:
    """Extract text from PDFs using Mistral OCR API."""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.client = None
        self.available = False
        self._init_client()

    def _init_client(self):
        if self.api_key == "YOUR_MISTRAL_API_KEY":
            print("[WARN] Mistral API key not set. Skipping Mistral OCR.")
            return
        try:
            from mistralai import Mistral
            self.client = Mistral(api_key=self.api_key)
            self.available = True
            print("[OK] Mistral OCR initialized successfully.")
        except ImportError:
            print("[WARN] 'mistralai' package not installed. Run: pip install mistralai")
        except Exception as e:
            print(f"[WARN] Mistral init error: {e}")

    def extract_from_pdf(self, pdf_path: str) -> dict:
        """Extract text from a PDF file using Mistral OCR."""
        if not self.available:
            return {"engine": "mistral", "success": False, "error": "Not available", "pages": []}

        try:
            # Read PDF and encode as base64
            with open(pdf_path, "rb") as f:
                pdf_data = base64.standard_b64encode(f.read()).decode("utf-8")

            # Use Mistral OCR API
            ocr_response = self.client.ocr.process(
                model="mistral-ocr-latest",
                document={
                    "type": "document_url",
                    "document_url": f"data:application/pdf;base64,{pdf_data}"
                }
            )

            # Parse response
            pages = []
            if hasattr(ocr_response, 'pages'):
                for page in ocr_response.pages:
                    page_data = {
                        "page_number": page.index if hasattr(page, 'index') else len(pages) + 1,
                        "text": page.markdown if hasattr(page, 'markdown') else str(page),
                        "text_length": len(page.markdown) if hasattr(page, 'markdown') else 0,
                    }
                    pages.append(page_data)
            elif isinstance(ocr_response, dict):
                for i, page in enumerate(ocr_response.get('pages', [])):
                    pages.append({
                        "page_number": i + 1,
                        "text": page.get('markdown', page.get('text', '')),
                        "text_length": len(page.get('markdown', page.get('text', ''))),
                    })

            return {
                "engine": "mistral",
                "success": True,
                "total_pages": len(pages),
                "pages": pages,
                "total_chars": sum(p["text_length"] for p in pages)
            }

        except Exception as e:
            return {"engine": "mistral", "success": False, "error": str(e), "pages": []}


# ------------------------------------------
# CHANDRA OCR ENGINE
# ------------------------------------------
class ChandraOCR:
    """Extract text from PDFs using Chandra OCR (Datalab) API."""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.available = False
        self._init_client()

    def _init_client(self):
        if self.api_key == "YOUR_CHANDRA_API_KEY":
            print("[WARN] Chandra API key not set. Skipping Chandra OCR.")
            return
        try:
            import httpx
            self.available = True
            print("[OK] Chandra OCR (API via httpx) initialized successfully.")
            self.mode = "api"
        except ImportError:
            print("[WARN] 'httpx' not installed. Run: pip install httpx")

    def extract_from_pdf(self, pdf_path: str) -> dict:
        """Extract text from a PDF file using Chandra OCR."""
        if not self.available:
            return {"engine": "chandra", "success": False, "error": "Not available", "pages": []}

        try:
            return self._extract_via_api(pdf_path)
        except Exception as e:
            return {"engine": "chandra", "success": False, "error": str(e), "pages": []}

    def _extract_via_api(self, pdf_path: str) -> dict:
        """Use Datalab's hosted Chandra/Marker OCR API via HTTP."""
        import httpx

        url = "https://www.datalab.to/api/v1/marker"

        with open(pdf_path, "rb") as f:
            files = {"file": (os.path.basename(pdf_path), f, "application/pdf")}
            headers = {"X-Api-Key": self.api_key}
            data = {
                "output_format": "markdown",
                "force_ocr": "true",
                "paginate_output": "true",
            }
            response = httpx.post(url, files=files, data=data, headers=headers, timeout=120)

        # Detect credit exhaustion
        if response.status_code in (402, 429, 403):
            self.available = False
            print("\n   [!!] Chandra credits exhausted! Switching to Mistral only.")
            return {"engine": "chandra", "success": False, "error": f"Credits exhausted (HTTP {response.status_code})", "pages": [], "credits_exhausted": True}

        if response.status_code != 200:
            return {"engine": "chandra", "success": False, "error": f"HTTP {response.status_code}: {response.text[:200]}", "pages": []}

        result = response.json()

        # Check if it's an async request (returns request_check_url)
        if "request_check_url" in result:
            return self._poll_async_result(result["request_check_url"])

        # Direct result
        pages = []
        if "pages" in result:
            for i, page_text in enumerate(result["pages"]):
                pages.append({
                    "page_number": i + 1,
                    "text": page_text if isinstance(page_text, str) else str(page_text),
                    "text_length": len(str(page_text)),
                })
        elif "markdown" in result:
            pages.append({
                "page_number": 1,
                "text": result["markdown"],
                "text_length": len(result["markdown"]),
            })

        return {
            "engine": "chandra",
            "success": True,
            "total_pages": len(pages),
            "pages": pages,
            "total_chars": sum(p["text_length"] for p in pages)
        }

    def _poll_async_result(self, check_url: str) -> dict:
        """Poll for async job completion."""
        import httpx

        headers = {"X-Api-Key": self.api_key}
        max_wait = 300  # 5 minutes
        start = time.time()

        while time.time() - start < max_wait:
            time.sleep(5)
            resp = httpx.get(check_url, headers=headers, timeout=30)
            if resp.status_code == 200:
                data = resp.json()
                status = data.get("status", "")
                if status == "complete":
                    pages = []
                    if "pages" in data:
                        for i, page_text in enumerate(data["pages"]):
                            pages.append({
                                "page_number": i + 1,
                                "text": str(page_text),
                                "text_length": len(str(page_text)),
                            })
                    elif "markdown" in data:
                        pages.append({"page_number": 1, "text": data["markdown"], "text_length": len(data["markdown"])})
                    return {"engine": "chandra", "success": True, "total_pages": len(pages), "pages": pages, "total_chars": sum(p["text_length"] for p in pages)}
                elif status == "error":
                    return {"engine": "chandra", "success": False, "error": data.get("error", "Unknown"), "pages": []}
                print(f"   ... Chandra processing ({status})")
            elif resp.status_code in (402, 429, 403):
                self.available = False
                return {"engine": "chandra", "success": False, "error": "Credits exhausted during polling", "pages": []}

        return {"engine": "chandra", "success": False, "error": "Timeout after 5 minutes", "pages": []}


# ------------------------------------------
# DUAL OCR PIPELINE
# ------------------------------------------
class DualOCRPipeline:
    """
    Run both Mistral and Chandra OCR on each PDF,
    compare results, and pick the best output per page.
    """

    def __init__(self):
        print("\n" + "=" * 60)
        print("  DUAL OCR PIPELINE: Mistral + Chandra")
        print("=" * 60)
        self.mistral = MistralOCR(MISTRAL_API_KEY)
        self.chandra = ChandraOCR(CHANDRA_API_KEY)
        print()

        if not self.mistral.available and not self.chandra.available:
            print("[ERROR] No OCR engine available!")
            print("   Set at least one API key:")
            print("   - MISTRAL_API_KEY (from https://console.mistral.ai)")
            print("   - CHANDRA_API_KEY (from https://www.datalab.to)")
            sys.exit(1)

    def find_all_pdfs(self) -> list:
        """Find all PDFs in the configured directories."""
        pdfs = []
        for dir_path in PDF_DIRS:
            if dir_path.exists():
                for pdf in sorted(dir_path.rglob("*.pdf")):
                    pdfs.append(pdf)
        return pdfs

    def process_single_pdf(self, pdf_path: Path) -> dict:
        """Process a single PDF through both OCR engines."""
        print(f"\n>> Processing: {pdf_path}")
        print(f"   File size: {pdf_path.stat().st_size / 1024:.1f} KB")

        results = {}

        # Run Mistral OCR
        if self.mistral.available:
            print("   [Mistral] Running...", end=" ", flush=True)
            start = time.time()
            results["mistral"] = self.mistral.extract_from_pdf(str(pdf_path))
            elapsed = time.time() - start
            if results["mistral"]["success"]:
                print(f"OK ({elapsed:.1f}s, {results['mistral']['total_chars']} chars)")
            else:
                print(f"FAIL ({results['mistral']['error']})")

        # Run Chandra OCR
        if self.chandra.available:
            print("   [Chandra] Running...", end=" ", flush=True)
            start = time.time()
            results["chandra"] = self.chandra.extract_from_pdf(str(pdf_path))
            elapsed = time.time() - start
            if results["chandra"]["success"]:
                print(f"OK ({elapsed:.1f}s, {results['chandra']['total_chars']} chars)")
            else:
                print(f"FAIL ({results['chandra']['error']})")
                # Check if credits exhausted — future PDFs will skip Chandra
                if results["chandra"].get("credits_exhausted"):
                    print("   >> Chandra disabled. Remaining files use Mistral only.")

        # Merge and pick best
        merged = self._merge_results(results, pdf_path)
        return merged

    def _merge_results(self, results: dict, pdf_path: Path) -> dict:
        """Compare results from both engines and pick the best per page."""
        mistral_ok = results.get("mistral", {}).get("success", False)
        chandra_ok = results.get("chandra", {}).get("success", False)

        # If only one engine available/succeeded
        if mistral_ok and not chandra_ok:
            winner = "mistral"
            merged_pages = results["mistral"]["pages"]
        elif chandra_ok and not mistral_ok:
            winner = "chandra"
            merged_pages = results["chandra"]["pages"]
        elif mistral_ok and chandra_ok:
            # Both succeeded -- compare page by page
            winner = "merged"
            merged_pages = self._compare_pages(
                results["mistral"]["pages"],
                results["chandra"]["pages"]
            )
        else:
            return {
                "file": str(pdf_path),
                "success": False,
                "error": "Both engines failed",
                "mistral_error": results.get("mistral", {}).get("error", "N/A"),
                "chandra_error": results.get("chandra", {}).get("error", "N/A"),
            }

        total_chars = sum(p["text_length"] for p in merged_pages)
        print(f"   => Winner: {winner.upper()} | {total_chars} chars across {len(merged_pages)} pages")

        return {
            "file": str(pdf_path),
            "file_name": pdf_path.name,
            "success": True,
            "winner": winner,
            "total_pages": len(merged_pages),
            "total_chars": total_chars,
            "pages": merged_pages,
            "raw_results": {
                "mistral": results.get("mistral", {}).get("total_chars", 0),
                "chandra": results.get("chandra", {}).get("total_chars", 0),
            }
        }

    def _compare_pages(self, mistral_pages: list, chandra_pages: list) -> list:
        """Compare page-by-page and pick the richer result."""
        max_pages = max(len(mistral_pages), len(chandra_pages))
        merged = []

        for i in range(max_pages):
            m_page = mistral_pages[i] if i < len(mistral_pages) else None
            c_page = chandra_pages[i] if i < len(chandra_pages) else None

            if m_page and c_page:
                # Pick the one with more text (likely more complete extraction)
                m_len = m_page["text_length"]
                c_len = c_page["text_length"]

                if m_len >= c_len:
                    chosen = {**m_page, "chosen_engine": "mistral", "alt_chars": c_len}
                else:
                    chosen = {**c_page, "chosen_engine": "chandra", "alt_chars": m_len}
                merged.append(chosen)
            elif m_page:
                merged.append({**m_page, "chosen_engine": "mistral"})
            elif c_page:
                merged.append({**c_page, "chosen_engine": "chandra"})

        return merged

    def run(self, specific_files: list = None):
        """Run the full pipeline on all PDFs."""
        if specific_files:
            pdfs = [Path(f) for f in specific_files if Path(f).exists()]
        else:
            pdfs = self.find_all_pdfs()

        if not pdfs:
            print("[ERROR] No PDFs found to process.")
            return

        print(f"\nFound {len(pdfs)} PDF files to process")
        print("-" * 60)

        all_results = []
        success_count = 0
        fail_count = 0

        for i, pdf in enumerate(pdfs, 1):
            print(f"\n[{i}/{len(pdfs)}]", end="")
            result = self.process_single_pdf(pdf)
            all_results.append(result)

            if result.get("success"):
                success_count += 1
                # Save individual result
                out_name = pdf.stem + "_ocr.json"
                out_path = OUTPUT_DIR / out_name
                with open(out_path, "w", encoding="utf-8") as f:
                    json.dump(result, f, indent=2, ensure_ascii=False)

                # Also save as plain text
                txt_name = pdf.stem + "_ocr.txt"
                txt_path = OUTPUT_DIR / txt_name
                with open(txt_path, "w", encoding="utf-8") as f:
                    f.write(f"# OCR Extraction: {pdf.name}\n")
                    f.write(f"# Engine: {result.get('winner', 'unknown')}\n")
                    f.write(f"# Pages: {result['total_pages']}\n")
                    f.write(f"# Total Characters: {result['total_chars']}\n")
                    f.write("=" * 60 + "\n\n")
                    for page in result["pages"]:
                        f.write(f"\n--- Page {page['page_number']} ---\n\n")
                        f.write(page["text"])
                        f.write("\n")
            else:
                fail_count += 1

        # Save summary
        summary = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "total_files": len(pdfs),
            "successful": success_count,
            "failed": fail_count,
            "engines_used": {
                "mistral": self.mistral.available,
                "chandra": self.chandra.available,
            },
            "files": [
                {
                    "file": r["file"],
                    "success": r.get("success", False),
                    "winner": r.get("winner", "N/A"),
                    "total_chars": r.get("total_chars", 0),
                    "total_pages": r.get("total_pages", 0),
                }
                for r in all_results
            ]
        }

        summary_path = OUTPUT_DIR / "extraction_summary.json"
        with open(summary_path, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2, ensure_ascii=False)

        # Print final report
        print("\n" + "=" * 60)
        print("  EXTRACTION REPORT")
        print("=" * 60)
        print(f"  Total PDFs processed : {len(pdfs)}")
        print(f"  Successful           : {success_count}")
        print(f"  Failed               : {fail_count}")
        print(f"  Output directory     : {OUTPUT_DIR.absolute()}")
        print(f"  Summary file         : {summary_path}")
        print("=" * 60)


# ------------------------------------------
# MAIN
# ------------------------------------------
if __name__ == "__main__":
    # You can pass specific PDF paths as arguments
    # OR run with no args to process all PDFs
    if len(sys.argv) > 1:
        files = sys.argv[1:]
        pipeline = DualOCRPipeline()
        pipeline.run(specific_files=files)
    else:
        pipeline = DualOCRPipeline()
        pipeline.run()

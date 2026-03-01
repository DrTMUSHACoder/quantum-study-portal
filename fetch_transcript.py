from youtube_transcript_api import YouTubeTranscriptApi
from fpdf import FPDF
import os
import sys

video_id = "fHsySd6tgHE"

def get_transcript(video_id):
    # Try multiple ways to get the transcript
    try:
        # Method 1: Standard static method
        return YouTubeTranscriptApi.get_transcript(video_id)
    except AttributeError:
        pass
    except Exception as e:
        # print(f"Method 1 failed: {e}")
        pass

    try:
        # Method 2: Instance method 'get_transcript'
        api = YouTubeTranscriptApi()
        return api.get_transcript(video_id)
    except (AttributeError, TypeError):
        pass
    except Exception as e:
        # print(f"Method 2 failed: {e}")
        pass

    try:
        # Method 3: 'fetch' method
        api = YouTubeTranscriptApi()
        result = api.fetch(video_id)
        if result: return result
    except (AttributeError, TypeError):
        pass
    except Exception as e:
         # print(f"Method 3 failed: {e}")
         pass

    return None

print(f"Fetching transcript for video ID: {video_id}...")
transcript_list = get_transcript(video_id)

if not transcript_list:
    print("Failed to fetch transcript using generic methods.")
    # One last attempt: direct usage if possible
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    except:
        print("Final attempt failed.")
        sys.exit(1)

print("Transcript fetched successfully.")

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Video Transcript', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, 'Page ' + str(self.page_no()), 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font("Arial", size=12)

full_text = ""
for item in transcript_list:
    # Handle both dictionary and object/snippet types
    text = ""
    if isinstance(item, dict) and 'text' in item:
        text = item['text']
    elif hasattr(item, 'text'):
        text = item.text
    else:
        # distinct fallback
        try:
             text = str(item)
        except:
             continue

    # Basic sanitization for FPDF standard fonts
    text = text.replace('\n', ' ').replace('\r', '')
    full_text += text + " "

# Encode to latin-1 to avoid unicode errors with standard fonts
full_text = full_text.encode('latin-1', 'replace').decode('latin-1')

pdf.multi_cell(0, 10, txt=full_text)

output_filename = "transcript_fHsySd6tgHE.pdf"
pdf.output(output_filename)

print(f"SUCCESS: Transcript saved to {os.path.abspath(output_filename)}")

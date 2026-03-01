from youtube_transcript_api import YouTubeTranscriptApi
from fpdf import FPDF
import sys
import os
import re

# Video ID from the URL
video_id = "voSRtTKiTQo"
output_name = "Lecture_2_voSRtTKiTQo"

print(f"Processing video: {video_id}")

# Fetch transcript
def get_transcript(video_id):
    try: return YouTubeTranscriptApi.get_transcript(video_id)
    except: pass
    try: api = YouTubeTranscriptApi(); return api.get_transcript(video_id)
    except: pass
    try: api = YouTubeTranscriptApi(); return api.fetch(video_id)
    except: pass
    return None

transcript = get_transcript(video_id)
if not transcript:
    print("Failed to fetch transcript.")
    sys.exit(1)

print("Transcript fetched successfully!")

# Process text
full_text = ""
for item in transcript:
    t = ""
    if isinstance(item, dict) and 'text' in item:
        t = item['text']
    elif hasattr(item, 'text'):
        t = item.text
    else:
        try: t = str(item)
        except: continue
    full_text += t + " "

full_text = full_text.replace('\n', ' ')
sentences = re.split(r'(?<=[.!?]) +', full_text)

# Group into paragraphs (3 sentences per bullet)
paragraphs = []
chunk = ""
count = 0
for s in sentences:
    if not s.strip(): continue
    chunk += s + " "
    count += 1
    if count >= 3:
        paragraphs.append(chunk.strip())
        chunk = ""
        count = 0
if chunk:
    paragraphs.append(chunk.strip())

# Generate PDF
class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Lecture 2 - Video Transcript', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font("Arial", size=11)
pdf.set_auto_page_break(auto=True, margin=15)

for p in paragraphs:
    text_content = p.encode('latin-1', 'replace').decode('latin-1')
    pdf.set_font("Arial", 'B', 14) 
    pdf.cell(10, 5, chr(149), 0, 0, 'R')
    pdf.set_font("Arial", '', 11)
    w = pdf.w - pdf.l_margin - pdf.r_margin - 10 
    pdf.multi_cell(w, 6, text_content)
    pdf.ln(4)

output_path = f"resources/Transcript/transcript_{video_id}.pdf"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
pdf.output(output_path)
print(f"SUCCESS: Saved to {output_path}")

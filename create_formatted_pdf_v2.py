from youtube_transcript_api import YouTubeTranscriptApi
from fpdf import FPDF
import sys
import os
import re

video_id = "fHsySd6tgHE"

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

# Process text into bullet points based on key points heuristic
full_text = ""
for item in transcript:
    t = ""
    # Safe retrieval
    if isinstance(item, dict) and 'text' in item:
        t = item['text']
    elif hasattr(item, 'text'):
        t = item.text
    else:
        try: t = str(item)
        except: continue
        
    full_text += t + " "

# Clean up newlines for FPDF safety
full_text = full_text.replace('\n', ' ')

# Split by sentence enders (. ! ?)
sentences = re.split(r'(?<=[.!?]) +', full_text)

# Group into logical chunks (approx 3 sentences per bullet)
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

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Video Transcript (Key Points)', 0, 1, 'C')
        self.ln(5) # Space after title

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font("Arial", size=11)

# Set auto page break
pdf.set_auto_page_break(auto=True, margin=15)

for p in paragraphs:
    # Prepare text for standard font
    text_content = p.encode('latin-1', 'replace').decode('latin-1')
    
    # Bullet point styling
    pdf.set_font("Arial", 'B', 14) 
    pdf.cell(10, 5, chr(149), 0, 0, 'R') # Bullet char (or similar)
    
    # Content body
    pdf.set_font("Arial", '', 11)
    
    # Multi-cell for wrapping text
    # Calculate usable width: page width - left margin - bullet width - right margin
    w = pdf.w - pdf.l_margin - pdf.r_margin - 10 
    
    # Save Y position to align first line with bullet
    # Actually multi_cell starts at current Y
    
    pdf.multi_cell(w, 6, text_content)
    
    # Add spacing between bullets
    pdf.ln(4)

output_path = "resources/Transcript/transcript_fHsySd6tgHE_formatted.pdf" 
# Ensure directory
os.makedirs(os.path.dirname(output_path), exist_ok=True)
pdf.output(output_path)
print("SUCCESS")

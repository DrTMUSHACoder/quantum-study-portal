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

# Process text into bullet points based on sentences
full_text = " ".join([t['text'] for t in transcript])
# clean up text
full_text = full_text.replace('\n', ' ')
# Split into sentences (simple heuristic)
sentences = re.split(r'(?<=[.!?]) +', full_text)

# Group sentences into paragraphs/bullets (e.g. 2-3 sentences per bullet)
bullets = []
chunk = ""
count = 0
for sentence in sentences:
    chunk += sentence + " "
    count += 1
    if count >= 3: # Every 3 sentences is a bullet
        bullets.append(chunk.strip())
        chunk = ""
        count = 0
if chunk:
    bullets.append(chunk.strip())

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Video Transcript (Formatted)', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font("Arial", size=11)

for bullet in bullets:
    # Encode for FPDF
    bullet_text = bullet.encode('latin-1', 'replace').decode('latin-1')
    
    # Draw bullet point
    pdf.set_x(15) # Indent
    
    # We need to simulate a list item. 
    # multi_cell doesn't support complex indentation easily for the second line.
    # We'll just print a dash and then the text.
    
    # Calculate height
    # cell width = page width - margins (20)
    # indent = 10
    text_width = pdf.w - 30 
    
    pdf.cell(5, 5, "-", 0, 0, 'R') # Bullet character
    
    # Save current position
    x = pdf.get_x()
    y = pdf.get_y()
    
    # Print text block
    pdf.multi_cell(text_width, 6, bullet_text)
    
    # Add some spacing after current block
    pdf.ln(3)

output_filename = "resources/Transcript/transcript_fHsySd6tgHE_formatted.pdf"
# Ensure dir exists
os.makedirs(os.path.dirname(output_filename), exist_ok=True)

pdf.output(output_filename)
print(f"Formatted PDF saved to {output_filename}")

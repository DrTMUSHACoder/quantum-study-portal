from youtube_transcript_api import YouTubeTranscriptApi
from fpdf import FPDF
import re
import os

# Week 1 videos with their titles
WEEK1_VIDEOS = [
    {"url": "https://www.youtube.com/watch?v=fHsySd6tgHE", "title": "Algorithms towards Quantum Advantage and Careers in Quantum Computing"},
    {"url": "https://www.youtube.com/watch?v=voSRtTKiTQo", "title": "A Brief Introduction to Application of Quantum"},
    {"url": "https://www.youtube.com/watch?v=-fttE1SzpD8", "title": "Quantum Computing Basics"},
    {"url": "https://www.youtube.com/watch?v=SVKQu_H9WM4", "title": "Postulates of Quantum Mechanics - I"},
    {"url": "https://www.youtube.com/watch?v=U5t5oOfmblw", "title": "Postulates of Quantum Mechanics - II"},
    {"url": "https://www.youtube.com/watch?v=uOg4YG60Dlc", "title": "Quantum Measurements"},
    {"url": "https://www.youtube.com/watch?v=nGPr1QM_XrY", "title": "Quantum Gates and Circuits - Part 1"},
    {"url": "https://www.youtube.com/watch?v=BDjduprkE5w", "title": "Quantum Gates and Circuits - Part 2"}
]

def extract_video_id(url):
    """Extract video ID from YouTube URL"""
    match = re.search(r'(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})', url)
    return match.group(1) if match else None

def get_transcript(video_id):
    """Fetch transcript with multiple fallback methods"""
    try: return YouTubeTranscriptApi.get_transcript(video_id)
    except: pass
    try: api = YouTubeTranscriptApi(); return api.get_transcript(video_id)
    except: pass
    try: api = YouTubeTranscriptApi(); return api.fetch(video_id)
    except: pass
    return None

def process_transcript_text(transcript):
    """Convert transcript to paragraphs"""
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
    
    return paragraphs

class BorderedPDF(FPDF):
    def __init__(self, lecture_title):
        super().__init__()
        self.lecture_title = lecture_title
    
    def header(self):
        # Draw top border
        self.set_line_width(0.5)
        self.line(10, 10, 200, 10)
        
        # Week 1 title
        self.set_font('Arial', 'B', 16)
        self.set_xy(10, 12)
        self.cell(0, 8, 'Week 1: Introduction to Quantum Computing', 0, 1, 'C')
        
        # Lecture title
        self.set_font('Arial', 'B', 12)
        self.set_xy(10, 22)
        self.multi_cell(0, 6, self.lecture_title, 0, 'C')
        
        self.ln(5)
    
    def footer(self):
        # Draw bottom border
        self.set_line_width(0.5)
        self.line(10, 287, 200, 287)
        
        # Page number
        self.set_y(-20)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
    
    def add_side_borders(self):
        """Draw left and right borders on current page"""
        self.set_line_width(0.5)
        # Left border
        self.line(10, 10, 10, 287)
        # Right border
        self.line(200, 10, 200, 287)

# Process each video
os.makedirs("resources/Transcript/Week1", exist_ok=True)

for idx, video_data in enumerate(WEEK1_VIDEOS, 1):
    video_id = extract_video_id(video_data['url'])
    title = video_data['title']
    
    print(f"\n{'='*70}")
    print(f"Processing Lecture {idx}: {title}")
    print(f"Video ID: {video_id}")
    
    # Fetch transcript
    transcript = get_transcript(video_id)
    if not transcript:
        print(f"  [ERROR] Failed to fetch transcript")
        continue
    
    print(f"  [OK] Transcript fetched")
    
    # Process into paragraphs
    paragraphs = process_transcript_text(transcript)
    print(f"  [OK] Processed into {len(paragraphs)} paragraphs")
    
    # Create PDF
    pdf = BorderedPDF(title)
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=20)
    
    # Add side borders
    pdf.add_side_borders()
    
    # Add content
    pdf.set_font("Arial", size=11)
    
    for p in paragraphs:
        # Check if we need a new page
        if pdf.get_y() > 270:
            pdf.add_page()
            pdf.add_side_borders()
        
        text_content = p.encode('latin-1', 'replace').decode('latin-1')
        
        # Bullet point
        pdf.set_font("Arial", 'B', 14)
        pdf.set_x(15)
        pdf.cell(5, 5, chr(149), 0, 0)
        
        # Content
        pdf.set_font("Arial", '', 11)
        pdf.set_x(22)
        w = pdf.w - 32  # Account for margins and borders
        pdf.multi_cell(w, 6, text_content)
        pdf.ln(3)
    
    # Save PDF
    output_path = f"resources/Transcript/Week1/Lecture_{idx}_{video_id}.pdf"
    pdf.output(output_path)
    print(f"  [OK] Saved: {output_path}")

print(f"\n{'='*70}")
print("[SUCCESS] All Week 1 transcripts downloaded and formatted!")
print(f"Location: resources/Transcript/Week1/")

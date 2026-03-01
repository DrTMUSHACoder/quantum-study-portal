from youtube_transcript_api import YouTubeTranscriptApi
from fpdf import FPDF
import re
import os

# All weeks data
WEEKS_DATA = {
    2: {
        "title": "Week 2: Qiskit Programming",
        "videos": [
            {"url": "https://www.youtube.com/watch?v=j1NFdDx2tIQ", "title": "Introduction to Qiskit"},
            {"url": "https://www.youtube.com/watch?v=X3PniVoVyxI", "title": "Quantum States and Operations in Qiskit"},
            {"url": "https://www.youtube.com/watch?v=bFDizG0MUAA", "title": "Measurement and Visualization"},
            {"url": "https://www.youtube.com/watch?v=Fq_KrtO0pOw", "title": "Building Quantum Circuits"}
        ]
    },
    3: {
        "title": "Week 3: Standard Algorithms",
        "videos": [
            {"url": "https://www.youtube.com/watch?v=x3DDKrM4ZGs", "title": "Deutsch-Jozsa Algorithm"},
            {"url": "https://www.youtube.com/watch?v=D0mZaKftobM", "title": "Bernstein-Vazirani Algorithm"},
            {"url": "https://www.youtube.com/watch?v=ZWCuQD-uIoY", "title": "Simon's Algorithm"},
            {"url": "https://www.youtube.com/watch?v=jeFCdbEVCWI", "title": "Grover's Algorithm"}
        ]
    },
    4: {
        "title": "Week 4: Advanced Speed-ups",
        "videos": [
            {"url": "https://www.youtube.com/watch?v=lCXga0QAviE", "title": "Quantum Fourier Transform"},
            {"url": "https://www.youtube.com/watch?v=OPXyPvpzgG0", "title": "Phase Estimation"},
            {"url": "https://www.youtube.com/watch?v=3UW2r0tjcdA", "title": "Shor's Algorithm - Part 1"},
            {"url": "https://www.youtube.com/watch?v=IpdQ7MN2_M0", "title": "Shor's Algorithm - Part 2"},
            {"url": "https://www.youtube.com/watch?v=0Hhu2B1Xbu0", "title": "Quantum Simulation"},
            {"url": "https://www.youtube.com/watch?v=VdHyAabmhyY", "title": "Variational Quantum Eigensolver"},
            {"url": "https://www.youtube.com/watch?v=Hz-kasZtrWc", "title": "QAOA Algorithm"}
        ]
    }
}

def extract_video_id(url):
    match = re.search(r'(?:v=|youtu\.be/)([a-zA-Z0-9_-]{11})', url)
    return match.group(1) if match else None

def get_transcript(video_id):
    try: return YouTubeTranscriptApi.get_transcript(video_id)
    except: pass
    try: api = YouTubeTranscriptApi(); return api.get_transcript(video_id)
    except: pass
    try: api = YouTubeTranscriptApi(); return api.fetch(video_id)
    except: pass
    return None

def process_transcript_text(transcript):
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
    def __init__(self, week_num, week_title, video_number, lecture_title):
        super().__init__()
        self.week_num = week_num
        self.week_title = week_title
        self.video_number = video_number
        self.lecture_title = lecture_title
    
    def header(self):
        self.set_line_width(0.5)
        self.line(10, 10, 200, 10)
        
        self.set_font('Arial', 'B', 16)
        self.set_xy(10, 12)
        self.cell(0, 8, self.week_title, 0, 1, 'C')
        
        self.set_font('Arial', 'B', 14)
        self.set_xy(10, 22)
        self.cell(0, 6, f'Video {self.video_number}', 0, 1, 'C')
        
        self.set_font('Arial', 'B', 11)
        self.set_xy(10, 30)
        self.multi_cell(0, 5, self.lecture_title, 0, 'C')
        
        self.ln(5)
    
    def footer(self):
        self.set_line_width(0.5)
        self.line(10, 287, 200, 287)
        
        self.set_y(-20)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
    
    def add_side_borders(self):
        self.set_line_width(0.5)
        self.line(10, 10, 10, 287)
        self.line(200, 10, 200, 287)

# Process all weeks
for week_num, week_data in WEEKS_DATA.items():
    week_title = week_data['title']
    videos = week_data['videos']
    
    # Create week folder
    week_folder = f"resources/Transcript/Week{week_num}"
    os.makedirs(week_folder, exist_ok=True)
    
    print(f"\n{'#'*70}")
    print(f"# PROCESSING {week_title.upper()}")
    print(f"{'#'*70}")
    
    for video_idx, video_data in enumerate(videos, 1):
        video_id = extract_video_id(video_data['url'])
        title = video_data['title']
        
        print(f"\n{'='*70}")
        print(f"Processing Video {video_idx}: {title}")
        print(f"Video ID: {video_id}")
        
        transcript = get_transcript(video_id)
        if not transcript:
            print(f"  [ERROR] Failed to fetch transcript")
            continue
        
        print(f"  [OK] Transcript fetched")
        
        paragraphs = process_transcript_text(transcript)
        print(f"  [OK] Processed into {len(paragraphs)} paragraphs")
        
        pdf = BorderedPDF(week_num, week_title, video_idx, title)
        pdf.add_page()
        pdf.set_auto_page_break(auto=True, margin=20)
        pdf.add_side_borders()
        
        pdf.set_font("Arial", size=11)
        
        for p in paragraphs:
            if pdf.get_y() > 270:
                pdf.add_page()
                pdf.add_side_borders()
            
            text_content = p.encode('latin-1', 'replace').decode('latin-1')
            
            pdf.set_font("Arial", 'B', 14)
            pdf.set_x(15)
            pdf.cell(5, 5, chr(149), 0, 0)
            
            pdf.set_font("Arial", '', 11)
            pdf.set_x(22)
            w = pdf.w - 32
            pdf.multi_cell(w, 6, text_content)
            pdf.ln(3)
        
        output_path = f"{week_folder}/W{week_num}V{video_idx}.pdf"
        pdf.output(output_path)
        print(f"  [OK] Saved: {output_path}")

print(f"\n{'#'*70}")
print("[SUCCESS] All transcripts downloaded!")
print(f"{'#'*70}")

print("\nSummary:")
for week_num in [2, 3, 4]:
    video_count = len(WEEKS_DATA[week_num]['videos'])
    print(f"\nWeek {week_num}: {video_count} videos")
    for i in range(1, video_count + 1):
        print(f"  - W{week_num}V{i}.pdf")

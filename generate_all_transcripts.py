from youtube_transcript_api import YouTubeTranscriptApi
from fpdf import FPDF
import re
import os

# Root directory
ROOT_DIR = r"e:\projects\quantum-study-portal"

# All weeks data
ALL_WEEKS = {
    1: {
        "title": "Week 1: Introduction to Quantum Computing",
        "videos": [
            {"url": "https://www.youtube.com/watch?v=fHsySd6tgHE", "title": "Algorithms towards Quantum Advantage"},
            {"url": "https://www.youtube.com/watch?v=voSRtTKiTQo", "title": "Application of Quantum - Introduction"},
            {"url": "https://www.youtube.com/watch?v=-fttE1SzpD8", "title": "Quantum Computing Basics"},
            {"url": "https://www.youtube.com/watch?v=SVKQu_H9WM4", "title": "Postulates of Quantum Mechanics - I"},
            {"url": "https://www.youtube.com/watch?v=U5t5oOfmblw", "title": "Postulates of Quantum Mechanics - II"},
            {"url": "https://www.youtube.com/watch?v=uOg4YG60Dlc", "title": "Quantum Measurements"},
            {"url": "https://www.youtube.com/watch?v=nGPr1QM_XrY", "title": "Quantum Gates and Circuits - Part 1"},
            {"url": "https://www.youtube.com/watch?v=BDjduprkE5w", "title": "Quantum Gates and Circuits - Part 2"}
        ]
    },
    2: {
        "title": "Week 2: Qiskit Programming",
        "videos": [
            {"url": "https://www.youtube.com/watch?v=j1NFdDx2tIQ", "title": "Introduction to Qiskit"},
            {"url": "https://www.youtube.com/watch?v=X3PniVoVyxI", "title": "Quantum States and Operations"},
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
    api = YouTubeTranscriptApi()
    # Try fetch directly since we know it's an instance method in this version
    try:
        return api.fetch(video_id)
    except Exception as e:
        print(f"Error fetching {video_id}: {e}")
        return None

def process_transcript_text(transcript):
    full_text = ""
    for item in transcript:
        # Handle FetchedTranscriptSnippet object
        if hasattr(item, 'text'):
            t = item.text
        elif isinstance(item, dict) and 'text' in item:
            t = item['text']
        else:
            try: t = str(item)
            except: continue
        full_text += t + " "
    
    full_text = full_text.replace('\n', ' ')
    sentences = re.split(r'(?<=[.!?]) +', full_text)
    
    content_blocks = []
    chunk = ""
    count = 0
    use_bullet = True
    
    for s in sentences:
        if not s.strip(): continue
        chunk += s + " "
        count += 1
        threshold = 3 if use_bullet else 5
        if count >= threshold:
            content_blocks.append({'text': chunk.strip(), 'is_bullet': use_bullet})
            chunk = ""
            count = 0
            use_bullet = not use_bullet
    
    if chunk:
        content_blocks.append({'text': chunk.strip(), 'is_bullet': use_bullet})
    
    return content_blocks

class BorderedPDF(FPDF):
    def __init__(self, week_title, video_number, lecture_title):
        super().__init__()
        self.week_title = week_title
        self.video_number = video_number
        self.lecture_title = lecture_title
    
    def header(self):
        self.draw_box()
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
        self.set_y(-20)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
        
    def draw_box(self):
        self.set_line_width(0.5)
        self.rect(10, 10, 190, 277)

# Execution
for week_num, week_data in ALL_WEEKS.items():
    week_folder = os.path.join(ROOT_DIR, "resources", "Transcript", f"Week{week_num}")
    os.makedirs(week_folder, exist_ok=True)
    
    print(f"\n--- {week_data['title']} ---")
    
    for idx, video in enumerate(week_data['videos'], 1):
        vid_id = extract_video_id(video['url'])
        print(f"Processing Video {idx}: {vid_id} ...", end=" ")
        
        transcript = get_transcript(vid_id)
        if not transcript:
            continue
            
        blocks = process_transcript_text(transcript)
        
        pdf = BorderedPDF(week_data['title'], idx, video['title'])
        pdf.add_page()
        pdf.set_auto_page_break(auto=True, margin=20)
        
        for block in blocks:
            if pdf.get_y() > 265:
                pdf.add_page()
            
            text = block['text'].encode('latin-1', 'replace').decode('latin-1')
            
            if block['is_bullet']:
                pdf.set_font("Arial", 'B', 12)
                pdf.set_x(15)
                pdf.cell(5, 6, chr(149), 0, 0)
                pdf.set_font("Arial", '', 11)
                pdf.set_x(22)
                pdf.multi_cell(170, 6, text)
                pdf.ln(2)
            else:
                pdf.set_font("Arial", '', 11)
                pdf.set_x(15)
                pdf.multi_cell(180, 6, text)
                pdf.ln(4)
        
        output_path = os.path.join(week_folder, f"W{week_num}V{idx}.pdf")
        pdf.output(output_path)
        print(f"[SAVED: W{week_num}V{idx}.pdf]")

print("\nTask Complete!")

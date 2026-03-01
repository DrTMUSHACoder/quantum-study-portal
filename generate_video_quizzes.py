"""
Generate Video Quizzes from Video Transcript PDF OCR outputs.
Uses Claude AI to create quiz questions from video transcript content.
"""

import os
import json
from pathlib import Path
from anthropic import Anthropic

# Initialize Claude client
client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

VIDEO_PDF_DIR = Path("ocr_output/video pdf")
OUTPUT_FILE = Path("video_quizzes.json")

QUIZ_GENERATION_PROMPT = """You are a quantum computing educator creating quiz questions from video lecture transcripts.

Based on the following video transcript, generate 10 high-quality multiple-choice questions that:
1. Test understanding of key concepts discussed in the video
2. Have 4 options each
3. Include clear explanations
4. Cover different difficulty levels
5. Focus on practical understanding and applications

Video Transcript:
{content}

Return ONLY a JSON array with this exact format:
[
  {{
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0,
    "explanation": "Why this answer is correct",
    "clue": "Hint or reference to video content"
  }}
]

Generate exactly 10 questions. Return ONLY the JSON array, no other text."""

def generate_quizzes_for_week(week_num):
    """Generate quizzes for all video transcript PDFs in a week."""
    week_dir = VIDEO_PDF_DIR / f"week{week_num}"
    
    if not week_dir.exists():
        print(f"⚠️  Week {week_num} directory not found")
        return []
    
    # Get video transcript files (W1V1, W1V2, etc.)
    txt_files = sorted([f for f in week_dir.glob("W*_ocr.txt")])
    
    if not txt_files:
        print(f"⚠️  No video transcript files found for week {week_num}")
        return []
    
    all_questions = []
    
    for txt_file in txt_files:
        print(f"🎥 Processing: {txt_file.name}")
        
        # Read video transcript content
        with open(txt_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Limit content size (Claude has token limits)
        if len(content) > 50000:
            content = content[:50000] + "\n\n[Content truncated...]"
        
        try:
            # Generate quiz using Claude
            message = client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4000,
                messages=[{
                    "role": "user",
                    "content": QUIZ_GENERATION_PROMPT.format(content=content)
                }]
            )
            
            response_text = message.content[0].text.strip()
            
            # Parse JSON response
            # Remove markdown code blocks if present
            if response_text.startswith("```"):
                response_text = response_text.split("```")[1]
                if response_text.startswith("json"):
                    response_text = response_text[4:]
            
            questions = json.loads(response_text)
            
            print(f"   ✅ Generated {len(questions)} questions")
            all_questions.extend(questions)
            
        except Exception as e:
            print(f"   ❌ Error: {str(e)[:100]}")
            continue
    
    return all_questions


def main():
    """Generate video quizzes for all weeks."""
    print("=" * 60)
    print("  VIDEO QUIZ GENERATION")
    print("=" * 60)
    
    all_data = {}
    
    for week in range(1, 5):  # Weeks 1-4
        print(f"\n🎬 Week {week}")
        questions = generate_quizzes_for_week(week)
        
        if questions:
            # Format for quiz_data.json structure
            # Video quizzes use IDs: week_set_question
            # Sets 11-20 are video quizzes
            formatted = {}
            
            for idx, q in enumerate(questions, 1):
                # Video quiz IDs start from set 11
                quiz_id = f"{week}_{10 + idx}_{idx}"  # e.g., "1_11_1"
                formatted[quiz_id] = {
                    "question": q["question"],
                    "options": q["options"],
                    "answer": q["answer"],
                    "explanation": q["explanation"],
                    "clue": q.get("clue", q["explanation"])
                }
            
            all_data.update(formatted)
            print(f"   📊 Total: {len(formatted)} questions added")
    
    # Save to file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'=' * 60}")
    print(f"✅ Saved {len(all_data)} video quiz questions to {OUTPUT_FILE}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()

# Quiz Generation System - Complete Guide

## ✅ Your Requirements (Now Implemented)

| Quiz Type | Source | Quiz IDs | Script | Status |
|-----------|--------|----------|--------|--------|
| **Lecture Quiz** | Lecture PDFs | 1-10 | `generate_lecture_quizzes.py` | ✅ Created |
| **Video Quiz** | Video Transcript PDFs | 11-20 | `generate_video_quizzes.py` | ✅ Created |
| **NPTEL Quiz** | Assignment/Solution PDFs | 21+ | `parse_quiz_to_json.py` | ✅ Existing |
| **Simulator** | ALL 3 sources combined | N/A | Backend | ✅ Existing |

---

## 📁 File Structure

```
quantum-study-portal/
├── ocr_output/
│   ├── lecture pdf/          # Lecture PDF OCR outputs
│   │   ├── week1/
│   │   ├── week2/
│   │   ├── week3/
│   │   └── week4/
│   ├── video pdf/            # Video transcript PDF OCR outputs
│   │   ├── week1/
│   │   ├── week2/
│   │   ├── week3/
│   │   └── week4/
│   └── nptel quiz and solutions/  # NPTEL quiz PDFs
│
├── generate_lecture_quizzes.py   # ✅ NEW - Generates lecture quizzes
├── generate_video_quizzes.py     # ✅ NEW - Generates video quizzes
├── parse_quiz_to_json.py         # ✅ EXISTING - Parses NPTEL quizzes
├── generate_all_quizzes.py       # ✅ NEW - Master script (runs all)
│
└── quiz_data.json                # Final combined output
```

---

## 🚀 How to Use

### Option 1: Generate All Quizzes at Once (Recommended)

```bash
python generate_all_quizzes.py
```

This will:
1. Generate lecture quizzes from lecture PDFs
2. Generate video quizzes from video transcript PDFs
3. Use existing NPTEL quizzes
4. Combine everything into `quiz_data.json`

### Option 2: Generate Individual Quiz Types

```bash
# Generate only lecture quizzes
python generate_lecture_quizzes.py

# Generate only video quizzes
python generate_video_quizzes.py

# Generate only NPTEL quizzes
python parse_quiz_to_json.py
```

---

## 📋 Quiz ID Format

Quiz IDs follow the pattern: `week_set_question`

**Examples:**
- `1_1_1` = Week 1, Set 1 (Lecture), Question 1
- `1_11_1` = Week 1, Set 11 (Video), Question 1
- `1_21_1` = Week 1, Set 21 (NPTEL), Question 1

**ID Ranges:**
- Sets 1-10: Lecture Quizzes
- Sets 11-20: Video Quizzes
- Sets 21+: NPTEL Quizzes

---

## 🔧 Requirements

### Environment Variables

You need to set your Claude API key:

```bash
# Windows (PowerShell)
$env:ANTHROPIC_API_KEY="your-api-key-here"

# Or add to .env file
ANTHROPIC_API_KEY=your-api-key-here
```

### Python Packages

```bash
pip install anthropic
```

---

## 📊 Output Files

| File | Description |
|------|-------------|
| `lecture_quizzes.json` | Lecture quiz questions only |
| `video_quizzes.json` | Video quiz questions only |
| `ocr_output/extracted_quizzes.json` | NPTEL quiz questions only |
| `quiz_data.json` | **FINAL COMBINED** - All quiz types |

---

## ✅ Verification

After running `generate_all_quizzes.py`, check:

1. **Lecture Quizzes**: IDs like `1_1_1`, `1_2_1`, etc.
2. **Video Quizzes**: IDs like `1_11_1`, `1_12_1`, etc.
3. **NPTEL Quizzes**: IDs like `1_21_1`, `1_22_1`, etc.

Each quiz should have:
- `question`: Question text
- `options`: Array of 4 options
- `answer`: Index of correct answer (0-3)
- `explanation`: Why the answer is correct
- `clue`: Hint or reference

---

## 🎯 Simulator

The simulator backend (`simulator_backend.py` or `simulator_fastapi.py`) will:
- Combine content from ALL 3 PDF types:
  - Lecture PDFs
  - Video Transcript PDFs
  - Assignment/Solution PDFs
- Generate practice tasks using combined knowledge

---

## 📝 Notes

1. **AI-Generated Quizzes**: Lecture and Video quizzes use Claude AI for generation
2. **NPTEL Quizzes**: Parsed directly from assignment PDFs (existing questions)
3. **Quality**: AI-generated quizzes may need manual review
4. **Cost**: Claude API calls cost money (check Anthropic pricing)

---

## 🐛 Troubleshooting

**Issue**: `ANTHROPIC_API_KEY not found`
- **Solution**: Set the environment variable or add to `.env` file

**Issue**: No questions generated
- **Solution**: Check if OCR output files exist in correct directories

**Issue**: JSON parsing error
- **Solution**: Claude response format may vary, check error message

---

## ✅ Summary

Your requirement is now **FULLY IMPLEMENTED**:

✅ Lecture Quizzes → From Lecture PDFs only  
✅ Video Quizzes → From Video Transcript PDFs only  
✅ NPTEL Quizzes → From Assignment/Solution PDFs only  
✅ Simulator → Combines ALL 3 sources

Run `python generate_all_quizzes.py` to generate everything! 🎉

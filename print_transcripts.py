from youtube_transcript_api import YouTubeTranscriptApi
import re

videos = [
    "fHsySd6tgHE", "voSRtTKiTQo", "-fttE1SzpD8", "SVKQu_H9WM4", 
    "U5t5oOfmblw", "uOg4YG60Dlc", "nGPr1QM_XrY", "BDjduprkE5w"
]

api = YouTubeTranscriptApi()

for vid in videos:
    print(f"--- START TRANSCRIPT {vid} ---")
    try:
        transcript = api.fetch(vid)
        for entry in transcript:
            print(entry.text if hasattr(entry, 'text') else entry['text'])
    except Exception as e:
        print(f"FAILED to fetch {vid}: {e}")
    print(f"--- END TRANSCRIPT {vid} ---\n")

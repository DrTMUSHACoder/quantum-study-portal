from youtube_transcript_api import YouTubeTranscriptApi
import sys

video_id = "fHsySd6tgHE"

try:
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    full_text = ""
    for item in transcript_list:
        full_text += item['text'] + " "
    
    with open("raw_transcript.txt", "w", encoding="utf-8") as f:
        f.write(full_text)
    print("Transcript saved to raw_transcript.txt")

except Exception as e:
    print(f"Error: {e}")

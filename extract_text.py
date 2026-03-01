from youtube_transcript_api import YouTubeTranscriptApi
import sys
import os

video_id = "fHsySd6tgHE"

# Re-implement the EXACT logic that worked in fetch_transcript.py
def get_transcript(video_id):
    try:
        return YouTubeTranscriptApi.get_transcript(video_id)
    except AttributeError: pass
    except Exception: pass

    try:
        api = YouTubeTranscriptApi()
        return api.get_transcript(video_id)
    except: pass

    try:
        api = YouTubeTranscriptApi()
        return api.fetch(video_id)
    except: pass
    
    return None

transcript_list = get_transcript(video_id)

# Fallback as per working script
if not transcript_list:
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    except:
        print("Final attempt failed.")
        sys.exit(1)

full_text = ""
for item in transcript_list:
    text = ""
    if isinstance(item, dict) and 'text' in item:
        text = item['text']
    elif hasattr(item, 'text'):
        text = item.text
    else:
        try: text = str(item)
        except: continue
        
    full_text += text + " "

with open("raw_transcript.txt", "w", encoding="utf-8") as f:
    f.write(full_text)
print("Transcript saved to raw_transcript.txt")

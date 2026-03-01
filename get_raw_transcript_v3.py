from youtube_transcript_api import YouTubeTranscriptApi
import sys

video_id = "fHsySd6tgHE"

try:
    print("Trying get_transcript...")
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
except AttributeError:
    try:
        print("Trying instance fetch...")
        api = YouTubeTranscriptApi()
        # This was the method that WORKED before in fetch_transcript.py (instance method or something)
        # Wait, the previous fetch_transcript.py WORKED. Let's just USE THAT LOGIC.
        # It used: 
        # def get_transcript(video_id):
        # ...
        # return YouTubeTranscriptApi.get_transcript(video_id)
        # Wait, fetch_transcript.py failed initially, but succeeded later.
        # It worked when I added the try/except block for `except AttributeError`.
        # Ah, in step 390, it worked. The code was:
        # try: return YouTubeTranscriptApi.get_transcript(video_id)
        # except...
        # Let's just copy that working logic.
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)

    except:
         print("Failed.")
         sys.exit(1)

full_text = ""
for item in transcript_list:
    text = ""
    # robust extracting from dict or obj
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

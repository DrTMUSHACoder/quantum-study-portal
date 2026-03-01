from youtube_transcript_api import YouTubeTranscriptApi
import sys

video_id = "fHsySd6tgHE"

try:
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
except AttributeError:
    # Try alternate method if get_transcript is not available directly
    try:
        api = YouTubeTranscriptApi()
        transcript_list = api.get_transcript(video_id)
    except:
        # Try fetching using list_transcripts
        try:
             transcript_list = YouTubeTranscriptApi.list_transcripts(video_id).find_transcript(['en']).fetch()
        except Exception as e:
             print(f"Failed to fetch: {e}")
             sys.exit(1)

full_text = ""
for item in transcript_list:
    full_text += item['text'] + " "

with open("raw_transcript.txt", "w", encoding="utf-8") as f:
    f.write(full_text)
print("Transcript saved to raw_transcript.txt")

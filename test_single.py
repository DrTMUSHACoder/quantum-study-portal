from youtube_transcript_api import YouTubeTranscriptApi
import json
try:
    t = YouTubeTranscriptApi.get_transcript('j1NFdDx2tIQ')
    print("Success!")
    print(json.dumps(t[:2], indent=2))
except Exception as e:
    print(f"Error: {e}")

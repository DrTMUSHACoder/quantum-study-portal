from youtube_transcript_api import YouTubeTranscriptApi
try:
    print(YouTubeTranscriptApi.get_transcript('VdHyAabmhyY'))
except Exception as e:
    print(f"Error: {e}")

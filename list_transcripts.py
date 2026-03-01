from youtube_transcript_api import YouTubeTranscriptApi
video_id = 'j1NFdDx2tIQ'
try:
    api = YouTubeTranscriptApi()
    transcript_list = api.list_transcripts(video_id)
    print(f"Transcripts for {video_id}:")
    for t in transcript_list:
        print(f" - {t.language} ({t.language_code}) {'[Auto]' if t.is_generated else '[Manual]'}")
except Exception as e:
    print(f"Error: {e}")

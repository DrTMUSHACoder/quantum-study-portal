from youtube_transcript_api import YouTubeTranscriptApi
# Try to fetch
try:
    print("Trying fetch...")
    # Maybe fetch is an instance method?
    # Or maybe YouTubeTranscriptApi is the main class?
    transcript = YouTubeTranscriptApi.get_transcript('fHsySd6tgHE')
    print("get_transcript succeeded!")
except Exception as e:
    print(f"get_transcript failed: {e}")

try:
    print("Trying fetch if it exists...")
    if hasattr(YouTubeTranscriptApi, 'fetch'):
        transcript = YouTubeTranscriptApi.fetch('fHsySd6tgHE')
        print("fetch succeeded!")
        print(transcript[:100])
    else:
        print("No 'fetch' method found.")
except Exception as e:
    print(f"fetch failed: {e}")

try:
    print("Trying list_transcripts...")
    transcript_list = YouTubeTranscriptApi.list_transcripts('fHsySd6tgHE')
    print("list_transcripts succeeded!")
except Exception as e:
    print(f"list_transcripts failed: {e}")

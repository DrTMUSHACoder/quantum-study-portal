import requests
from bs4 import BeautifulSoup
import re
import json

# Try to fetch the course page structure
# Since login is required, we'll try to find a public-facing page or API

# Option 1: Try the main course page
course_url = "https://onlinecourses.nptel.ac.in/noc26_cs89/course"

try:
    response = requests.get(course_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Look for YouTube links in the page
    youtube_links = []
    
    # Method 1: Find all links containing youtube.com or youtu.be
    for link in soup.find_all('a', href=True):
        href = link['href']
        if 'youtube.com' in href or 'youtu.be' in href:
            youtube_links.append(href)
    
    # Method 2: Find iframe embeds with YouTube
    for iframe in soup.find_all('iframe', src=True):
        src = iframe['src']
        if 'youtube.com' in src or 'youtu.be' in src:
            youtube_links.append(src)
    
    # Method 3: Look for data attributes that might contain video IDs
    for elem in soup.find_all(attrs={'data-video-id': True}):
        video_id = elem['data-video-id']
        youtube_links.append(f"https://www.youtube.com/watch?v={video_id}")
    
    print(f"Found {len(youtube_links)} YouTube links:")
    for link in set(youtube_links):  # Remove duplicates
        print(link)
    
    # Save the raw HTML for inspection
    with open("nptel_course_page.html", "w", encoding="utf-8") as f:
        f.write(response.text)
    print("\nPage HTML saved to nptel_course_page.html for inspection")
    
except Exception as e:
    print(f"Error fetching course page: {e}")

# Try getting the week-specific structure
week1_units = [
    "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=78",
    "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=79",
    "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=80"
]

print("\n\nTrying individual lesson pages...")
for url in week1_units:
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Check if we hit a login page
        if 'Sign in' in response.text or 'login' in response.text.lower():
            print(f"Authentication required for {url}")
            continue
            
        # Look for YouTube links
        for link in soup.find_all('a', href=True):
            href = link['href']
            if 'youtube.com' in href or 'youtu.be' in href:
                print(f"Found: {href}")
                
    except Exception as e:
        print(f"Error with {url}: {e}")

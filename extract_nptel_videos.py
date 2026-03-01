import requests
from bs4 import BeautifulSoup
import re
import json

# NPTEL Login credentials
USERNAME = "avalavahitha@gmail.com"
PASSWORD = "Vahitha@14"

# Create a session to persist cookies
session = requests.Session()

print("Step 1: Accessing NPTEL login page...")

# Get the login page to retrieve CSRF tokens if needed
login_page_url = "https://onlinecourses.nptel.ac.in/noc26_cs89/login"
try:
    login_page = session.get(login_page_url)
    soup = BeautifulSoup(login_page.text, 'html.parser')
    
    # Look for CSRF token
    csrf_token = None
    csrf_input = soup.find('input', {'name': 'csrfmiddlewaretoken'})
    if csrf_input:
        csrf_token = csrf_input.get('value')
        print(f"Found CSRF token: {csrf_token[:20]}...")
    
    # Prepare login data
    login_data = {
        'email': USERNAME,
        'password': PASSWORD,
    }
    
    if csrf_token:
        login_data['csrfmiddlewaretoken'] = csrf_token
    
    print("Step 2: Attempting login...")
    
    # Set headers to mimic browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': login_page_url,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    # Perform login
    login_response = session.post(
        'https://onlinecourses.nptel.ac.in/noc26_cs89/login_ajax',
        data=login_data,
        headers=headers,
        allow_redirects=True
    )
    
    print(f"Login response status: {login_response.status_code}")
    
    # Check if login was successful
    if login_response.status_code == 200:
        print("Login successful!")
        
        # Try accessing the course page
        print("\nStep 3: Accessing Week 1 content...")
        
        # Try the course units page
        week1_urls = [
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=78",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=79",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=80",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=81",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=82",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=83",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=84",
            "https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson=85"
        ]
        
        youtube_links = []
        
        for url in week1_urls:
            try:
                print(f"\nFetching: {url}")
                response = session.get(url, headers=headers)
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # Method 1: Find YouTube iframes
                    for iframe in soup.find_all('iframe'):
                        src = iframe.get('src', '')
                        if 'youtube.com' in src or 'youtu.be' in src:
                            youtube_links.append({
                                'url': url,
                                'video': src
                            })
                            print(f"  Found iframe: {src}")
                    
                    # Method 2: Find YouTube links in anchor tags
                    for link in soup.find_all('a', href=True):
                        href = link['href']
                        if 'youtube.com' in href or 'youtu.be' in href:
                            youtube_links.append({
                                'url': url,
                                'video': href
                            })
                            print(f"  Found link: {href}")
                    
                    # Method 3: Search for YouTube video IDs in script tags
                    for script in soup.find_all('script'):
                        script_text = script.string or ''
                        # Look for YouTube video ID patterns
                        video_ids = re.findall(r'(?:youtube\.com/watch\?v=|youtu\.be/)([a-zA-Z0-9_-]{11})', script_text)
                        for vid_id in video_ids:
                            youtube_links.append({
                                'url': url,
                                'video': f'https://www.youtube.com/watch?v={vid_id}'
                            })
                            print(f"  Found in script: https://www.youtube.com/watch?v={vid_id}")
                    
                    # Save the HTML for manual inspection
                    lesson_num = url.split('lesson=')[-1]
                    with open(f"nptel_lesson_{lesson_num}.html", "w", encoding="utf-8") as f:
                        f.write(response.text)
                
            except Exception as e:
                print(f"Error fetching {url}: {e}")
        
        # Save results
        print(f"\n\nTotal YouTube links found: {len(youtube_links)}")
        
        if youtube_links:
            with open("week1_youtube_links.json", "w", encoding="utf-8") as f:
                json.dump(youtube_links, f, indent=2)
            print("Links saved to week1_youtube_links.json")
            
            print("\n=== Week 1 YouTube Links ===")
            for item in youtube_links:
                print(f"Lesson: {item['url']}")
                print(f"Video: {item['video']}\n")
        else:
            print("No YouTube links found. Check the saved HTML files for manual inspection.")
    
    else:
        print(f"Login may have failed. Response: {login_response.text[:200]}")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

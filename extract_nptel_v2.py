import requests
from bs4 import BeautifulSoup
import re
import json

# NPTEL credentials
USERNAME = "avalavahitha@gmail.com"
PASSWORD = "Vahitha@14"

session = requests.Session()

print("Attempting NPTEL login with different approach...")

# Try the main SWAYAM login endpoint
login_url = "https://onlinecourses.nptel.ac.in/login"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

try:
    # Get login page first
    print("Fetching login page...")
    login_page = session.get(login_url, headers=headers)
    soup = BeautifulSoup(login_page.text, 'html.parser')
    
    # Find CSRF token
    csrf_token = None
    for input_tag in soup.find_all('input'):
        if 'csrf' in input_tag.get('name', '').lower():
            csrf_token = input_tag.get('value')
            break
    
    # Prepare login payload
    login_data = {
        'email': USERNAME,
        'password': PASSWORD,
        'honor_code': 'true'
    }
    
    if csrf_token:
        login_data['csrfmiddlewaretoken'] = csrf_token
    
    # Try login
    print("Submitting login...")
    login_response = session.post(
        login_url,
        data=login_data,
        headers={**headers, 'Referer': login_url},
        allow_redirects=True
    )
    
    print(f"Login response: {login_response.status_code}")
    
    # Check if we're logged in by trying to access the course
    print("\nTrying to access course content...")
    course_url = "https://onlinecourses.nptel.ac.in/noc26_cs89/course"
    course_response = session.get(course_url, headers=headers)
    
    if 'Sign in' not in course_response.text and course_response.status_code == 200:
        print("Successfully accessed course!")
        
        # Save course page
        with open("course_page.html", "w", encoding="utf-8") as f:
            f.write(course_response.text)
        print("Course page saved to course_page.html")
        
        # Try to extract structure
        soup = BeautifulSoup(course_response.text, 'html.parser')
        
        # Look for Week 1 links
        week1_links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            text = link.get_text(strip=True)
            
            # Look for Week 1 related content
            if 'week' in text.lower() and '1' in text:
                week1_links.append((text, href))
            elif 'unit=16' in href:  # Unit 16 appears to be Week 1
                week1_links.append((text, href))
        
        print(f"\nFound {len(week1_links)} Week 1 related links:")
        for text, href in week1_links:
            print(f"  {text}: {href}")
        
        # Now try to access individual lessons
        print("\nAccessing individual lessons...")
        youtube_videos = []
        
        for lesson_id in range(78, 86):  # Lessons 78-85 for Week 1
            lesson_url = f"https://onlinecourses.nptel.ac.in/noc26_cs89/unit?unit=16&lesson={lesson_id}"
            print(f"\nFetching lesson {lesson_id}...")
            
            try:
                lesson_response = session.get(lesson_url, headers=headers)
                
                if lesson_response.status_code == 200:
                    lesson_soup = BeautifulSoup(lesson_response.text, 'html.parser')
                    
                    # Save lesson HTML
                    with open(f"lesson_{lesson_id}.html", "w", encoding="utf-8") as f:
                        f.write(lesson_response.text)
                    
                    # Extract YouTube links
                    found_videos = []
                    
                    # Check iframes
                    for iframe in lesson_soup.find_all('iframe'):
                        src = iframe.get('src', '')
                        if 'youtube' in src:
                            found_videos.append(src)
                            print(f"  Found: {src}")
                    
                    # Check links
                    for a in lesson_soup.find_all('a', href=True):
                        if 'youtube.com' in a['href'] or 'youtu.be' in a['href']:
                            found_videos.append(a['href'])
                            print(f"  Found: {a['href']}")
                    
                    # Check scripts for video IDs
                    for script in lesson_soup.find_all('script'):
                        if script.string:
                            video_ids = re.findall(r'[\"\']([a-zA-Z0-9_-]{11})[\"\']', script.string)
                            # Filter to likely YouTube IDs (very rough heuristic)
                            for vid_id in video_ids:
                                if re.match(r'^[a-zA-Z0-9_-]{11}$', vid_id):
                                    potential_url = f"https://www.youtube.com/watch?v={vid_id}"
                                    found_videos.append(potential_url)
                    
                    if found_videos:
                        youtube_videos.append({
                            'lesson_id': lesson_id,
                            'videos': list(set(found_videos))
                        })
                
            except Exception as e:
                print(f"  Error: {e}")
        
        # Save results
        if youtube_videos:
            with open("week1_youtube_videos.json", "w") as f:
                json.dump(youtube_videos, f, indent=2)
            print(f"\n\nFound videos in {len(youtube_videos)} lessons")
            print("Results saved to week1_youtube_videos.json")
        else:
            print("\nNo YouTube videos found automatically.")
            print("Check the saved HTML files (lesson_*.html) for manual extraction.")
    
    else:
        print("Could not access course - login may have failed")
        print(f"Response status: {course_response.status_code}")
        with open("login_failed.html", "w", encoding="utf-8") as f:
            f.write(course_response.text)
        print("Response saved to login_failed.html")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

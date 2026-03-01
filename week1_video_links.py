# Week 1: Introduction to Quantum Computing - YouTube Video Links
# Course: NPTEL - Introduction to Quantum Computing: Quantum Algorithms and Qiskit

# These links can be manually collected or you can provide them
# Based on the NPTEL course structure, Week 1 typically includes:

WEEK_1_VIDEOS = {
    "Lecture 1": {
        "title": "Algorithms towards Quantum Advantage and Careers in Quantum Computing",
        "youtube_url": ""  # To be filled
    },
    "Lecture 2": {
        "title": "A Brief Introduction to Application of Quantum",
        "youtube_url": ""  # To be filled
    },
    "Lecture 3": {
        "title": "Quantum Computing Basics",
        "youtube_url": ""  # To be filled
    },
    "Lecture 4": {
        "title": "Postulates of Quantum Mechanics - I",
        "youtube_url": ""  # To be filled
    },
    "Lecture 5": {
        "title": "Postulates of Quantum Mechanics - II",
        "youtube_url": ""  # To be filled
    },
    "Lecture 6": {
        "title": "Quantum Measurements",
        "youtube_url": ""  # To be filled
    },
    "Lecture 7": {
        "title": "Quantum Gates and Circuits - Part 1",
        "youtube_url": ""  # To be filled
    },
    "Lecture 8": {
        "title": "Quantum Gates and Circuits - Part 2",
        "youtube_url": ""  # To be filled
    }
}

# Instructions to manually extract links:
# 1. Log in to https://onlinecourses.nptel.ac.in/noc26_cs89/course
# 2. Navigate to Week 1
# 3. For each lecture, right-click on the video player and select "Copy video URL"
# 4. Paste the URLs above

if __name__ == "__main__":
    print("Week 1 Video Structure:")
    for key, video in WEEK_1_VIDEOS.items():
        print(f"{key}: {video['title']}")
        if video['youtube_url']:
            print(f"   URL: {video['youtube_url']}")
        else:
            print("   URL: [Pending - Please add manually]")

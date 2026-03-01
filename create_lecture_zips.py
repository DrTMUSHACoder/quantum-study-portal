import os
import zipfile

def create_zips():
    base_dir = r"d:\Research\35 Antigravity Projects\quantum-study-portal - 20-02-2026\quantum-study-portal - 20-02-2026\resources"
    weeks = [1, 2, 3, 4]
    
    # Mapping week to possible lecture note directory names
    folder_names = ["Lecture Notes", "lecture note"]
    
    for week in weeks:
        week_folder = f"week_{week}"
        week_path = os.path.join(base_dir, week_folder)
        
        if not os.path.exists(week_path):
            print(f"Skipping {week_folder}, path not found.")
            continue
            
        found_folder = None
        for name in folder_names:
            p = os.path.join(week_path, name)
            if os.path.exists(p):
                found_folder = p
                break
        
        if found_folder:
            zip_filename = os.path.join(week_path, f"Week_{week}_Lecture_Notes.zip")
            print(f"Creating {zip_filename} from {found_folder}...")
            
            with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, dirs, files in os.walk(found_folder):
                    for file in files:
                        file_path = os.path.join(root, file)
                        # Add file to zip, preserving relative path from found_folder
                        arcname = os.path.relpath(file_path, found_folder)
                        zipf.write(file_path, arcname)
            print(f"Done.")
        else:
            print(f"No lecture note folder found in {week_folder}.")

if __name__ == "__main__":
    create_zips()

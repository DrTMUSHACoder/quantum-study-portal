import os
import shutil

base_path = r'e:\projects\quantum-study-portal\ocr_output'

folders = [
    r'nptel quiz and solutions\week1',
    r'nptel quiz and solutions\week2',
    r'nptel quiz and solutions\week3',
    r'nptel quiz and solutions\week4',
    r'lecture pdf\week1',
    r'lecture pdf\week2',
    r'lecture pdf\week3',
    r'lecture pdf\week4',
    r'video pdf\week1',
    r'video pdf\week2',
    r'video pdf\week3',
    r'video pdf\week4',
]

# Create folders
for f in folders:
    os.makedirs(os.path.join(base_path, f), exist_ok=True)

files = os.listdir(base_path)

for filename in files:
    if os.path.isdir(os.path.join(base_path, filename)):
        continue
        
    lower_name = filename.lower()
    target_folder = None
    
    # Logic for Video PDF
    if 'w1v' in lower_name: target_folder = r'video pdf\week1'
    elif 'w2v' in lower_name: target_folder = r'video pdf\week2'
    elif 'w3v' in lower_name: target_folder = r'video pdf\week3'
    elif 'w4v' in lower_name: target_folder = r'video pdf\week4'
    
    # Logic for NPTEL Quiz and Solutions
    elif 'assingment 1' in lower_name or 'week1_quiz' in lower_name or 'week1_set' in lower_name:
        target_folder = r'nptel quiz and solutions\week1'
    elif 'assigment2' in lower_name or 'week 2 solutions' in lower_name or 'week2_set' in lower_name:
        target_folder = r'nptel quiz and solutions\week2'
    elif 'assigment3' in lower_name or 'week3_set' in lower_name:
        target_folder = r'nptel quiz and solutions\week3'
    elif 'assigment4' in lower_name or 'assignment_solutions' in lower_name or 'week4_set' in lower_name:
        target_folder = r'nptel quiz and solutions\week4'
        
    # Logic for Lecture PDF
    elif 'pm_lec' in lower_name:
        target_folder = r'lecture pdf\week1'
    elif 'week2qiskit' in lower_name:
        target_folder = r'lecture pdf\week2'
    elif 'grover' in lower_name:
        target_folder = r'lecture pdf\week3'
    elif 'qec' in lower_name:
        target_folder = r'lecture pdf\week4'
        
    # Special cases / remaining transcripts
    elif 'fHsySd6tgHE' in filename: target_folder = r'video pdf\week1' # Algorithms toward Advantage
    elif 'voSRtTKiTQo' in filename: target_folder = r'video pdf\week1' # Application Intro
    
    if target_folder:
        src = os.path.join(base_path, filename)
        dst = os.path.join(base_path, target_folder, filename)
        print(f"Moving {filename} -> {target_folder}")
        shutil.move(src, dst)

print("Organization complete!")

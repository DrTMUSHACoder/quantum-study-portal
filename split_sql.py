"""
Split the large SQL file into smaller chunks that Supabase SQL Editor can handle.
Each file will have ~5000 rows (well within the size limit).
"""

import os

INPUT_FILE = "colleges_for_supabase.sql"
OUTPUT_DIR = "sql_batches"
MAX_LINES_PER_FILE = 5500  # ~5000 INSERT rows + overhead

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the header (CREATE TABLE, indexes, etc.) - everything before first INSERT
header_lines = []
insert_lines = []
in_header = True

for line in lines:
    if in_header and line.strip().startswith("INSERT INTO"):
        in_header = False
    if in_header:
        header_lines.append(line)
    else:
        insert_lines.append(line)

# Write header as batch 0
with open(os.path.join(OUTPUT_DIR, "batch_00_setup.sql"), 'w', encoding='utf-8') as f:
    f.writelines(header_lines)
    f.write("\n-- Run this FIRST to create the table and indexes.\n")

print(f"Header written to batch_00_setup.sql ({len(header_lines)} lines)")

# Split INSERT statements into batches
# Each batch starts with "INSERT INTO" or "-- Batch"
current_batch = []
batch_num = 1
current_line_count = 0

for line in insert_lines:
    # Check if this is a new batch marker AND we're already over the limit
    if line.strip().startswith("-- Batch") and current_line_count > MAX_LINES_PER_FILE:
        # Write current batch
        filename = f"batch_{batch_num:02d}_data.sql"
        with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
            f.writelines(current_batch)
        print(f"  {filename}: {current_line_count} lines")
        batch_num += 1
        current_batch = []
        current_line_count = 0
    
    current_batch.append(line)
    current_line_count += 1

# Write remaining
if current_batch:
    filename = f"batch_{batch_num:02d}_data.sql"
    with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
        f.writelines(current_batch)
    print(f"  {filename}: {current_line_count} lines")

print(f"\nTotal batches: {batch_num + 1} (including setup)")
print(f"Files saved to: {OUTPUT_DIR}/")
print(f"\nRun order in Supabase SQL Editor:")
print(f"  1. batch_00_setup.sql (creates table)")
for i in range(1, batch_num + 1):
    print(f"  {i+1}. batch_{i:02d}_data.sql")

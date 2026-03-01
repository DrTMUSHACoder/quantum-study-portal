
import csv
import os

MASTER_CSV = "colleges_for_supabase.csv"
UGC_CSV = "ugc_universities_for_supabase.csv"
FINAL_CSV = "final_institutions_for_supabase.csv"
FINAL_SQL = "final_institutions_for_supabase.sql"

def normalize(name):
    if not name:
        return ""
    # Standardize for comparison: lowercase, remove special chars, remove extra spaces
    return " ".join(name.lower().strip().split())

def main():
    print("Loading master colleges...")
    master_data = []
    seen = set() # (state, name) normalized
    
    if os.path.exists(MASTER_CSV):
        with open(MASTER_CSV, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                state = row['state']
                name = row['college_name']
                district = row.get('district', '')
                
                norm_key = (normalize(state), normalize(name))
                if norm_key not in seen:
                    seen.add(norm_key)
                    master_data.append(row)
    
    print(f"Loaded {len(master_data)} colleges.")
    
    print("Merging UGC universities...")
    ugc_added = 0
    ugc_duplicates = 0
    
    if os.path.exists(UGC_CSV):
        with open(UGC_CSV, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                state = row['state']
                name = row['college_name']
                district = row.get('district', '')
                
                norm_key = (normalize(state), normalize(name))
                if norm_key not in seen:
                    seen.add(norm_key)
                    master_data.append(row)
                    ugc_added += 1
                else:
                    ugc_duplicates += 1
    
    print(f"Added {ugc_added} new universities.")
    print(f"Skipped {ugc_duplicates} duplicates.")
    
    # Save final CSV
    print(f"Saving {FINAL_CSV}...")
    with open(FINAL_CSV, 'w', encoding='utf-8', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['state', 'district', 'college_name'])
        writer.writeheader()
        for row in master_data:
            writer.writerow({
                'state': row['state'],
                'district': row['district'],
                'college_name': row['college_name']
            })
            
    # Generate SQL
    print(f"Generating {FINAL_SQL}...")
    with open(FINAL_SQL, 'w', encoding='utf-8') as f:
        f.write("-- Merged Multi-Source Institutions Database\n")
        f.write(f"-- Total count: {len(master_data)}\n\n")
        
        f.write("INSERT INTO public.institutions (state, district, college_name) VALUES\n")
        
        batch_size = 500
        for i in range(0, len(master_data), batch_size):
            batch = master_data[i : i + batch_size]
            values = []
            for row in batch:
                s = row['state'].replace("'", "''")
                d = row['district'].replace("'", "''")
                n = row['college_name'].replace("'", "''")
                values.append(f"('{s}', '{d}', '{n}')")
            
            f.write(",\n".join(values))
            if i + batch_size < len(master_data):
                f.write(";\n\nINSERT INTO public.institutions (state, district, college_name) VALUES\n")
            else:
                f.write(";\n")

    print("Success!")

if __name__ == "__main__":
    main()

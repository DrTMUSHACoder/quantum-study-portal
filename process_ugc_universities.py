"""
Process UGC Universities CSV and generate SQL for Supabase import.
Extracts state from address field, cleans university names,
and generates INSERT statements that avoid duplicates.
"""

import csv
import re

INPUT_FILE = "UGC Universities.csv"
OUTPUT_CSV = "ugc_universities_for_supabase.csv"
OUTPUT_SQL = "ugc_universities_for_supabase.sql"

# All Indian states and UTs for matching
STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

# Common alternate spellings in the CSV
STATE_ALIASES = {
    "Orissa": "Odisha",
    "Pondicherry": "Puducherry",
    "Chattisgarh": "Chhattisgarh",
    "Chatisgarh": "Chhattisgarh",
    "Chhatisgarh": "Chhattisgarh",
    "Uttrakhand": "Uttarakhand",
    "Tamilnadu": "Tamil Nadu",
    "J&K": "Jammu and Kashmir",
    "J & K": "Jammu and Kashmir",
    "A.P.": "Andhra Pradesh",
    "A.P": "Andhra Pradesh",
    "U.P.": "Uttar Pradesh",
    "U.P": "Uttar Pradesh",
    "M.P.": "Madhya Pradesh",
    "M.P": "Madhya Pradesh",
    "W.B.": "West Bengal",
    "WB": "West Bengal",
    "HP": "Himachal Pradesh",
    "H.P": "Himachal Pradesh",
    "H.P.": "Himachal Pradesh",
    "T.N.": "Tamil Nadu",
    "T.N": "Tamil Nadu",
}

def extract_state(address):
    """Extract state from address field."""
    if not address:
        return None
    
    addr = address.strip()
    
    # Try to find state from the address
    # Pattern: the state usually appears before a dash and pin code, or at the end
    # e.g., "...Arunachal Pradesh - 791112" or "...Karnataka -"
    
    # First check for explicit state mentions with dash pattern
    for state in sorted(STATES, key=len, reverse=True):
        # Check various patterns
        patterns = [
            re.compile(r'\b' + re.escape(state) + r'\s*[-–]\s*\d*', re.IGNORECASE),
            re.compile(r'\b' + re.escape(state) + r'\s*$', re.IGNORECASE),
            re.compile(r'\b' + re.escape(state) + r'\b', re.IGNORECASE),
        ]
        for pat in patterns:
            if pat.search(addr):
                return state
    
    # Check aliases
    for alias, state in sorted(STATE_ALIASES.items(), key=lambda x: len(x[0]), reverse=True):
        patterns = [
            re.compile(r'\b' + re.escape(alias) + r'\s*[-–]\s*\d*', re.IGNORECASE),
            re.compile(r'\b' + re.escape(alias) + r'\b', re.IGNORECASE),
        ]
        for pat in patterns:
            if pat.search(addr):
                return state
    
    return None

def extract_district(address, state):
    """Try to extract district/city from address."""
    if not address or not state:
        return None
    
    # Common city-to-district mappings
    city_mappings = {
        "Mumbai": "Mumbai City",
        "Pune": "Pune",
        "Bangalore": "Bengaluru Urban",
        "Bengaluru": "Bengaluru Urban",
        "Chennai": "Chennai",
        "Hyderabad": "Hyderabad",
        "Kolkata": "Kolkata",
        "Kolkatta": "Kolkata",
        "Calcutta": "Kolkata",
        "Delhi": "Delhi",
        "New Delhi": "Delhi",
        "Jaipur": "Jaipur",
        "Lucknow": "Lucknow",
        "Bhopal": "Bhopal",
        "Patna": "Patna",
        "Ahmedabad": "Ahmedabad",
        "Guwahati": "Kamrup Metropolitan",
        "Chandigarh": "Chandigarh",
        "Thiruvananthapuram": "Thiruvananthapuram",
        "Kochi": "Ernakulam",
        "Coimbatore": "Coimbatore",
        "Mysore": "Mysuru",
        "Mysuru": "Mysuru",
        "Varanasi": "Varanasi",
        "Allahabad": "Prayagraj",
        "Agra": "Agra",
        "Meerut": "Meerut",
        "Nagpur": "Nagpur",
        "Srinagar": "Srinagar",
        "Jammu": "Jammu",
        "Dehradun": "Dehradun",
        "Shimla": "Shimla",
        "Ranchi": "Ranchi",
        "Bhubaneshwar": "Khordha",
        "Bhubaneswar": "Khordha",
        "Raipur": "Raipur",
        "Gangtok": "East Sikkim",
        "Imphal": "Imphal West",
        "Shillong": "East Khasi Hills",
        "Aizawl": "Aizawl",
        "Kohima": "Kohima",
        "Agartala": "West Tripura",
        "Itanagar": "Papum Pare",
        "Silchar": "Cachar",
        "Jodhpur": "Jodhpur",
        "Udaipur": "Udaipur",
        "Kota": "Kota",
        "Surat": "Surat",
        "Vadodara": "Vadodara",
        "Rajkot": "Rajkot",
        "Mangalore": "Dakshina Kannada",
        "Belgaum": "Belagavi",
        "Hubli": "Dharwad",
        "Dharwad": "Dharwad",
        "Gulbarga": "Kalaburagi",
    }
    
    addr_upper = address.upper()
    for city, district in city_mappings.items():
        if city.upper() in addr_upper:
            return district
    
    return None

def clean_name(name):
    """Clean and standardize university name."""
    if not name:
        return None
    
    name = name.strip()
    # Remove trailing/leading whitespace and normalize spaces
    name = re.sub(r'\s+', ' ', name)
    # Remove trailing comma or period
    name = name.rstrip(',.')
    
    # Add "University" if the name seems incomplete and doesn't have it
    # (Some entries just say "Christ" or "Jain")
    short_names = {
        "Christ": "Christ University",
        "Jain": "Jain University", 
        "NITTE": "NITTE University",
        "Yenepoya": "Yenepoya University",
        "Santosh": "Santosh University",
        "Graphic Era": "Graphic Era University",
        "Nehru Gram Bharti": "Nehru Gram Bharti University",
    }
    if name in short_names:
        name = short_names[name]
    
    return name

def escape_sql(s):
    """Escape single quotes for SQL."""
    return s.replace("'", "''") if s else ""

# ============ MAIN PROCESSING ============

universities = []
skipped = []
state_counts = {}

with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)  # Skip header
    
    for row in reader:
        if len(row) < 3:
            continue
        
        idx = row[0].strip()
        name = row[1].strip() if len(row) > 1 else ""
        address = row[2].strip() if len(row) > 2 else ""
        
        if not name:
            continue
        
        # Clean the name
        clean = clean_name(name)
        
        # Extract state
        state = extract_state(address)
        
        # Extract district
        district = extract_district(address, state) if state else None
        
        if state:
            universities.append({
                'name': clean,
                'state': state,
                'district': district or '',
                'original_address': address
            })
            state_counts[state] = state_counts.get(state, 0) + 1
        else:
            skipped.append((name, address))

# ============ GENERATE CSV ============
with open(OUTPUT_CSV, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['state', 'district', 'college_name'])
    for u in universities:
        writer.writerow([u['state'], u['district'], u['name']])

# ============ GENERATE SQL ============
with open(OUTPUT_SQL, 'w', encoding='utf-8') as f:
    f.write("-- UGC Universities Import for Supabase\n")
    f.write("-- Generated from UGC Universities.csv\n")
    f.write(f"-- Total: {len(universities)} universities\n\n")
    
    f.write("-- Insert universities (skip duplicates based on college_name + state)\n")
    f.write("INSERT INTO public.institutions (state, district, college_name)\n")
    f.write("SELECT state, district, college_name FROM (\n")
    f.write("  VALUES\n")
    
    lines = []
    for u in universities:
        state = escape_sql(u['state'])
        district = escape_sql(u['district'])
        name = escape_sql(u['name'])
        lines.append(f"    ('{state}', '{district}', '{name}')")
    
    f.write(",\n".join(lines))
    f.write("\n) AS new_data(state, district, college_name)\n")
    f.write("WHERE NOT EXISTS (\n")
    f.write("  SELECT 1 FROM public.institutions i\n")
    f.write("  WHERE LOWER(i.college_name) = LOWER(new_data.college_name)\n")
    f.write("    AND LOWER(i.state) = LOWER(new_data.state)\n")
    f.write(");\n")

# ============ SUMMARY ============
print(f"\n{'='*60}")
print(f"  UGC UNIVERSITIES PROCESSED")
print(f"{'='*60}")
print(f"  Total in CSV:      {len(universities) + len(skipped)}")
print(f"  Successfully parsed: {len(universities)}")
print(f"  Skipped (no state): {len(skipped)}")
print(f"{'='*60}")
print(f"\n  State-wise breakdown:")
for state in sorted(state_counts.keys()):
    print(f"    {state}: {state_counts[state]}")

if skipped:
    print(f"\n  Skipped entries (could not determine state):")
    for name, addr in skipped[:10]:
        print(f"    - {name[:60]}...")
    if len(skipped) > 10:
        print(f"    ... and {len(skipped) - 10} more")

print(f"\n  Output files:")
print(f"    CSV: {OUTPUT_CSV}")
print(f"    SQL: {OUTPUT_SQL}")
print(f"{'='*60}")

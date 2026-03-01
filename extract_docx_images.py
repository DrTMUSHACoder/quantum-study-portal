import os
from docx import Document
from docx.opc.constants import RELATIONSHIP_TYPE as RT

doc = Document("week 2 scrrenshot.docx")

# Extract all text first
print("=== TEXT CONTENT ===")
for i, para in enumerate(doc.paragraphs):
    if para.text.strip():
        print(f"Para {i}: {para.text}")

print("\n=== IMAGES ===")
# Extract images
os.makedirs("week2_images", exist_ok=True)
img_count = 0
for rel in doc.part.rels.values():
    if "image" in rel.reltype:
        img_count += 1
        img_data = rel.target_part.blob
        ext = rel.target_part.content_type.split("/")[-1]
        if ext == "jpeg":
            ext = "jpg"
        filename = f"week2_images/image_{img_count}.{ext}"
        with open(filename, "wb") as f:
            f.write(img_data)
        print(f"Saved: {filename} ({len(img_data)} bytes)")

print(f"\nTotal images extracted: {img_count}")

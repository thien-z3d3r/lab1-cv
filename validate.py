#!/usr/bin/env python3
import sys
import os
import zipfile
import re
import hashlib
import xml.etree.ElementTree as ET

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
DOCX_PATH = os.path.join(ROOT_DIR, 'Lab1_HuynhKhanhThien.docx')
DOWNLOADS_PATH = '/home/skadi/Downloads/Lab1_HuynhKhanhThien.docx'

print("=== Starting Comprehensive Document Validation ===")

# 1. Existence and size
if not os.path.exists(DOCX_PATH):
    print("FAIL: Lab1_HuynhKhanhThien.docx does not exist!")
    sys.exit(1)

docx_size = os.path.getsize(DOCX_PATH)
if docx_size < 1_000_000:
    print(f"FAIL: File size too small ({docx_size} bytes)")
    sys.exit(1)
print(f"PASS: Lab1_HuynhKhanhThien.docx exists ({docx_size:,} bytes)")

# 2. Downloads sync check
if os.path.exists(DOWNLOADS_PATH):
    h1 = hashlib.sha256(open(DOCX_PATH, 'rb').read()).hexdigest()
    h2 = hashlib.sha256(open(DOWNLOADS_PATH, 'rb').read()).hexdigest()
    if h1 != h2:
        print("FAIL: Checksum mismatch between repo and Downloads copy!")
        sys.exit(1)
    print(f"PASS: Downloads copy is perfectly synchronized (SHA256: {h1[:16]}...)")

# 3. XML Text, Vietnamese & Em-Dash check
with zipfile.ZipFile(DOCX_PATH) as z:
    for xml_file in ['word/header1.xml', 'word/footer1.xml', 'word/document.xml']:
        if xml_file not in z.namelist():
            print(f"FAIL: Missing required XML file {xml_file}")
            sys.exit(1)
        content = z.read(xml_file).decode('utf-8')
        
        # Vietnamese diacritics
        vn_chars = re.findall(r'[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]', content)
        if vn_chars:
            print(f"FAIL: {xml_file} contains Vietnamese characters: {set(vn_chars)}")
            sys.exit(1)
            
        # Em dash
        if '\u2014' in content:
            print(f"FAIL: {xml_file} contains em-dash (\\u2014)")
            sys.exit(1)

    print("PASS: Verified header, footer, and document XML have zero Vietnamese characters and zero em dashes.")

    # 4. Embedded media check
    media_files = [f for f in z.namelist() if f.startswith('word/media/') and not f.endswith('/')]
    if len(media_files) != 19:
        print(f"FAIL: Expected 19 embedded images, found {len(media_files)}")
        sys.exit(1)
    for mf in media_files:
        assert z.getinfo(mf).file_size > 0, f"Empty media file: {mf}"
    print(f"PASS: All {len(media_files)} figures are embedded and non-empty.")

    # 5. Headings check
    root = ET.fromstring(z.read('word/document.xml'))
    headings = []
    for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
        text = ''.join([t.text for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text])
        if re.match(r'^\d+\.\s+', text):
            headings.append(text)

    expected_h1 = [
        "1. Project Objectives & Repository Structure",
        "2. HTML Source Code Analysis (index.html)",
        "3. CSS Source Code Analysis (style.css)",
        "4. Visual Output & Rendered Page Results",
        "5. Deployment Workflow & GitHub Pages Setup",
        "6. Homework Exercises",
        "7. Submission & Public Links"
    ]
    if headings != expected_h1:
        print(f"FAIL: Headings mismatch!\nFound: {headings}\nExpected: {expected_h1}")
        sys.exit(1)
    print("PASS: All 7 major headings match expected English titles.")

    # 6. Page geometry and typography
    pgSz = root.find('.//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pgSz')
    assert pgSz.attrib['{http://schemas.openxmlformats.org/wordprocessingml/2006/main}w'] == '11906', 'Width mismatch!'
    assert pgSz.attrib['{http://schemas.openxmlformats.org/wordprocessingml/2006/main}h'] == '16838', 'Height mismatch!'
    print("PASS: Page geometry confirmed standard A4 (11906 x 16838 dxa).")

    # 7. Image-caption pairing check
    ns = {
        'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
        'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'
    }
    body = root.find('w:body', ns)
    paragraphs = list(body.findall('w:p', ns))
    pairs_found = 0
    for i, p in enumerate(paragraphs):
        if p.findall('.//w:drawing', ns):
            next_p = paragraphs[i + 1]
            cap = ''.join([t.text for t in next_p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if t.text])
            assert cap.startswith('Figure '), f'Non-figure caption: {cap}'
            pairs_found += 1
    assert pairs_found == 19, f'Expected 19 pairs, got {pairs_found}'
    print(f"PASS: All {pairs_found} figures have valid sequential captions.")

print("=== ALL DOCUMENT CHECKS PASSED ===")
sys.exit(0)

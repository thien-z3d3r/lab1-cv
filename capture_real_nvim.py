#!/usr/bin/env python3
import os
import time
import subprocess

PIPE_PATH = "/tmp/nvim-capture.pipe"
SNIPPETS_DIR = "/home/skadi/lab1-cv/assets/snippets"
os.makedirs(SNIPPETS_DIR, exist_ok=True)

if os.path.exists(PIPE_PATH):
    os.remove(PIPE_PATH)

print("Starting foot with nvim --listen...")
foot_proc = subprocess.Popen([
    "foot",
    "-o", "colors-dark.alpha=1.0",
    "-o", "colors-dark.background=1a1b26",
    "-e", "nvim", "--listen", PIPE_PATH, "/home/skadi/lab1-cv/index.html"
])

print("Waiting 6 seconds for Neovim & LazyVim initialization and notification dismissal...")
time.sleep(6.0)

def capture_section(nvim_cmd, output_path, crop_width=1040):
    cmd = ["nvim", "--server", PIPE_PATH, "--remote-send", nvim_cmd]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.4)
    # Capture the neovim window area on River: x=0, y=36, w=1280, h=820
    subprocess.run(["grim", "-g", "0,36 1280x820", output_path], check=True)
    if crop_width < 1280:
        subprocess.run(["magick", output_path, "-crop", f"{crop_width}x820+0+0", "+repage", output_path], check=True)
    print(f"Captured: {output_path}")

try:
    # 1. HTML Head & Navigation
    capture_section(":1<CR>zt", f"{SNIPPETS_DIR}/01_html_nav.png")

    # 2. HTML Header / Hero Bio
    capture_section(":24<CR>zt", f"{SNIPPETS_DIR}/02_html_header.png")

    # 3. HTML Experience Section
    capture_section(":52<CR>zt", f"{SNIPPETS_DIR}/03_html_experience.png")

    # 4. HTML Featured Projects Section
    capture_section(":105<CR>zt", f"{SNIPPETS_DIR}/04_html_projects.png")

    # 5. HTML Skills Table
    capture_section(":157<CR>zt", f"{SNIPPETS_DIR}/05_html_table.png")

    # 6. HTML Contact Form & Sidebar Aside
    capture_section(":195<CR>zt", f"{SNIPPETS_DIR}/06_html_contact_aside.png")

    # Switch to style.css
    capture_section(":e /home/skadi/lab1-cv/style.css<CR>", f"/tmp/dummy.png")
    time.sleep(0.5)

    # 7. CSS Variables, Reset & Body
    capture_section(":1<CR>zt", f"{SNIPPETS_DIR}/07_css_variables_reset.png")

    # 8. CSS Navigation & Header styling
    capture_section(":45<CR>zt", f"{SNIPPETS_DIR}/08_css_nav_header.png")

    # 9. CSS Experience & Project Cards Hover
    capture_section(":160<CR>zt", f"{SNIPPETS_DIR}/09_css_experience_projects.png")

    # 10. CSS Table & Form styling
    capture_section(":245<CR>zt", f"{SNIPPETS_DIR}/10_css_table_form.png")

    print("All real Neovim captures completed successfully!")

finally:
    foot_proc.terminate()
    try:
        foot_proc.wait(timeout=2)
    except:
        foot_proc.kill()
    if os.path.exists(PIPE_PATH):
        os.remove(PIPE_PATH)

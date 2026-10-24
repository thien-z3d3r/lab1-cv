#!/usr/bin/env python3
import os
import time
import subprocess
from datetime import datetime

PIPE_PATH = "/tmp/nvim-capture.pipe"
SNIPPETS_DIR = "/home/skadi/lab1-cv/assets/snippets"
SCREENSHOTS_DIR = os.path.expanduser("~/Pictures/Screenshots")

os.makedirs(SNIPPETS_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

if os.path.exists(PIPE_PATH):
    os.remove(PIPE_PATH)

clean_init_lua = """
vim.opt.statuscolumn = ""
vim.opt.signcolumn = "no"
vim.opt.cursorline = false
vim.opt.colorcolumn = ""
vim.opt.list = false
vim.opt.foldcolumn = "0"
vim.opt.number = true
vim.opt.relativenumber = false
vim.schedule(function()
  pcall(function() require("smear_cursor").enabled = false end)
  pcall(function() require("treesitter-context").disable() end)
  pcall(function() Snacks.indent.disable() end)
  pcall(function() Snacks.scope.disable() end)
  pcall(function() Snacks.scroll.disable() end)
  vim.cmd("redraw!")
end)
"""

print("Launching foot terminal with matching TokyoNight background...")
foot_proc = subprocess.Popen([
    "foot",
    "-o", "colors-dark.alpha=1.0",
    "-o", "colors-dark.background=222436",
    "-e", "nvim", "--listen", PIPE_PATH,
    "-c", f"lua {clean_init_lua}",
    "/home/skadi/lab1-cv/index.html"
])

print("Waiting for Neovim startup & notification timeout...")
time.sleep(6.0)

def snip_section(nvim_cmd, snippet_name, geom="30,68 820x460"):
    # Jump to line
    cmd = ["nvim", "--server", PIPE_PATH, "--remote-send", nvim_cmd]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.4)
    
    # Re-apply clean redraw on current buffer
    clean_buf = "lua vim.opt.statuscolumn=''; vim.opt.signcolumn='no'; vim.opt.cursorline=false; vim.opt.list=false; pcall(function() require('smear_cursor').enabled = false end); pcall(function() require('treesitter-context').disable() end); pcall(function() Snacks.indent.disable() end); pcall(function() Snacks.scope.disable() end); vim.cmd('redraw!')"
    subprocess.run(["nvim", "--server", PIPE_PATH, "--remote-send", f":{clean_buf}<CR>"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.4)
    
    # Super+Shift+S style snipping with grim -g
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    screenshot_file = os.path.join(SCREENSHOTS_DIR, f"Screenshot_{timestamp}_{snippet_name}")
    dest_file = os.path.join(SNIPPETS_DIR, snippet_name)
    
    subprocess.run(["grim", "-g", geom, screenshot_file], check=True)
    subprocess.run(["cp", "-f", screenshot_file, dest_file], check=True)
    subprocess.run(f"wl-copy -t image/png < '{screenshot_file}'", shell=True, stderr=subprocess.DEVNULL)
    print(f"Snipped without stripes: {dest_file}")
    time.sleep(0.2)

try:
    # 1. HTML Head & Navigation
    snip_section(":1<CR>zt", "01_html_nav.png")

    # 2. HTML Header / Hero Bio
    snip_section(":24<CR>zt", "02_html_header.png")

    # 3. HTML Experience Section
    snip_section(":52<CR>zt", "03_html_experience.png")

    # 4. HTML Featured Projects Section
    snip_section(":105<CR>zt", "04_html_projects.png")

    # 5. HTML Skills Table
    snip_section(":157<CR>zt", "05_html_table.png")

    # 6. HTML Contact Form & Sidebar Aside
    snip_section(":195<CR>zt", "06_html_contact_aside.png")

    # Switch to style.css
    subprocess.run(["nvim", "--server", PIPE_PATH, "--remote-send", ":e /home/skadi/lab1-cv/style.css<CR>"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.6)

    # 7. CSS Variables, Reset & Body
    snip_section(":1<CR>zt", "07_css_variables_reset.png")

    # 8. CSS Navigation & Header styling
    snip_section(":45<CR>zt", "08_css_nav_header.png")

    # 9. CSS Experience & Project Cards Hover
    snip_section(":160<CR>zt", "09_css_experience_projects.png")

    # 10. CSS Table & Form styling
    snip_section(":245<CR>zt", "10_css_table_form.png")

    print("\nAll 10 snippets cleanly re-snipped without stripes!")

finally:
    foot_proc.terminate()
    try:
        foot_proc.wait(timeout=2)
    except:
        foot_proc.kill()
    if os.path.exists(PIPE_PATH):
        os.remove(PIPE_PATH)

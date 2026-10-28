#!/usr/bin/env python3
import os
import subprocess
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter

def render_neovim_snippet(file_path, start_line, end_line, output_png, title="index.html", mode="NORMAL", filetype="html"):
    with open(file_path, "r", encoding="utf-8") as f:
        all_lines = f.readlines()
    
    snippet_lines = all_lines[start_line - 1 : end_line]
    snippet_code = "".join(snippet_lines)
    
    lexer = get_lexer_by_name(filetype)
    formatter = HtmlFormatter(nowrap=True, style="one-dark")
    highlighted_code = highlight(snippet_code, lexer, formatter)
    pygments_css = formatter.get_style_defs('.highlight')
    
    line_numbers_html = "".join(f"<div class='line-no'>{i}</div>" for i in range(start_line, end_line + 1))
    
    html_content = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    background-color: transparent;
    padding: 16px;
    font-family: 'JetBrainsMono Nerd Font', 'JetBrains Mono', Consolas, monospace;
    display: inline-block;
  }}
  .nvim-window {{
    background: #1a1b26;
    border-radius: 9px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    border: 1px solid #292e42;
    overflow: hidden;
    min-width: 820px;
  }}
  .nvim-tabline {{
    background: #16161e;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #292e42;
    padding: 0 12px;
    height: 34px;
  }}
  .window-controls {{
    display: flex;
    gap: 7px;
    margin-right: 16px;
  }}
  .dot {{
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }}
  .dot.close {{ background: #f7768e; }}
  .dot.min {{ background: #e0af68; }}
  .dot.max {{ background: #9ece6a; }}
  
  .tab {{
    background: #1a1b26;
    color: #c0caf5;
    padding: 5px 14px;
    font-size: 13px;
    font-weight: 500;
    border-top: 2px solid #7aa2f7;
    border-right: 1px solid #292e42;
    display: flex;
    align-items: center;
    gap: 8px;
  }}
  .tab-icon {{
    color: #7aa2f7;
    font-size: 12px;
  }}
  
  .editor-body {{
    display: flex;
    padding: 14px 0;
    background: #1a1b26;
  }}
  .line-numbers {{
    color: #444b6a;
    font-size: 14px;
    line-height: 1.55;
    text-align: right;
    padding: 0 16px 0 12px;
    user-select: none;
    border-right: 1px solid #292e42;
  }}
  .code-area {{
    padding-left: 18px;
    padding-right: 28px;
    color: #a9b1d6;
    font-size: 14px;
    line-height: 1.55;
    white-space: pre;
    flex-grow: 1;
  }}
  
  .statusline {{
    background: #16161e;
    border-top: 1px solid #292e42;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    font-size: 12px;
    color: #787c99;
  }}
  .status-left, .status-right {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .status-mode {{
    background: #7aa2f7;
    color: #15161e;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
  }}
  .status-file {{
    color: #c0caf5;
    font-weight: 600;
  }}
  
  {pygments_css}
  .highlight pre {{
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    background: transparent !important;
  }}
</style>
</head>
<body>
  <div class="nvim-window">
    <div class="nvim-tabline">
      <div class="window-controls">
        <span class="dot close"></span>
        <span class="dot min"></span>
        <span class="dot max"></span>
      </div>
      <div class="tab">
        <span class="tab-icon">󰈙</span>
        <span>{title}</span>
      </div>
    </div>
    
    <div class="editor-body">
      <div class="line-numbers">
        {line_numbers_html}
      </div>
      <div class="code-area">
        <div class="highlight"><pre>{highlighted_code}</pre></div>
      </div>
    </div>
    
    <div class="statusline">
      <div class="status-left">
        <span class="status-mode">{mode}</span>
        <span class="status-file">{title}</span>
        <span>utf-8</span>
      </div>
      <div class="status-right">
        <span>{filetype}</span>
        <span>{start_line}:{end_line}</span>
        <span>100%</span>
      </div>
    </div>
  </div>
</body>
</html>
"""
    tmp_html = f"/tmp/{os.path.basename(output_png)}.html"
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    cmd = [
        "chromium",
        "--headless",
        "--disable-gpu",
        "--default-background-color=00000000",
        f"--screenshot={output_png}",
        "--window-size=1200,1000",
        f"file://{tmp_html}"
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    subprocess.run(["magick", output_png, "-trim", "+repage", "-bordercolor", "transparent", "-border", "10", output_png], check=True)
    print(f"Generated: {output_png}")

snippets = [
    {
        "file": "/home/skadi/lab1-cv/homework/flip-card.css",
        "start": 56, "end": 105,
        "out": "/home/skadi/lab1-cv/assets/snippets/11_hw_flip_cards_css.png",
        "title": "flip-card.css", "ft": "css"
    },
    {
        "file": "/home/skadi/lab1-cv/homework/login-card.css",
        "start": 29, "end": 75,
        "out": "/home/skadi/lab1-cv/assets/snippets/12_hw_login_card_css.png",
        "title": "login-card.css", "ft": "css"
    },
    {
        "file": "/home/skadi/lab1-cv/homework/marquee.css",
        "start": 50, "end": 105,
        "out": "/home/skadi/lab1-cv/assets/snippets/13_hw_marquee_css.png",
        "title": "marquee.css", "ft": "css"
    }
]

os.makedirs("/home/skadi/lab1-cv/assets/snippets", exist_ok=True)
for s in snippets:
    render_neovim_snippet(s["file"], s["start"], s["end"], s["out"], s["title"], "NORMAL", s["ft"])

print("All Homework Neovim snippets rendered successfully!")

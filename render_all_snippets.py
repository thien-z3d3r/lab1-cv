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
    min-width: 800px;
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
  .tab-icon {{ color: #7aa2f7; }}

  .nvim-winbar {{
    background: #1f2335;
    color: #7982a9;
    font-size: 12px;
    padding: 4px 16px;
    border-bottom: 1px solid #24283b;
    display: flex;
    align-items: center;
    gap: 6px;
  }}
  .winbar-file {{ color: #a9b1d6; font-weight: 600; }}
  .winbar-sep {{ color: #565f89; }}

  .nvim-body {{
    display: flex;
    background: #1a1b26;
    padding: 10px 0;
    font-size: 13px;
    line-height: 1.55;
    color: #c0caf5;
  }}
  .gutter {{
    padding: 0 12px 0 16px;
    text-align: right;
    color: #565f89;
    user-select: none;
    border-right: 1px solid #24283b;
    font-size: 12.5px;
  }}
  .line-no {{
    height: 20.15px;
  }}
  .code-area {{
    padding: 0 16px;
    overflow-x: auto;
    flex: 1;
  }}
  .code-area pre {{
    font-family: inherit;
    font-size: inherit;
    line-height: 1.55;
    white-space: pre;
  }}
  
  .nvim-statusline {{
    background: #16161e;
    color: #c0caf5;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 26px;
    border-top: 1px solid #24283b;
  }}
  .status-left, .status-right {{
    display: flex;
    align-items: center;
    height: 100%;
  }}
  .status-mode {{
    background: #7aa2f7;
    color: #15161e;
    font-weight: 700;
    padding: 0 10px;
    display: flex;
    align-items: center;
    height: 100%;
  }}
  .status-git {{
    background: #24283b;
    color: #7aa2f7;
    padding: 0 10px;
    display: flex;
    align-items: center;
    height: 100%;
  }}
  .status-file {{
    padding: 0 12px;
    color: #a9b1d6;
  }}
  .status-ft {{
    background: #24283b;
    color: #7aa2f7;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }}
  .status-pos {{
    background: #7aa2f7;
    color: #15161e;
    font-weight: 700;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
  }}
  {pygments_css}
</style>
</head>
<body>
  <div class="nvim-window">
    <div class="nvim-tabline">
      <div class="window-controls">
        <div class="dot close"></div>
        <div class="dot min"></div>
        <div class="dot max"></div>
      </div>
      <div class="tab">
        <span class="tab-icon">󰈚</span>
        <span>{title}</span>
      </div>
    </div>
    <div class="nvim-winbar">
      <span class="winbar-file">{title}</span>
      <span class="winbar-sep">&gt;</span>
      <span>Lines {start_line}-{end_line}</span>
    </div>
    <div class="nvim-body">
      <div class="gutter">
        {line_numbers_html}
      </div>
      <div class="code-area">
        <pre class="highlight">{highlighted_code.strip()}</pre>
      </div>
    </div>
    <div class="nvim-statusline">
      <div class="status-left">
        <div class="status-mode">{mode}</div>
        <div class="status-git"> main</div>
        <div class="status-file">{title}</div>
      </div>
      <div class="status-right">
        <div class="status-ft">{filetype}</div>
        <div class="status-pos">ln {start_line}, col 1</div>
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
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 1, "end": 31,
        "out": "/home/skadi/lab1-cv/assets/snippets/01_html_head_nav.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 33, "end": 60,
        "out": "/home/skadi/lab1-cv/assets/snippets/02_html_hero.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 62, "end": 105,
        "out": "/home/skadi/lab1-cv/assets/snippets/03_html_experience.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 133, "end": 178,
        "out": "/home/skadi/lab1-cv/assets/snippets/04_html_projects.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 220, "end": 268,
        "out": "/home/skadi/lab1-cv/assets/snippets/05_html_table.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 272, "end": 308,
        "out": "/home/skadi/lab1-cv/assets/snippets/06_html_contact_form.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/index.html",
        "start": 312, "end": 352,
        "out": "/home/skadi/lab1-cv/assets/snippets/07_html_aside.png",
        "title": "index.html", "ft": "html"
    },
    {
        "file": "/home/skadi/lab1-cv/style.css",
        "start": 7, "end": 44,
        "out": "/home/skadi/lab1-cv/assets/snippets/08_css_variables_reset.png",
        "title": "style.css", "ft": "css"
    },
    {
        "file": "/home/skadi/lab1-cv/style.css",
        "start": 195, "end": 242,
        "out": "/home/skadi/lab1-cv/assets/snippets/09_css_buttons_transitions.png",
        "title": "style.css", "ft": "css"
    },
    {
        "file": "/home/skadi/lab1-cv/style.css",
        "start": 334, "end": 375,
        "out": "/home/skadi/lab1-cv/assets/snippets/10_css_card_hover.png",
        "title": "style.css", "ft": "css"
    },
    {
        "file": "/home/skadi/lab1-cv/style.css",
        "start": 485, "end": 535,
        "out": "/home/skadi/lab1-cv/assets/snippets/11_css_table_styling.png",
        "title": "style.css", "ft": "css"
    }
]

os.makedirs("/home/skadi/lab1-cv/assets/snippets", exist_ok=True)
for s in snippets:
    render_neovim_snippet(s["file"], s["start"], s["end"], s["out"], s["title"], "NORMAL", s["ft"])

print("All Neovim snippets rendered successfully!")

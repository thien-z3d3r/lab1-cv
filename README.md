# Lab 1: Environment & Basic HTML / CSS

Web Design and Development course assignment repository by **Huynh Khanh Thien**.

---

## 1. Student Information

- **Full Name**: Huỳnh Khánh Thiện (Huynh Khanh Thien)
- **Major**: Computer Science (BCU Joint Program – University of Information Technology, VNU-HCM)
- **GitHub Repository**: [https://github.com/thien-z3d3r/lab1-cv](https://github.com/thien-z3d3r/lab1-cv)
- **Live Deployment (GitHub Pages)**: [https://thien-z3d3r.github.io/lab1-cv/](https://thien-z3d3r.github.io/lab1-cv/)
- **Live Homework Showcase**: [https://thien-z3d3r.github.io/lab1-cv/homework/](https://thien-z3d3r.github.io/lab1-cv/homework/)

---

## 2. Project Deliverables

### In-Class Exercises (Exercises 1 to 4)
- **CV / Resume (`index.html`)**: Semantic personal online resume built with HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), headings hierarchy, tables, lists, images, and contact form controls.
- **Styling (`style.css`)**: External CSS stylesheet implementing CSS variables, box model reset, flexbox and grid layouts, typography, and interactive transitions.
- **UIT Favicon**: Integrated UIT logo (`Logo_UIT_In_bde69cac47.jpg`).

### Homework Exercises (Section 6)
All three homework exercises are implemented as standalone pages and assembled into an integrated showcase portal in the `homework/` directory:

1. **Exercise 1: Flip Card Gallery**
   - File: `homework/flip-card.html` & `homework/flip-card.css`
   - Live: [Flip Card Gallery](https://thien-z3d3r.github.io/lab1-cv/homework/flip-card.html)
   - Focus: 3D perspective, `rotateY(180deg)`, `transform-style: preserve-3d`, `backface-visibility: hidden`.
2. **Exercise 2: Login / Sign-up Card**
   - File: `homework/login-card.html` & `homework/login-card.css`
   - Live: [Login Card](https://thien-z3d3r.github.io/lab1-cv/homework/login-card.html)
   - Focus: Flexbox centering, two-column layout, custom form input styling, and linear gradient decorative panel.
3. **Exercise 3: Infinite Scrolling Marquee**
   - File: `homework/marquee.html` & `homework/marquee.css`
   - Live: [Marquee](https://thien-z3d3r.github.io/lab1-cv/homework/marquee.html)
   - Focus: `@keyframes` continuous translation, infinite looping, and `animation-play-state: paused` on hover.
4. **Homework Showcase Portal**
   - File: `homework/index.html` & `homework/style.css`
   - Live: [Homework Portal](https://thien-z3d3r.github.io/lab1-cv/homework/)

### Formal Word Report
- **File**: `Lab1_HuynhKhanhThien.docx`
- Generated using `build_docx.js` via the `docx` library.
- Contains 19 high-resolution figures (Neovim editor snippets, browser rendering proofs, responsive viewport checks, and public submission links).

---

## 3. Directory Structure

```text
lab1-cv/
├── index.html                   # In-class CV personal resume
├── style.css                    # External CSS stylesheet
├── README.md                    # Project documentation
├── Lab1_HuynhKhanhThien.docx    # Word report deliverable
├── build_docx.js                # Report generation script
├── package.json                 # Project dependencies
├── homework/                    # Section 6 homework exercises
│   ├── index.html               # Integrated homework portal
│   ├── style.css                # Homework portal styling
│   ├── flip-card.html           # Homework 1: Flip Card Gallery
│   ├── flip-card.css            # Homework 1 CSS
│   ├── login-card.html          # Homework 2: Login Card
│   ├── login-card.css           # Homework 2 CSS
│   ├── marquee.html             # Homework 3: Infinite Marquee
│   └── marquee.css              # Homework 3 CSS
└── assets/                      # Media and screenshots
    ├── avatar.svg               # Profile avatar
    ├── rendered_page.png        # Full-page CV screenshot
    ├── homework/                # Rendered homework screenshots
    ├── snippets/                # Neovim code snippets
    └── viewports/               # Responsive viewport validation screenshots
```

---

## 4. Local Development

Preview the project locally using any static web server:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx serve .
```

Then open `http://localhost:8000` in your web browser.
# lab1-cv

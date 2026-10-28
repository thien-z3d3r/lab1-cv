const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  Header,
  Footer,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber
} = require('docx');

const ROOT_DIR = '/home/skadi/lab1-cv';
const SNIPPETS_DIR = path.join(ROOT_DIR, 'assets/snippets');

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

function createHeading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 26,
        color: "0F172A",
        font: "Arial"
      })
    ]
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 22,
        color: "1E293B",
        font: "Arial"
      })
    ]
  });
}

function createParagraph(text, options = {}) {
  const { bold = false, italic = false, size = 21, color = "334155", spacingAfter = 100 } = options;
  return new Paragraph({
    spacing: { after: spacingAfter, line: 260 },
    children: [
      new TextRun({
        text: text,
        bold: bold,
        italic: italic,
        size: size,
        color: color,
        font: "Arial"
      })
    ]
  });
}

function createImageBlock(imagePath, caption, maxDocWidth = 490) {
  const data = fs.readFileSync(imagePath);
  const dim = getPngDimensions(imagePath);
  const widthPx = maxDocWidth;
  const heightPx = Math.round(maxDocWidth * dim.height / dim.width);
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 50 },
      children: [
        new ImageRun({
          type: "png",
          data: data,
          transformation: { width: widthPx, height: heightPx },
          altText: { title: caption, description: caption, name: caption }
        })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: caption,
          italic: true,
          size: 18,
          color: "64748B",
          font: "Arial"
        })
      ]
    })
  ];
}

async function generateDocx() {
  const borderCell = { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" };
  const cellBorders = { top: borderCell, bottom: borderCell, left: borderCell, right: borderCell };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 21, color: "334155" },
          paragraph: { spacing: { line: 260 } }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "Lab 1 Practical Report - Web Design & Development | Huynh Khanh Thien",
                    size: 17,
                    color: "94A3B8",
                    font: "Arial"
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "Page ", size: 17, color: "94A3B8", font: "Arial" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 17, color: "94A3B8", font: "Arial" }),
                  new TextRun({ text: " / ", size: 17, color: "94A3B8", font: "Arial" }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 17, color: "94A3B8", font: "Arial" })
                ]
              })
            ]
          })
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 40 },
            children: [
              new TextRun({
                text: "VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY",
                bold: true,
                size: 20,
                color: "475569",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: "UNIVERSITY OF INFORMATION TECHNOLOGY",
                bold: true,
                size: 22,
                color: "0F172A",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: "BIRMINGHAM CITY UNIVERSITY (BCU) JOINT PROGRAMME",
                size: 19,
                color: "475569",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: "LAB 1 PRACTICAL REPORT",
                bold: true,
                size: 28,
                color: "0369A1",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Course: Web Design and Development\nTopic: Development Environment & HTML/CSS Fundamentals (Personal CV Page)",
                bold: true,
                size: 21,
                color: "1E293B",
                font: "Arial"
              })
            ]
          }),

          new Table({
            width: { size: 9026, type: WidthType.DXA },
            columnWidths: [2600, 6426],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Student Name:", bold: true, size: 20, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Huynh Khanh Thien", bold: true, size: 20, font: "Arial" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Major:", bold: true, size: 20, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Computer Science (BCU Joint Programme)", size: 20, font: "Arial" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "GitHub Repository:", bold: true, size: 20, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "https://github.com/thien-z3d3r/lab1-cv (Public)", size: 20, font: "Arial", color: "0369A1" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "GitHub Pages:", bold: true, size: 20, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "https://thien-z3d3r.github.io/lab1-cv/", size: 20, font: "Arial", color: "0369A1" })] })]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 180 }, children: [] }),

          // Section 1: Objectives & Repository Structure
          createHeading1("1. Project Objectives & Repository Structure"),
          createParagraph(
            "In Lab 1, I developed a personal curriculum vitae (Online CV/Resume) website using pure HTML5 and CSS3. The contents of the page are directly tailored to my professional background in EVM Smart Contract development, low-level systems optimization (Solidity, Yul, Rust, C++), and distributed computing infrastructure."
          ),
          createParagraph(
            "The visual design follows a clean, minimalist aesthetic with a deep dark palette (#0f1013), eliminating superfluous decoration to focus on clear typography, structured readability, and visual hierarchy. The entire codebase and content are written in standard English to align with international academic and professional standards."
          ),
          createParagraph(
            "The project directory structure is organized as follows:\n" +
            "• index.html: Contains the core document structure utilizing semantic HTML5 elements.\n" +
            "• style.css: Dedicated external stylesheet managing design tokens, custom properties, and responsive layout rules.\n" +
            "• assets/: Directory containing the vector profile avatar (avatar.svg) and the official UIT favicon icon."
          ),

          // Section 2: HTML Analysis
          createHeading1("2. HTML Source Code Analysis (index.html)"),
          createParagraph(
            "The following subsections explain each major semantic block within index.html, accompanied by screenshots captured directly from my Neovim editing environment:"
          ),

          createHeading2("2.1 Page Initialization and Navigation Bar (<head>, <nav>)"),
          createParagraph(
            "• The <!DOCTYPE html> declaration and root element <html lang=\"en\"> adhere strictly to HTML5 specifications.\n" +
            "• The <meta charset=\"UTF-8\"> and <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> tags guarantee proper character encoding and responsive scaling across diverse device viewports.\n" +
            "• The <link rel=\"icon\"> element links the official UIT logo as suggested in Exercise 1.\n" +
            "• The semantic <nav> element houses the personal identity header along with jump links targeting key document sections: About, Experience, Projects, Skills, Education, and Contact."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '01_html_nav.png'),
            "Figure 1: Page initialization, metadata, UIT favicon, and semantic <nav> element in Neovim"
          ),

          createHeading2("2.2 Header and Hero Section (<header>)"),
          createParagraph(
            "• The <header id=\"about\"> element serves as the introductory hero section of the portfolio.\n" +
            "• It utilizes a primary <h1> heading for the developer name, paragraph tags <p> for professional title and mission statement, and direct communication channels.\n" +
            "• The <img> element embeds the vector profile graphic (avatar.svg), complemented by an interactive contact link list (Email, Phone, GitHub, and LinkedIn)."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '02_html_header.png'),
            "Figure 2: Structure of the <header> hero section and contact links in Neovim"
          ),

          createHeading2("2.3 Professional Experience Section (<section id=\"experience\">)"),
          createParagraph(
            "• The <section id=\"experience\"> element groups all professional work history.\n" +
            "• Each role (Uniswap Labs and High-Performance Distributed Systems) is isolated inside an <article class=\"item-block\"> element, fulfilling HTML5 semantic standards for standalone, self-contained items.\n" +
            "• Position titles use <h3>, timelines are marked using <span>, and core achievements are clearly structured with unordered lists (<ul>, <li>)."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '03_html_experience.png'),
            "Figure 3: Semantic <section> and <article> elements for work experience in Neovim"
          ),

          createHeading2("2.4 Featured Projects Section (<section id=\"projects\">)"),
          createParagraph(
            "• The project portfolio showcases four core software engineering projects: Streaming Anomaly Detector, Supply Chain Optimization Protocol, Deep Neural Network from Scratch, and Evolutionary Multi-Agent Simulator.\n" +
            "• Each project is implemented as an <article class=\"project-item\"> element containing hyperlink headings <a>, technology badge tags, and concise technical summaries."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '04_html_projects.png'),
            "Figure 4: Featured software engineering project articles in Neovim"
          ),

          createHeading2("2.5 Technical Skills Table (<table>)"),
          createParagraph(
            "• To fulfill the tabular data requirements of Lab 1, a comprehensive technical skills matrix was structured across four domains: Smart Contracts, Systems & Languages, AI/ML & Automation, and Infrastructure & DevOps.\n" +
            "• The table conforms to strict HTML5 standards, featuring a <table> container, a <thead> block with scoped header cells (<th scope=\"col\">), and a <tbody> section containing rows (<tr>) and data cells (<td>)."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '05_html_table.png'),
            "Figure 5: Technical skills matrix rendered with standard <table> structure in Neovim"
          ),

          createHeading2("2.6 Contact Form, Aside Sidebar, and Footer (<form>, <aside>, <footer>)"),
          createParagraph(
            "• <form> Element: Satisfies the Lab 1 form requirements with accessible inputs for Name (<input type=\"text\">), Email (<input type=\"email\">), Message (<textarea>), and a submit button (<button type=\"submit\">). All inputs are bound to descriptive <label> elements via matching for and id attributes.\n" +
            "• <aside> Element: Acts as a complementary sidebar featuring educational qualifications (University of Information Technology & Birmingham City University), competitive awards using an ordered list (<ol>), and quick technical specifications via a definition list (<dl>, <dt>, <dd>).\n" +
            "• <footer> Element: Marks the page ending with personal copyright notes and an accessible back-to-top navigation link."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '06_html_contact_aside.png'),
            "Figure 6: Contact <form>, supplementary <aside> sidebar, and <footer> in Neovim"
          ),

          // Section 3: CSS Analysis
          createHeading1("3. CSS Source Code Analysis (style.css)"),
          createParagraph(
            "The styling rules are encapsulated within a separate external stylesheet (style.css) following Lab 1 best practices. The design prioritizes visual simplicity, distinct typographic hierarchy, and robust mobile responsiveness."
          ),

          createHeading2("3.1 CSS Custom Properties, Global Reset & Box Model"),
          createParagraph(
            "• The :root pseudo-class declares centralized CSS variables for background colors (--bg: #0f1013), card surfaces (--surface: #15171c), subtle borders (--border: #22252c), and body text (--text: #e1e4ea).\n" +
            "• The universal selector * enforces box-sizing: border-box, ensuring padding and border dimensions are accounted for within defined element dimensions to prevent unexpected layout breakage."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '07_css_variables_reset.png'),
            "Figure 7: Centralized CSS custom properties (:root) and box model reset in Neovim"
          ),

          createHeading2("3.2 Navigation Bar & Header Hero Styling"),
          createParagraph(
            "• The .navbar class uses position: sticky and backdrop-filter: blur(8px), creating a persistent translucent top navigation bar during scrolling.\n" +
            "• The header layout is structured via CSS Flexbox, arranging biographical introductory text on the left and the circular profile avatar on the right."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '08_css_nav_header.png'),
            "Figure 8: Sticky navigation bar and flexbox header styling in Neovim"
          ),

          createHeading2("3.3 Main Layout Grid, Card Design & Hover Transitions (Exercise 4)"),
          createParagraph(
            "• The primary content area utilizes a two-column CSS Grid (.layout-container { display: grid; grid-template-columns: 1fr 310px; gap: 48px; }).\n" +
            "• Implements Exercise 4 requirements: Project cards (.project-item) and action buttons include smooth transition rules (transition: border-color 0.2s ease, transform 0.2s ease). When hovered (:hover), elements smoothly elevate via transform: translateY(-2px) with an illuminated border, providing natural tactile feedback."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '09_css_experience_projects.png'),
            "Figure 9: Article styling, grid alignment, and hover transitions in Neovim"
          ),

          createHeading2("3.4 Data Table Styling, Contact Form & Responsive Media Queries"),
          createParagraph(
            "• The data table is wrapped inside a scroll container with overflow-x: auto to prevent horizontal viewport clipping on mobile screens, paired with subtle row hover effects.\n" +
            "• Form controls (input and textarea) dynamically update their border color to --border-focus (#4b5563) on focus, giving users clear visual cues.\n" +
            "• CSS Media Queries (@media (max-width: 860px) and @media (max-width: 600px)) collapse the multi-column grid into a single-column layout on smaller screens."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '10_css_table_form.png'),
            "Figure 10: Table styling, input focus states, and responsive media queries in Neovim"
          ),

          // Section 4: Rendered Results
          createHeading1("4. Visual Output & Rendered Page Results"),
          createParagraph(
            "Below is the complete visual capture of the rendered personal CV webpage following the implementation of all HTML5 and CSS3 specifications:"
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/rendered_page.png'),
            "Figure 11: Complete browser view of the personal CV portfolio for Huynh Khanh Thien"
          ),

          // Section 5: Deployment
          createHeading1("5. Deployment Workflow & GitHub Pages Setup"),
          createParagraph(
            "Following local development, the project was deployed to a production web environment following Section 5 of the Lab 1 manual:\n" +
            "1. Repository initialization and local commit: git add . && git commit -m '...'\n" +
            "2. Remote synchronization: git remote add origin https://github.com/thien-z3d3r/lab1-cv.git && git push -u origin main\n" +
            "3. GitHub Pages activation: Configured under Repository Settings -> Pages, targeting the main branch and root folder /(root).\n" +
            "4. Production acceptance testing: Verified live and fully accessible at https://thien-z3d3r.github.io/lab1-cv/\n" +
            "5. All supplementary homework assignments were also deployed under https://thien-z3d3r.github.io/lab1-cv/homework/"
          ),

          // Section 6: Homework
          createHeading1("6. Homework Exercises"),
          createParagraph(
            "This section details the complete implementation of the 3 homework assignments outlined in Section 6 of the Lab 1 laboratory manual, matching standard target design references with high fidelity:"
          ),

          createHeading2("6.1 Exercise 1: 3D Flip Card Gallery"),
          createParagraph(
            "The objective is to construct three technology cards (HTML, CSS, JavaScript) that perform a realistic 180-degree 3D flip on hover. The front face displays the technology icon and title, while the back face reveals a detailed functional summary.\n\n" +
            "Key CSS3 techniques implemented:\n" +
            "• perspective: 1000px: Establishes three-dimensional scene depth on the parent container.\n" +
            "• transform-style: preserve-3d: Preserves child elements within 3D coordinate space throughout rotations.\n" +
            "• transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1): Delivers a polished, natural flipping motion.\n" +
            "• backface-visibility: hidden: Hides the reverse side of card planes when facing away from the camera.\n" +
            "• transform: rotateY(180deg): Flips the card 180 degrees along its vertical Y-axis on mouse hover."
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/snippets/11_hw_flip_cards_css.png'),
            "Figure 12: CSS implementation of 3D card rotation and transitions in flip-card.css"
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/homework/01_flip_cards.png'),
            "Figure 13: 3D Flip Card Gallery in default state (Front faces)"
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/homework/01_flip_cards_flipped.png'),
            "Figure 14: 3D Flip Card Gallery on hover - reverse face displaying functional summary"
          ),

          createHeading2("6.2 Exercise 2: Two-Column Login / Sign-up Card"),
          createParagraph(
            "This assignment requires building a responsive, centered two-column authentication card using CSS Flexbox:\n" +
            "• Left Column (Form Panel): Clean white background containing the 'Welcome back' heading, 'Sign in to continue' subtitle, input fields for Email (you@example.com) and Password (••••••••), a 'Remember me' checkbox, and a prominent blue 'Sign In' button with subtle hover elevation.\n" +
            "• Right Column (Decorative Panel): Rich blue gradient (#2563eb to #1e40af) presenting a 'Hello, Friend!' greeting and inspiring copy encouraging web development.\n\n" +
            "Key CSS techniques:\n" +
            "• Viewport Flexbox centering: display: flex; justify-content: center; align-items: center; min-height: 100vh.\n" +
            "• Card aesthetics: border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08).\n" +
            "• Form controls: Polished input borders, focused glow styling, smooth button transitions, and hover elevation (transform: translateY(-1px))."
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/snippets/12_hw_login_card_css.png'),
            "Figure 15: CSS implementation for the two-column authentication card in login-card.css"
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/homework/02_login_card.png'),
            "Figure 16: Completed Login / Sign-up Card matching reference specifications"
          ),

          createHeading2("6.3 Exercise 3: Infinite Scrolling Technology Marquee"),
          createParagraph(
            "This assignment builds an uninterrupted, horizontally scrolling ticker displaying modern web technologies (HTML, CSS, JavaScript, Git, GitHub, VS Code) that automatically pauses when the user hovers over the track.\n\n" +
            "Key CSS techniques:\n" +
            "• @keyframes scrollMarquee: Continuously translates the inner track from translateX(0) to translateX(-50%).\n" +
            "• Seamless looping: Items are duplicated in HTML so that as track group 1 scrolls out of view, group 2 seamlessly continues with zero visual jitter or gaps.\n" +
            "• animation: scrollMarquee 20s linear infinite: Ensures uniform velocity across all screen widths.\n" +
            "• animation-play-state: paused: Temporarily suspends ticker motion whenever hovered."
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/snippets/13_hw_marquee_css.png'),
            "Figure 17: CSS keyframe animations and hover pause controls in marquee.css"
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/homework/03_marquee.png'),
            "Figure 18: Infinite Scrolling Marquee rendered on dark slate background (#1f2937)"
          ),

          createHeading2("6.4 Homework Showcase Portal"),
          createParagraph(
            "To facilitate streamlined evaluation and testing, all homework exercises were unified under an interactive Showcase Portal at homework/index.html. Evaluators can test all three interactive components on a single portal page or open standalone views via dedicated links."
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/homework/04_homework_portal.png'),
            "Figure 19: Unified interactive Showcase Portal for all homework assignments"
          ),

          // Section 7: Submission Links
          createHeading1("7. Submission & Public Links"),
          createParagraph(
            "In accordance with Section 1.b of the Lab 1 submission requirements, the following public links provide immediate access to the project source code and deployed web environments:\n\n" +
            "• Public GitHub Repository: https://github.com/thien-z3d3r/lab1-cv\n" +
            "• Live CV Portfolio (GitHub Pages): https://thien-z3d3r.github.io/lab1-cv/\n" +
            "• Live Homework Showcase Portal: https://thien-z3d3r.github.io/lab1-cv/homework/\n" +
            "• Standalone Exercise 1 (Flip Cards): https://thien-z3d3r.github.io/lab1-cv/homework/flip-card.html\n" +
            "• Standalone Exercise 2 (Login Card): https://thien-z3d3r.github.io/lab1-cv/homework/login-card.html\n" +
            "• Standalone Exercise 3 (Marquee): https://thien-z3d3r.github.io/lab1-cv/homework/marquee.html"
          ),

          new Paragraph({
            spacing: { before: 200, after: 60 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "--- END OF LAB 1 REPORT ---",
                bold: true,
                size: 20,
                color: "94A3B8",
                font: "Arial"
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(ROOT_DIR, 'Lab1_HuynhKhanhThien.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated Word document at: ${outputPath}`);

  const altPath = '/home/skadi/Downloads/Lab1_HuynhKhanhThien.docx';
  fs.writeFileSync(altPath, buffer);
  console.log(`Copied to Downloads at: ${altPath}`);
}

generateDocx().catch(err => {
  console.error("Error generating docx:", err);
  process.exit(1);
});

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

function createImageBlock(imagePath, caption, widthPx = 540, heightPx = 345) {
  const data = fs.readFileSync(imagePath);
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
                    text: "Báo Cáo Thực Hành Lab 1 - Thiết Kế & Phát Triển Web | Huỳnh Khánh Thiện",
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
                  new TextRun({ text: "Trang ", size: 17, color: "94A3B8", font: "Arial" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 17, color: "94A3B8", font: "Arial" }),
                  new TextRun({ text: " / ", size: 17, color: "94A3B8", font: "Arial" }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 17, color: "94A3B8", font: "Arial" })
                ]
              })
            ]
          })
        },
        children: [
          // Header info
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 40 },
            children: [
              new TextRun({
                text: "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN - ĐHQG TP.HCM",
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
                text: "CHƯƠNG TRÌNH LIÊN KẾT BIRMINGHAM CITY UNIVERSITY (BCU)",
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
                text: "BÁO CÁO BÀI TẬP THỰC HÀNH LAB 1",
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
                text: "Môn học: Web Design and Development\nĐề tài: Môi trường & Cơ bản về HTML / CSS (Trang CV Cá Nhân)",
                bold: true,
                size: 21,
                color: "1E293B",
                font: "Arial"
              })
            ]
          }),

          // Info Table
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
                    children: [new Paragraph({ children: [new TextRun({ text: "Họ và tên sinh viên:", bold: true, size: 20, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Huỳnh Khánh Thiện (Huynh Khanh Thien)", bold: true, size: 20, font: "Arial" })] })]
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
                    children: [new Paragraph({ children: [new TextRun({ text: "Chuyên ngành:", bold: true, size: 20, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Khoa học Máy tính (Computer Science - BCU Joint Program)", size: 20, font: "Arial" })] })]
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

          // Mục 1: Mục tiêu và tổ chức bài làm
          createHeading1("1. Mục Tiêu & Cấu Trúc Dự Án"),
          createParagraph(
            "Trong bài Lab 1, em thực hiện xây dựng một trang web lý lịch cá nhân (Online CV/Resume) bằng HTML5 và CSS thuần. Toàn bộ nội dung trang được xây dựng trực tiếp dựa trên hồ sơ cá nhân của em về mảng lập trình Smart Contract trên EVM, tối ưu hóa hệ thống (Solidity, Yul, Rust, C++) và hạ tầng tính toán phân tán."
          ),
          createParagraph(
            "Giao diện trang web được định hướng theo phong cách tối giản (minimalist) với gam màu tối trầm (#0f1013), hạn chế các chi tiết trang trí thừa thãi để tập trung vào khả năng đọc và bố cục nội dung mạch lạc. Toàn bộ codebase được viết bằng tiếng Anh chuẩn mực để phục vụ môi trường học tập và công việc."
          ),
          createParagraph(
            "Cấu trúc thư mục dự án gồm:\n" +
            "• index.html: Chứa mã nguồn cấu trúc trang, sử dụng các thẻ HTML5 Semantic chuẩn.\n" +
            "• style.css: Tệp định kiểu CSS riêng biệt (External CSS), quản lý biến màu sắc và responsive.\n" +
            "• assets/: Thư mục chứa ảnh đại diện avatar.svg và favicon logo UIT."
          ),

          // Mục 2: Giải thích HTML
          createHeading1("2. Phân Tích Mã Nguồn HTML (index.html)"),
          createParagraph(
            "Dưới đây là phần giải thích các khối thẻ HTML chính trong bài làm, kèm theo ảnh chụp màn hình trực tiếp từ trình soạn thảo Neovim của em:"
          ),

          createHeading2("2.1 Khởi tạo trang và thanh điều hướng (<head>, <nav>)"),
          createParagraph(
            "• Khai báo <!DOCTYPE html> và thẻ gốc <html lang=\"en\"> theo chuẩn HTML5.\n" +
            "• Thẻ <meta charset=\"UTF-8\"> và <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> đảm bảo trang co giãn đúng tỷ lệ trên các kích thước màn hình.\n" +
            "• Thẻ <link rel=\"icon\"> lấy logo UIT theo đúng gợi ý trong Exercise 1.\n" +
            "• Thẻ ngữ nghĩa <nav> chứa tiêu đề tên cá nhân và danh sách liên kết neo (jump links) đến các phần tương ứng: About, Experience, Projects, Skills, Education, Contact."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '01_html_nav.png'),
            "Hình 1: Khởi tạo trang, metadata, favicon UIT và thẻ ngữ nghĩa <nav> mở trong Neovim"
          ),

          createHeading2("2.2 Phần giới thiệu đầu trang (<header>)"),
          createParagraph(
            "• Thẻ <header id=\"about\"> đóng vai trò phần giới thiệu đầu trang (Hero Section).\n" +
            "• Sử dụng tiêu đề chính <h1> cho họ tên, thẻ <p> cho chức danh và đoạn tóm tắt định hướng nghề nghiệp.\n" +
            "• Thẻ <img> nhúng ảnh đại diện vector (avatar.svg), đi kèm danh sách liên kết liên hệ trực tiếp (Email, Điện thoại, GitHub, LinkedIn)."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '02_html_header.png'),
            "Hình 2: Cấu trúc <header> giới thiệu thông tin và liên hệ mở trong Neovim"
          ),

          createHeading2("2.3 Phần kinh nghiệm làm việc (<section id=\"experience\">)"),
          createParagraph(
            "• Thẻ <section id=\"experience\"> nhóm toàn bộ nội dung kinh nghiệm làm việc.\n" +
            "• Mỗi vị trí công tác (Uniswap Labs và Hệ thống giao dịch phân tán) được đóng gói trong một thẻ <article class=\"item-block\"> riêng biệt, thể hiện đúng ngữ nghĩa của một mẩu nội dung độc lập trong HTML5.\n" +
            "• Tiêu đề công việc dùng <h3>, thời gian dùng <span>, và các trách nhiệm/kết quả được trình bày rõ ràng bằng danh sách <ul> và <li>."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '03_html_experience.png'),
            "Hình 3: Cấu trúc <section> và các thẻ <article> kinh nghiệm mở trong Neovim"
          ),

          createHeading2("2.4 Phần dự án tiêu biểu (<section id=\"projects\">)"),
          createParagraph(
            "• Khu vực danh sách dự án bao gồm 4 dự án phần mềm chính: Streaming Anomaly Detector, Supply Chain Optimization Protocol, Deep Neural Network from Scratch, và Evolutionary Multi-Agent Simulator.\n" +
            "• Mỗi dự án là một thẻ <article class=\"project-item\"> chứa tiêu đề có liên kết <a>, nhãn công nghệ sử dụng và đoạn mô tả ngắn gọn."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '04_html_projects.png'),
            "Hình 4: Danh sách thẻ dự án phần mềm tiêu biểu mở trong Neovim"
          ),

          createHeading2("2.5 Bảng kỹ năng kỹ thuật (<table>)"),
          createParagraph(
            "• Để đáp ứng yêu cầu sử dụng phần tử bảng (table) trong đề bài Lab 1, em tạo bảng tổng hợp kỹ năng kỹ thuật gồm 4 nhóm: Smart Contracts, Systems & Languages, AI/ML & Automation, và Infrastructure & DevOps.\n" +
            "• Cấu trúc bảng gồm thẻ <table>, phần đầu bảng <thead> chứa các ô tiêu đề <th scope=\"col\">, và phần thân <tbody> chứa các hàng <tr> cùng dữ liệu <td>."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '05_html_table.png'),
            "Hình 5: Bảng kỹ năng kỹ thuật với cấu trúc <table> chuẩn mở trong Neovim"
          ),

          createHeading2("2.6 Biểu mẫu liên hệ & Thanh bên Aside (<form>, <aside>, <footer>)"),
          createParagraph(
            "• Thẻ <form>: Đáp ứng yêu cầu Form & Input trong Lab 1 với các trường họ tên (<input type=\"text\">), email (<input type=\"email\">), ô nhập nội dung (<textarea>) và nút gửi (<button type=\"submit\">). Mỗi ô nhập đều có <label> gắn liền qua thuộc tính for/id.\n" +
            "• Thẻ <aside>: Thanh bên chứa thông tin học vấn (Đại học Công nghệ Thông tin & Birmingham City University), giải thưởng cuộc thi bằng danh sách có thứ tự <ol>, và thông số kỹ thuật nhanh bằng danh sách định nghĩa <dl>, <dt>, <dd>.\n" +
            "• Thẻ <footer>: Chân trang thể hiện bản quyền cá nhân và đường link quay về đầu trang."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '06_html_contact_aside.png'),
            "Hình 6: Biểu mẫu <form>, thanh bên <aside> và chân trang <footer> mở trong Neovim"
          ),

          // Mục 3: Giải thích CSS
          createHeading1("3. Phân Tích Mã Nguồn CSS (style.css)"),
          createParagraph(
            "File CSS được tách riêng và liên kết với HTML theo đúng khuyến nghị của đề bài (External CSS). Phong cách thiết kế ưu tiên sự gọn gàng, tính phân cấp rõ ràng và hỗ trợ tốt trên màn hình di động."
          ),

          createHeading2("3.1 Biến CSS, Reset & Box Model"),
          createParagraph(
            "• Khối :root khai báo các biến CSS (CSS Variables) để quản lý tập trung mã màu nền (--bg: #0f1013), màu bề mặt (--surface: #15171c), màu viền (--border: #22252c) và màu chữ (--text: #e1e4ea).\n" +
            "• Quy tắc * { box-sizing: border-box; } giúp tính toán kích thước phần tử chính xác gồm cả padding và border, tránh lỗi vỡ bố cục khi thêm khoảng đệm."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '07_css_variables_reset.png'),
            "Hình 7: Khai báo biến CSS :root và thiết lập Box Model mở trong Neovim"
          ),

          createHeading2("3.2 Định kiểu Navigation & Header"),
          createParagraph(
            "• Thanh .navbar sử dụng position: sticky và backdrop-filter: blur(8px) giúp thanh menu cố định phía trên khi cuộn trang.\n" +
            "• Bố cục header dùng Flexbox chia hai phần: khối văn bản thông tin bên trái và ảnh đại diện bo tròn bên phải."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '08_css_nav_header.png'),
            "Hình 8: Định kiểu thanh điều hướng và header mở trong Neovim"
          ),

          createHeading2("3.3 Bố cục nội dung chính, Card & Hiệu ứng Hover (Exercise 4)"),
          createParagraph(
            "• Bố cục trang chia thành 2 cột bằng CSS Grid (.layout-container { display: grid; grid-template-columns: 1fr 310px; gap: 48px; }).\n" +
            "• Thực hiện yêu cầu Exercise 4 trong đề bài: Thẻ dự án .project-item và nút bấm đều được gắn transition: border-color 0.2s ease, transform 0.2s ease. Khi rê chuột qua (:hover), phần tử nhấc lên nhẹ nhàng bằng transform: translateY(-2px) và viền sáng hơn, tạo phản hồi xúc giác tự nhiên."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '09_css_experience_projects.png'),
            "Hình 9: Định kiểu danh sách bài viết và hiệu ứng hover mở trong Neovim"
          ),

          createHeading2("3.4 Định kiểu Bảng dữ liệu & Form liên hệ"),
          createParagraph(
            "• Bảng dữ liệu được bọc trong container có overflow-x: auto để không bị tràn khi xem trên màn hình nhỏ. Hàng bảng có hiệu ứng đổi màu nền nhẹ khi rê chuột.\n" +
            "• Ô nhập liệu input và textarea khi focus sẽ đổi màu viền sang --border-focus (#4b5563) để người dùng nhận biết vị trí đang gõ phím.\n" +
            "• Áp dụng Media Query (@media (max-width: 860px) và @media (max-width: 600px)) để tự động chuyển bố cục lưới thành 1 cột trên màn hình điện thoại."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '10_css_table_form.png'),
            "Hình 10: Định kiểu bảng, form liên hệ và media queries mở trong Neovim"
          ),

          // Mục 4: Ảnh chụp kết quả
          createHeading1("4. Kết Quả Giao Diện Hiển Thị Trực Quan"),
          createParagraph(
            "Dưới đây là hình ảnh chụp giao diện trang web CV cá nhân sau khi hoàn thiện toàn bộ mã nguồn HTML5 và CSS:"
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/rendered_page.png'),
            "Hình 11: Giao diện hoàn chỉnh trang web CV Huynh Khanh Thien trên trình duyệt",
            500,
            688
          ),

          // Mục 5: Quy trình triển khai
          createHeading1("5. Quy Trình Triển Khai GitHub Pages"),
          createParagraph(
            "Sau khi hoàn thiện mã nguồn, em thực hiện các bước triển khai lên môi trường mạng theo hướng dẫn tại Mục 5 của Lab 1:\n" +
            "1. Khởi tạo kho chứa và commit: git add . && git commit -m '...'\n" +
            "2. Đẩy mã nguồn lên GitHub: git remote add origin https://github.com/thien-z3d3r/lab1-cv.git && git push -u origin main\n" +
            "3. Kích hoạt GitHub Pages trong phần Settings -> Pages của repository, chọn nguồn từ nhánh main và thư mục /(root).\n" +
            "4. Nghiệm thu trang web hoạt động bình thường tại địa chỉ: https://thien-z3d3r.github.io/lab1-cv/"
          ),

          new Paragraph({
            spacing: { before: 180, after: 60 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "--- HẾT BÁO CÁO ---",
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

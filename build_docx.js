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
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 28,
        color: "0F172A",
        font: "Arial"
      })
    ]
  });
}

function createHeading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 24,
        color: "1E293B",
        font: "Arial"
      })
    ]
  });
}

function createParagraph(text, options = {}) {
  const { bold = false, italic = false, size = 22, color = "334155", spacingAfter = 120 } = options;
  return new Paragraph({
    spacing: { after: spacingAfter, line: 276 },
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

function createCallout(label, text) {
  const borderLeft = { style: BorderStyle.SINGLE, size: 24, color: "0284C7" };
  const borderNone = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: [9026],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: borderNone, bottom: borderNone, left: borderLeft, right: borderNone },
            width: { size: 9026, type: WidthType.DXA },
            shading: { fill: "F0F9FF", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 180, right: 180 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: label, bold: true, size: 22, color: "0369A1", font: "Arial" })
                ]
              }),
              new Paragraph({
                spacing: { after: 0 },
                children: [
                  new TextRun({ text: text, size: 21, color: "1E293B", font: "Arial" })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createImageBlock(imagePath, caption, widthPx = 520, heightPx = 340) {
  const data = fs.readFileSync(imagePath);
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 140, after: 60 },
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
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: `Hình: ${caption}`,
          italic: true,
          size: 19,
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
          run: { font: "Arial", size: 22, color: "334155" },
          paragraph: { spacing: { line: 276 } }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 }, // A4 standard
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
                    text: "Báo Cáo Lab 1 - Thiết Kế & Phát Triển Web | Huỳnh Khánh Thiện",
                    size: 18,
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
                  new TextRun({ text: "Trang ", size: 18, color: "94A3B8", font: "Arial" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "94A3B8", font: "Arial" }),
                  new TextRun({ text: " / ", size: 18, color: "94A3B8", font: "Arial" }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "94A3B8", font: "Arial" })
                ]
              })
            ]
          })
        },
        children: [
          // Header / Title block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({
                text: "TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN - ĐHQG TP.HCM",
                bold: true,
                size: 24,
                color: "0F172A",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: "BIRMINGHAM CITY UNIVERSITY (BCU) - JOINT PROGRAM",
                size: 20,
                color: "475569",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 140, after: 120 },
            children: [
              new TextRun({
                text: "BÁO CÁO THỰC HÀNH LAB 1",
                bold: true,
                size: 32,
                color: "0284C7",
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: "MÔ TẢ VÀ GIẢI THÍCH CHI TIẾT XÂY DỰNG CV CÁ NHÂN\nVỚI SEMANTIC HTML5 VÀ MINIMALIST DARK CSS",
                bold: true,
                size: 24,
                color: "1E293B",
                font: "Arial"
              })
            ]
          }),

          // Info Box Table
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
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Họ và tên sinh viên:", bold: true, size: 21, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Huỳnh Khánh Thiện (Huynh Khanh Thien)", size: 21, font: "Arial", bold: true, color: "0284C7" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Chuyên ngành:", bold: true, size: 21, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Khoa học Máy tính (Bachelor of Science in Computer Science)", size: 21, font: "Arial" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Môn học:", bold: true, size: 21, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "Web Design and Development (CS101 / Frontend Web)", size: 21, font: "Arial" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "GitHub Repository:", bold: true, size: 21, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "https://github.com/thien-z3d3r/lab1-cv (Public)", size: 21, font: "Arial", color: "0284C7" })] })]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 2600, type: WidthType.DXA },
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "GitHub Pages Live Demo:", bold: true, size: 21, font: "Arial" })] })]
                  }),
                  new TableCell({
                    borders: cellBorders,
                    width: { size: 6426, type: WidthType.DXA },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [new Paragraph({ children: [new TextRun({ text: "https://thien-z3d3r.github.io/lab1-cv/", size: 21, font: "Arial", color: "0284C7" })] })]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { after: 200 }, children: [] }),

          // Phần 1: Giới thiệu bài thực hành
          createHeading1("1. Giới Thiệu & Triết Lý Thiết Kế"),
          createParagraph(
            "Bài thực hành Lab 1 yêu cầu xây dựng một trang web lý lịch cá nhân (Online CV / Resume) hoàn chỉnh sử dụng cấu trúc ngữ nghĩa HTML5 hiện đại (Semantic HTML5) kết hợp định kiểu bằng CSS thuần. Mục tiêu cốt lõi là làm chủ các thẻ cấu trúc tài liệu, Box Model, hệ thống phân cấp nội dung, cũng như tạo dựng các tương tác người dùng mượt mà thông qua CSS transitions và transforms."
          ),
          createCallout(
            "Triết lý thiết kế (Muted Minimalist Aesthetics):",
            "Trang web được thiết kế theo tone màu trầm, tối giản, mang hơi hướng của các trang portfolio kỹ sư hệ thống/blockchain hàng đầu: nền màu tối than chì (charcoal/dark slate #0d0f12), bề mặt thẻ card #181b23 với đường viền mỏng tinh tế #242936, màu chữ có độ tương phản êm dịu #e2e8f0, và điểm xuyết điểm nhấn bằng sắc xanh biển dịu nhẹ (#38bdf8). Bố cục phân lớp rõ ràng giúp thông tin kỹ thuật được tiếp nhận trực quan, sắc nét và chuyên nghiệp."
          ),

          new Paragraph({ spacing: { after: 140 }, children: [] }),

          // Phần 2: Giải thích chi tiết mã nguồn HTML
          createHeading1("2. Phân Tích & Giải Thích Chi Tiết Mã Nguồn HTML5 (Kèm Ảnh Chụp Neovim)"),
          createParagraph(
            "Mã nguồn được biên tập và quản lý trực tiếp bằng Neovim với môi trường cấu hình hiện đại (LazyVim, giao diện TokyoNight Night). Dưới đây là phân tích chi tiết từng khối chức năng:"
          ),

          // 2.1 Head & Nav
          createHeading2("2.1 Cấu Trúc Khởi Tạo & Thanh Điều Hướng (index.html: Dòng 1 – 31)"),
          createParagraph(
            "• <!DOCTYPE html>: Khai báo chuẩn HTML5 giúp trình duyệt kích hoạt chế độ dựng hình chuẩn (standard mode).\n" +
            "• <meta charset=\"UTF-8\">: Thiết lập bảng mã ký tự quốc tế, hiển thị chính xác tiếng Việt có dấu.\n" +
            "• <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">: Đảm bảo giao diện hiển thị co giãn chuẩn xác trên màn hình di động, không bị vỡ bố cục.\n" +
            "• <link rel=\"icon\" href=\"...\">: Thực hiện Exercise 1 của đề bài, nhúng biểu trưng favicon UIT từ máy chủ chính thức.\n" +
            "• <nav class=\"navbar\">: Thẻ ngữ nghĩa định vị thanh điều hướng đầu trang, chứa thương hiệu cá nhân và danh sách liên kết neo (jump links: #about, #experience, #projects, #skills, #education, #contact)."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '01_html_head_nav.png'),
            "Cấu trúc thẻ <head>, khai báo metadata, favicon UIT và thanh <nav> trong Neovim",
            500,
            466
          ),

          // 2.2 Hero Header
          createHeading2("2.2 Khu Vực Giới Thiệu Cá Nhân - Hero Section (index.html: Dòng 33 – 60)"),
          createParagraph(
            "• <header id=\"about\" class=\"hero-section\">: Đóng vai trò là mốc ngữ nghĩa giới thiệu tổng quan của trang.\n" +
            "• Thẻ <img> với định dạng SVG vector sắc nét hiển thị ảnh đại diện lập trình viên kèm nhãn trạng thái 'Active'.\n" +
            "• Cặp tiêu đề phân cấp <h1> (Tên sinh viên) và <h2> (Vị trí chuyên môn: Smart Contract & Distributed Systems Developer).\n" +
            "• Các thẻ nội tuyến: <strong> nhấn mạnh trọng tâm kỹ năng EVM, <em> biểu thị danh sách ngôn ngữ cấp thấp, và bộ ba nút bấm CTA (Call To Action) điều hướng nhanh."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '02_html_hero.png'),
            "Khối <header> giới thiệu cá nhân và avatar trong Neovim",
            500,
            313
          ),

          // 2.3 Experience
          createHeading2("2.3 Khu Vực Kinh Nghiệm Làm Việc (index.html: Dòng 62 – 105)"),
          createParagraph(
            "• <section id=\"experience\">: Nhóm nội dung theo chủ đề kinh nghiệm thực tế.\n" +
            "• <article class=\"timeline-card\">: Đóng gói từng đơn vị công việc độc lập (Uniswap Labs và Proprietary Trading). Việc dùng <article> hoàn toàn chuẩn mực theo ngữ nghĩa HTML5 cho các khối nội dung có thể đứng độc lập.\n" +
            "• Thẻ <mark>: Làm nổi bật các chỉ số định lượng then chốt (+48% an toàn giao thức, +52% tốc độ phân phối, 500% lợi nhuận net).\n" +
            "• Thẻ <code>: Bao gói các lệnh EVM cấp thấp (TSTORE, TLOAD) để biểu thị mã máy chính xác."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '03_html_experience.png'),
            "Khối thẻ <section> kinh nghiệm làm việc và các thẻ <article> trong Neovim",
            500,
            418
          ),

          // 2.4 Projects
          createHeading2("2.4 Bộ Sưu Tập Dự Án Tiêu Biểu (index.html: Dòng 133 – 178)"),
          createParagraph(
            "• Cấu trúc danh mục dự án gồm 4 công trình kỹ thuật nổi bật được bố trí dạng lưới (Grid 2 cột).\n" +
            "• Mỗi dự án được bọc trong <article class=\"project-card\"> chứa các thẻ nhãn công nghệ (<span class=\"badge\">), tiêu đề <h3>, đoạn mô tả giải thuật <p>, và liên kết nguồn mở <a class=\"link-arrow\"> dẫn trực tiếp về GitHub của sinh viên."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '04_html_projects.png'),
            "Cấu trúc danh sách card dự án phần mềm nổi bật trong Neovim",
            500,
            418
          ),

          // 2.5 Table Skills
          createHeading2("2.5 Bảng Ma Trận Kỹ Năng Kỹ Thuật (index.html: Dòng 220 – 268)"),
          createParagraph(
            "• Đáp ứng trọn vẹn yêu cầu cấu trúc thẻ <table> trong Lab 1.\n" +
            "• Bảng được thiết kế ngữ nghĩa chuẩn mực với <thead> chứa các ô tiêu đề cột <th scope=\"col\"> và <tbody> chứa các hàng dữ liệu <tr>.\n" +
            "• Phân loại 4 nhóm miền kỹ năng: Smart Contracts & Web3, Systems & Languages, AI/ML & Automation, và Infrastructure & DevOps. Các pill màu sắc (<span class=\"level-pill\">) đánh dấu mức độ thành thạo."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '05_html_table.png'),
            "Cấu trúc thẻ <table> ma trận kỹ năng chuyên môn trong Neovim",
            500,
            419
          ),

          // 2.6 Form Contact
          createHeading2("2.6 Biểu Mẫu Liên Hệ Tương Tác (index.html: Dòng 272 – 308)"),
          createParagraph(
            "• Hoàn thành yêu cầu thành phần Forms & Input trong bài Lab: thẻ <form>, các trường nhập liệu <input type=\"text\">, <input type=\"email\">, nhãn <label for=\"...\"> liên kết chặt chẽ với trường nhập liệu bằng thuộc tính id.\n" +
            "• Khung soạn văn bản đa dòng <textarea> và nút submit <button type=\"submit\"> kèm tương tác cảnh báo JavaScript phản hồi khi gửi thư thành công."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '06_html_contact_form.png'),
            "Biểu mẫu tương tác <form> và các trường nhập liệu trong Neovim",
            500,
            417
          ),

          // 2.7 Aside & Footer
          createHeading2("2.7 Thanh Bên Ngữ Nghĩa Aside & Chân Trang Footer (index.html: Dòng 312 – 352)"),
          createParagraph(
            "• <aside class=\"sidebar\">: Chứa các thông tin bổ trợ nhưng liên đới mật thiết với hồ sơ chính:\n" +
            "  + Khối Học vấn: Đại học Công nghệ Thông tin (ĐHQG-HCM) liên kết Birmingham City University (BCU).\n" +
            "  + Khối Giải thưởng: Sử dụng danh sách có thứ tự <ol> cho Giải Ba FPT AI & Robotics Challenge và Giải Khuyến khích Cuộc thi AI Nha Trang.\n" +
            "  + Khối Thông số kỹ thuật nhanh: Áp dụng danh sách định nghĩa <dl>, <dt> (tên thuộc tính) và <dd> (giá trị).\n" +
            "• <footer class=\"page-footer\">: Chân trang cung cấp thông tin bản quyền và liên kết điều hướng cuộn ngược về đỉnh trang (#about)."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '07_html_aside.png'),
            "Cấu trúc thanh bên <aside>, danh sách <ol>, <dl> và chân trang <footer> trong Neovim",
            500,
            430
          ),

          // Phần 3: CSS
          createHeading1("3. Phân Tích & Giải Thích Chi Tiết Mã Nguồn CSS (Kèm Ảnh Chụp Neovim)"),
          createParagraph(
            "Toàn bộ phong cách giao diện được đóng gói trong tệp style.css riêng biệt (External CSS) theo khuyến nghị tại Mục 4.2 của Lab 1. Hệ thống CSS tuân thủ chặt chẽ Box Model, biến tùy biến (CSS Variables) và các kỹ thuật tạo chuyển động mượt mà."
          ),

          // 3.1 Tokens & Reset
          createHeading2("3.1 Hệ Thống Biến Thiết Kế (CSS Variables) & Reset Box Model (style.css: Dòng 7 – 44)"),
          createParagraph(
            "• Biến tùy biến :root: Tập trung toàn bộ bảng màu trầm (--bg-primary, --bg-secondary, --border-subtle, --accent-primary), bán kính bo góc (--radius-sm, --radius-md), thời gian chuyển động transition (--transition-fast: 0.2s, --transition-normal: 0.3s) và bóng đổ (--shadow-card, --shadow-hover).\n" +
            "• Reset toàn cục (*): Thiết lập box-sizing: border-box cho toàn bộ phần tử, giúp độ rộng (width) và độ cao (height) tính gộp cả padding và border, loại bỏ hoàn toàn các lỗi tràn màn hình ngoài ý muốn."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '08_css_variables_reset.png'),
            "Hệ thống biến CSS màu sắc, tokens và reset Box Model trong Neovim",
            500,
            547
          ),

          // 3.2 Transitions & Buttons
          createHeading2("3.2 Hiệu Ứng Chuyển Động Hover & Nút Bấm - Exercise 4 (style.css: Dòng 195 – 242)"),
          createParagraph(
            "• Thực hiện trọn vẹn yêu cầu Exercise 4 trong Lab 1:\n" +
            "  + Sử dụng transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease.\n" +
            "  + Khi người dùng hover chuột vào nút (.btn-primary:hover), nút được nhấc bổng tinh tế bằng transform: translateY(-2px) đồng thời khuếch tán vệt sáng nền xanh dịu mắt (box-shadow: 0 4px 14px rgba(56, 189, 248, 0.25)).\n" +
            "  + Tương tác phản hồi tức thời dưới 0.3 giây tạo cảm giác ứng dụng mượt mà, chuyên nghiệp và có độ nảy xúc giác."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '09_css_buttons_transitions.png'),
            "Định kiểu nút bấm và hiệu ứng transition/transform hover trong Neovim",
            500,
            419
          ),

          // 3.3 Card Hover
          createHeading2("3.3 Bố Cục Thẻ Card & Hiệu Ứng Nâng Chiều Sâu (style.css: Dòng 334 – 375)"),
          createParagraph(
            "• Thẻ .timeline-card và .project-card được tạo hình với nền xám đen (#181b23) và viền mảnh (#242936).\n" +
            "• Khi người dùng rê chuột qua (.timeline-card:hover), thẻ nổi lên với transform: translateY(-3px), viền đổi màu sáng hơn (--border-hover: #384152) và bóng đổ chuyển từ --shadow-card sang --shadow-hover sâu thẳm, tạo cảm giác phân tầng không gian 3D ấn tượng."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '10_css_card_hover.png'),
            "Định kiểu thẻ Card và hiệu ứng đổ bóng nổi tầng trong Neovim",
            500,
            450
          ),

          // 3.4 Table & Form CSS
          createHeading2("3.4 Định Kiểu Bảng Kỹ Năng & Biểu Mẫu Nhập Liệu (style.css: Dòng 485 – 535)"),
          createParagraph(
            "• Bảng dữ liệu .skills-table: Thẻ tiêu đề thead có nền đậm cá tính, các dòng tbody sở hữu hiệu ứng trượt màu nhẹ nhàng khi hover (tr:hover { background-color: var(--bg-card); }).\n" +
            "• Biểu mẫu .contact-form: Các ô input và textarea khi được nhấp chọn (:focus) sẽ kích hoạt viền sáng xanh mảnh kèm vệt glow (box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.18)), nâng cao tối đa khả năng tập trung và trải nghiệm điền mẫu."
          ),
          ...createImageBlock(
            path.join(SNIPPETS_DIR, '11_css_table_styling.png'),
            "Định kiểu bảng dữ liệu Responsive và trường Form trong Neovim",
            500,
            419
          ),

          // Phần 4: Ảnh chụp kết quả hoàn chỉnh
          createHeading1("4. Kết Quả Hiển Thị Hoàn Chỉnh Của Trang Web (Live Preview)"),
          createParagraph(
            "Toàn bộ trang web cá nhân sau khi áp dụng đầy đủ mã nguồn HTML5 và CSS đã được kiểm thử render trực tiếp trên trình duyệt Chromium độ phân giải cao (1280x1800). Giao diện thể hiện sự cân đối, hài hòa về thị giác, bố cục phân tầng sắc sảo và đáp ứng toàn diện mọi yêu cầu bài tập của Lab 1."
          ),
          ...createImageBlock(
            path.join(ROOT_DIR, 'assets/rendered_page.png'),
            "Giao diện hoàn chỉnh trang web CV cá nhân Huỳnh Khánh Thiện (Tone màu trầm, tối giản)",
            500,
            703
          ),

          // Phần 5: Kết luận & Hướng dẫn Deploy
          createHeading1("5. Kết Luận & Hướng Dẫn Triển Khai GitHub Pages"),
          createParagraph(
            "Trang web đã được tổ chức cấu trúc mã nguồn gọn gàng, tuân thủ nguyên tắc lập trình hướng ngữ nghĩa và thẩm mỹ tối giản hiện đại. Quy trình quản trị mã nguồn và triển khai trực tuyến lên GitHub Pages được thực hiện theo đúng chuẩn mực:"
          ),
          createCallout(
            "Các bước triển khai GitHub Pages:",
            "1. Khởi tạo kho chứa cục bộ: git init && git branch -m main\n" +
            "2. Thêm và xác nhận mã nguồn: git add . && git commit -m 'feat: add personal CV with semantic HTML5 and minimalist dark CSS styling'\n" +
            "3. Đẩy lên GitHub Remote: git remote add origin https://github.com/thien-z3d3r/lab1-cv.git && git push -u origin main\n" +
            "4. Kích hoạt GitHub Pages: Truy cập repository trên GitHub -> Settings -> Pages -> Chọn Source: 'Deploy from a branch' -> Nhánh 'main', thư mục '/(root)' -> Save.\n" +
            "5. Kiểm tra kết quả trực tuyến: Truy cập đường dẫn https://thien-z3d3r.github.io/lab1-cv/ để nghiệm thu trang web chạy thực tế trên Internet."
          ),
          new Paragraph({
            spacing: { before: 200, after: 100 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "--- HẾT BÁO CÁO LAB 1 ---",
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

  // Also make a copy with standard format: Lab1_Huỳnh_Khánh_Thiện.docx
  const altPath = '/home/skadi/Downloads/Lab1_HuynhKhanhThien.docx';
  fs.writeFileSync(altPath, buffer);
  console.log(`Copied to Downloads at: ${altPath}`);
}

generateDocx().catch(err => {
  console.error("Error generating docx:", err);
  process.exit(1);
});

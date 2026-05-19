import PDFDocument from "pdfkit";
import fs from "fs";

export class PDFService {
  constructor() {}

  async createPDF(
    path: string,
    name: string,
    image?: { path: string; width: number },
    text?: { data: string; x: number; y: number }[],
  ): Promise<void> {
    const doc = new PDFDocument({ size: "A4", margin: 0, font: "Times-Roman" });

    // Cria o arquivo PDF
    doc.pipe(fs.createWriteStream(`${path}/${name}.pdf`));

    if (image) {
      doc.image(image.path, {
        width: image.width,
        align: "center",
        valign: "center",
      });
    }

    if (text) {
      text.forEach((item) => {
        doc
          .font("Times-Roman")
          .fontSize(12)
          .text(item.data, item.x, item.y);
      });
    }

    doc.end();
  }

  async PDFToBuffer(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 0 });
      const chunks: Buffer[] = [];

      // Escuta os pedaços de dados gerados e adiciona na lista
      doc.on("data", (chunk) => chunks.push(chunk));

      // Quando o PDF terminar de ser gerado, junta tudo em um único Buffer
      doc.on("end", () => {
        const resultadoFinal = Buffer.concat(chunks);
        resolve(resultadoFinal);
      });

      // Captura possíveis erros durante a geração do PDF
      doc.on("error", (err) => reject(err));

      // Seu conteúdo do PDF aqui
      doc
        .font("Times-Roman")
        .fontSize(12)
        .text(
          "Hello world!Hello world!Hello world!Hello world!Hello world!Hello world!",
          10,
          10,
        );

      // Finaliza o documento para disparar o evento 'end'
      doc.end();
    });
  }
}

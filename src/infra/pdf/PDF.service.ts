import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import PDFServiceRepository from "../../core/domain/repository/PDFService.repository.js";

export class PDFService implements PDFServiceRepository {
  constructor() {}

  async createPDF(
    dirPath: string,
    name: string,
    image?: { path: string; width: number },
    text?: { data: string; x: number; y: number, fontSize?: number, color?: string }[],
  ): Promise<{ fullPath: string; size: number }> {
    return new Promise((resolve, reject) => {
      // Garante que o diretório existe
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const fullPath = `${dirPath}/${name}.pdf`;
      const doc = new PDFDocument({ size: "A4", margin: 0, font: "Times-Roman" });

      const writeStream = fs.createWriteStream(fullPath);

      writeStream.on("finish", () => {
        const actualSize = fs.statSync(fullPath).size;
        resolve({ fullPath, size: actualSize });
      });

      writeStream.on("error", reject);
      doc.on("error", reject);

      doc.pipe(writeStream);

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
            .fontSize(item.fontSize || 12)
            .fillColor(item.color || "black")
            .text(item.data, item.x, item.y);
        });
      }

      doc.end();
    });
  }

  async readPDFAsBuffer(filePath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  // não utilizado ainda...
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

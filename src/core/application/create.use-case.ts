import { createWriteStream, readFileSync } from "node:fs";
import PDFDocument from "pdfkit";
import { PDFService } from "../../infra/pdf/PDF.service.js";

export default class CreateUseCase {
  async execute() {
    const PDF_PATH = "public/modelos/esporte/carterinhas";
    const MODELO_PATH = "public/modelos/esporte/modeloEsporte.png";
    const PDF_Service = new PDFService()

    const image = {
      path: MODELO_PATH,
      width: 590,
    };

    const text = [
      { data: "Migudel Angelo Morciella Moraes", x: 30, y: 53 },
      { data: "4000", x: 315, y: 53 },
      { data: "Jd Itapecerica", x: 360, y: 53 },
      { data: "12345-678", x: 510, y: 53 },
    ];

    const pdf = await PDF_Service.createPDF(PDF_PATH, "test", image, text);
    return pdf
  }
}

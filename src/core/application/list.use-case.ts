import { PDFRepository } from "../../infra/database/pdf.repository.js";

export default class ListUseCase {
  private pdfRepository: PDFRepository;

  constructor() {
    this.pdfRepository = new PDFRepository();
  }

  async execute() {
    const pdfs = await this.pdfRepository.listAllPDFs();
    return pdfs.map((pdf) => ({
      id: pdf.id,
      name: pdf.name,
      path: pdf.path,
      size: pdf.size,
      createdAt: pdf.createAt,
      updatedAt: pdf.updated_at,
    }));
  }
}

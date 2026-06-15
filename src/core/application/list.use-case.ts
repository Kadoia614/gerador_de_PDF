import PDFRepository from "../domain/repository/PDFRepository.repository.js";

export default class ListUseCase {
  private pdfRepository: PDFRepository;

  constructor(pdfRepository: PDFRepository) {
    this.pdfRepository = pdfRepository;
  }

  async execute() {
    const response = await this.pdfRepository.listAllPDFs();
    return response;
  }
}

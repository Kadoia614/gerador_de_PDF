import PDFRepository from "../domain/repository/PDFRepository.repository.js";
import PDFServiceRepository from "../domain/repository/PDFService.repository.js";

export default class GetByUuidUseCase {
  private pdfService: PDFServiceRepository;
  private pdfRepository: PDFRepository;

  constructor(PDFService: PDFServiceRepository, PDFRepository: PDFRepository) {
    this.pdfService = PDFService;
    this.pdfRepository = PDFRepository;
  }

  async execute(uuid: string): Promise<GetPDFResponseDTO> {
    try {
      // Busca o registro do PDF no banco
      const pdfRecord = await this.pdfRepository.getPDFByUuid(uuid);

      if (!pdfRecord) {
        throw new Error(`PDF com UUID ${uuid} não encontrado`);
      }

      // Lê o arquivo do disco
      const fileBuffer = await this.pdfService.readPDFAsBuffer(pdfRecord.path);

      return {
        id: pdfRecord.id,
        name: pdfRecord.name,
        file: fileBuffer,
        mimeType: "application/pdf",
      };
    } catch (error) {
      console.error("Erro ao recuperar PDF:", error);
      throw error;
    }
  }
}

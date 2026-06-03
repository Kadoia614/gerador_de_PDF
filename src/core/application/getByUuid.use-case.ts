import { PDFRepository } from "../../infra/database/pdf.repository.js";
import { PDFService } from "../../infra/pdf/PDF.service.js";
import { GetPDFResponseDTO } from "../domain/dto/CreatePDFRequest.dto.js";

export default class GetByUuidUseCase {
  private pdfRepository: PDFRepository;
  private pdfService: PDFService;

  constructor() {
    this.pdfRepository = new PDFRepository();
    this.pdfService = new PDFService();
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

import path from "path";
import { PDFService } from "../../infra/pdf/PDF.service.js";
import { PDFRepository } from "../../infra/database/pdf.repository.js";
import { DataMapper } from "../../infra/pdf/DataMapper.js";
import { CreatePDFRequestDTO, CreatePDFResponseDTO } from "../domain/dto/CreatePDFRequest.dto.js";

export default class CreateUseCase {
  private pdfService: PDFService;
  private pdfRepository: PDFRepository;

  constructor() {
    this.pdfService = new PDFService();
    this.pdfRepository = new PDFRepository();
  }

  async execute(request: CreatePDFRequestDTO): Promise<CreatePDFResponseDTO> {
    const modelType = request.modelType || "esporte";
    const PDF_PATH = path.resolve("public/modelos/esporte/carterinhas");
    const MODELO_PATH = path.resolve("public/modelos/esporte/modeloEsporte.png");

    const textData = DataMapper.mapByModelType(modelType, request.entityData);
    const safeName = request.name.replace(/[<>:"/\\|?*]+/g, "-");

    const image = {
      path: MODELO_PATH,
      width: 590,
    };

    try {
      const { fullPath, size } = await this.pdfService.createPDF(
        PDF_PATH,
        safeName,
        image,
        textData,
      );

      const pdfRecord = await this.pdfRepository.savePDF(
        request.name,
        fullPath,
        size,
      );

      return {
        id: pdfRecord.id,
        name: pdfRecord.name,
        message: "PDF criado com sucesso",
      };
    } catch (error) {
      console.error("Erro ao criar PDF:", error);
      throw new Error(`Falha ao criar PDF: ${error}`);
    }
  }
}

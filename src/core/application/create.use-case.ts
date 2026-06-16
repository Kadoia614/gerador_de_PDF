import { DataMapper } from "../domain/service/DataMapper.domain.service.js";
import {
  CreatePDFRequestDTO,
  CreatePDFResponseDTO,
} from "./dto/CreatePDFRequest.dto.js";
import PDFRepository from "../domain/repository/PDFRepository.repository.js";
import PDFServiceRepository from "../domain/repository/PDFService.repository.js";
import CarterinhaPolicy from "../domain/service/CarterinhaPolicy.domain.service.js";

export default class CreateUseCase {
  private pdfService: PDFServiceRepository;
  private pdfRepository: PDFRepository;

  constructor(PDFService: PDFServiceRepository, PDFRepository: PDFRepository) {
    this.pdfService = PDFService;
    this.pdfRepository = PDFRepository;
  }

  async execute(request: CreatePDFRequestDTO): Promise<CreatePDFResponseDTO> {
    const modelType = request.modelType || "default";

    const carterinhaPolicy = new CarterinhaPolicy(request.name, modelType);

    const FULL_NAME = carterinhaPolicy.getName();
    const { PDF_PATH, FULL_PATH, MODELO_PATH } =
      carterinhaPolicy.getModelAndPath();

    try {
      const pdfRecord = await this.pdfRepository.savePDF(FULL_NAME, FULL_PATH);

      const textData = DataMapper.mapByModelType(modelType, request.entityData, pdfRecord.id);

      const image = {
        path: MODELO_PATH,
        width: 590,
      };

      await this.pdfService.createPDF(PDF_PATH, FULL_NAME, image, textData);

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

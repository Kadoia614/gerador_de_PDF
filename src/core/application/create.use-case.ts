import path from "path";
import { DataMapper } from "../../infra/pdf/DataMapper.js";
import { CreatePDFRequestDTO, CreatePDFResponseDTO } from "./dto/CreatePDFRequest.dto.js";
import PDFRepository from "../domain/repository/PDFRepository.repository.js";
import PDFServiceRepository from "../domain/repository/PDFService.repository.js";

export default class CreateUseCase {
  private pdfService: PDFServiceRepository;
  private pdfRepository: PDFRepository;

  constructor(PDFService: PDFServiceRepository, PDFRepository: PDFRepository) {
    this.pdfService = PDFService;
    this.pdfRepository = PDFRepository;
  }

  async execute(request: CreatePDFRequestDTO): Promise<CreatePDFResponseDTO> {
    const modelType = request.modelType || "default";
    let PDF_PATH
    let MODELO_PATH

    switch (modelType.toLowerCase()) {
      case "esporte":
        PDF_PATH = path.resolve("public/modelos/esporte/carterinhas");
        MODELO_PATH = path.resolve("public/modelos/esporte/modeloEsporte.png");
        break;
      default:
        console.log("default")
        throw new Error("Modelo de PDF desconhecido");
    }

    const textData = DataMapper.mapByModelType(modelType, request.entityData);
    const safeName = request.name.replace(/[<>:"/\\|?*]+/g, "-");
    const fullName = `${safeName}-${modelType}-${Date.now()}`;

    const image = {
      path: MODELO_PATH,
      width: 590,
    };

    try {
      const { fullPath, size } = await this.pdfService.createPDF(
        PDF_PATH,
        fullName,
        image,
        textData,
      );

      const pdfRecord = await this.pdfRepository.savePDF(
        fullName,
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

import { DataMapper } from "../domain/service/EsporteDataMapper.domain.service.js";
import { CreateCarterinhaResponseDTO, CreateSvgEsporteRequestDTO } from "./dto/CreateCarterinha.dto.js";
import CarterinhaPolicy from "../domain/service/CarterinhaPolicy.domain.service.js";
import SvgEsporteDataRepository from "../domain/repository/SvgEsporte.repository.js";
import CarterinhaRepository from "../domain/repository/Carterinha.repository.js";

export default class CreateUseCase {
  constructor(private svgEsporteDataRepository: SvgEsporteDataRepository, private carterinhaRepository: CarterinhaRepository) {}

  async execute(request: CreateSvgEsporteRequestDTO): Promise<CreateCarterinhaResponseDTO> {
    const modelType = request.modelType || "default";
    const payloadCarterinha = {name: request.name, modelType};
    const payloadEsporteData = request.entityData;

    const carterinhaRecord = await this.carterinhaRepository.create(payloadCarterinha)
    let svgDataRecord;

    switch (modelType.toLowerCase()) {
      case "esporte":
        svgDataRecord = await this.svgEsporteDataRepository.create(payloadEsporteData, carterinhaRecord.id);
        break;
      default:
        throw new Error("Modelo desconhecido");
    }

    const carterinhaPolicy = new CarterinhaPolicy(request.name, modelType);

    const FULL_NAME = carterinhaPolicy.getName();
    const { PDF_PATH, FULL_PATH, MODELO_PATH } =
      carterinhaPolicy.getModelAndPath();

}






import { CreateCarterinhaEsporteRequestDTO, CarterinhaEsporteMetadataDTO } from "./dto/CarterinhaEsporte.dto.js";
import CarterinhaEsporteRepository from "../../domain/repository/CarterinhaEsporte.repository.js";

export default class CreateCarterinhaEsporteUseCase {
  constructor(
    private readonly carterinhaEsporteRepository: CarterinhaEsporteRepository,
  ) {}

  async execute(
    request: CreateCarterinhaEsporteRequestDTO,
  ): Promise<CarterinhaEsporteMetadataDTO> {
    const carterinha = await this.carterinhaEsporteRepository.create({
      ...request.entityData,
      name: request.entityData.name || request.name,
    });

    return {
      id: carterinha.id,
      name: carterinha.name,
      createdAt: carterinha.createdAt,
      updatedAt: carterinha.updatedAt,
    };
  }
}

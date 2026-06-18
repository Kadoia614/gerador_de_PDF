import { CarterinhaEsporteDTO } from "./dto/CarterinhaEsporte.dto.js";
import CarterinhaEsporteRepository from "../../domain/repository/CarterinhaEsporte.repository.js";

export default class ListCarterinhasEsporteUseCase {
  constructor(
    private readonly carterinhaEsporteRepository: CarterinhaEsporteRepository,
  ) {}

  async execute(): Promise<CarterinhaEsporteDTO[]> {
    return this.carterinhaEsporteRepository.list();
  }
}

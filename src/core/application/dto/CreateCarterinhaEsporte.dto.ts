export {
  type CreateSvgEsporteRequestDTO,
  type entityDataEsporteDTO,
} from "../esporte/dto/CarterinhaEsporte.dto.js";

export interface CreateCarterinhaRequestDTO {
  name: string;
  modelType: string;
}

export interface CreateCarterinhaResponseDTO extends CreateCarterinhaRequestDTO {
  id: string;
  createdAt: Date;
}

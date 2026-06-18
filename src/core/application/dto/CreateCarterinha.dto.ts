export interface CreateCarterinhaRequestDTO {
  name: string;
  modelType: string;
}

export interface CreateCarterinhaResponseDTO extends CreateCarterinhaRequestDTO {
  id: string;
  createdAt: Date;
}

export interface entityDataDefaultRequestDTO extends CreateCarterinhaRequestDTO {
  entityData: Record<string, any>;
}

export interface entityDataEsporteDTO {
  name: string;
  identidade: string;
  modalidade: string;
  cadastro: string;
  nascimento: string | null;
  endereco: string | null;
  numero: string | null;
  bairro: string | null;
  cep: string | null;
  obs: string | null;
  exame: string | null;
}
export interface CreateSvgEsporteRequestDTO extends entityDataDefaultRequestDTO {
  entityData: entityDataEsporteDTO;
}

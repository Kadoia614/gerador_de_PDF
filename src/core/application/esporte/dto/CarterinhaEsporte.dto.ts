export interface EntityDataEsporteDTO {
  name?: string | null;
  identidade?: string | null;
  modalidade?: string | null;
  cadastro?: string | null;
  nascimento?: string | null;
  endereco?: string | null;
  numero?: string | null;
  bairro?: string | null;
  cep?: string | null;
  obs?: string | null;
  exame?: string | null;
}

export interface CreateCarterinhaEsporteRequestDTO {
  name: string;
  entityData: EntityDataEsporteDTO;
}

export interface CarterinhaEsporteMetadataDTO {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CarterinhaEsporteDTO extends CarterinhaEsporteMetadataDTO {
  identidade: string | null;
  modalidade: string | null;
  cadastro: string | null;
  nascimento: string | null;
  endereco: string | null;
  numero: string | null;
  bairro: string | null;
  cep: string | null;
  obs: string | null;
  exame: string | null;
}

export interface GetCarterinhaEsporteFileDTO {
  id: string;
  name: string;
  file: Buffer;
  mimeType: "application/pdf";
}

export type entityDataEsporteDTO = EntityDataEsporteDTO;
export type CreateSvgEsporteRequestDTO = CreateCarterinhaEsporteRequestDTO;

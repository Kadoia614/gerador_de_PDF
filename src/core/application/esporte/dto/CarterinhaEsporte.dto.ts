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

export interface RenderCarterinhaEsporteRequestDTO {
  name: string;
  entityData: EntityDataEsporteDTO;
}

export interface RenderCarterinhaEsporteResponseDTO {
  file: Buffer;
  fileName: string;
  mimeType: "application/pdf";
}

export type entityDataEsporteDTO = EntityDataEsporteDTO;
export type CreateSvgEsporteRequestDTO = RenderCarterinhaEsporteRequestDTO;
export type CreateCarterinhaEsporteRequestDTO = RenderCarterinhaEsporteRequestDTO;

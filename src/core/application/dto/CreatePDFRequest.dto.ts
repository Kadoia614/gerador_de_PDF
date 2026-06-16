export interface CreatePDFRequestDTO {
  name: string;
  entityData: Record<string, any>;
  modelType?: string; // "esporte" por padrão
}

export interface PDFMetadata {
  id: string;
  name: string;
  path: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface CreatePDFResponseDTO {
  id: string;
  name: string;
  message: string;
}

export interface GetPDFResponseDTO {
  id: string;
  name: string;
  file: Buffer;
  mimeType: string;
}

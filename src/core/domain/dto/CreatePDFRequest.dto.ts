export interface CreatePDFRequestDTO {
  name: string;
  entityData: Record<string, any>;
  modelType?: string; // "esporte" por padrão
}

export interface PDFMetadata {
  id: string;
  name: string;
  path: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
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

export interface CreateCarterinhaEsporteInput {
  name: string;
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

export interface CarterinhaEsporteRecord {
  id: string;
  name: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export default interface CarterinhaEsporteRepository {
  create(data: CreateCarterinhaEsporteInput): Promise<CarterinhaEsporteRecord>;
  findById(id: string): Promise<CarterinhaEsporteRecord | null>;
  list(): Promise<CarterinhaEsporteRecord[]>;
}

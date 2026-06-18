import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../../core/env.js";
import { PrismaClient } from "./prisma/generated/prisma/client.js";
import CarterinhaEsporteRepository, {
  CarterinhaEsporteRecord,
  CreateCarterinhaEsporteInput,
} from "../../core/domain/repository/CarterinhaEsporte.repository.js";

type PrismaCarterinhaEsporteRecord = {
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
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export default class PrismaCarterinhaEsporteRepository
  implements CarterinhaEsporteRepository
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: DATABASE_URL }),
    });
  }

  async create(
    data: CreateCarterinhaEsporteInput,
  ): Promise<CarterinhaEsporteRecord> {
    const record = await this.prisma.carterinha_esporte.create({
      data: {
        name: data.name,
        identidade: data.identidade,
        modalidade: data.modalidade,
        cadastro: data.cadastro,
        nascimento: data.nascimento,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cep: data.cep,
        obs: data.obs,
        exame: data.exame,
      },
    });

    return this.toDTO(record);
  }

  async findById(id: string): Promise<CarterinhaEsporteRecord | null> {
    const record = await this.prisma.carterinha_esporte.findFirst({
      where: {
        id,
        deleted_at: null,
      },
    });

    return record ? this.toDTO(record) : null;
  }

  async list(): Promise<CarterinhaEsporteRecord[]> {
    const records = await this.prisma.carterinha_esporte.findMany({
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return records.map((record) => this.toDTO(record));
  }

  private toDTO(record: PrismaCarterinhaEsporteRecord): CarterinhaEsporteRecord {
    return {
      id: record.id,
      name: record.name,
      identidade: record.identidade,
      modalidade: record.modalidade,
      cadastro: record.cadastro,
      nascimento: record.nascimento,
      endereco: record.endereco,
      numero: record.numero,
      bairro: record.bairro,
      cep: record.cep,
      obs: record.obs,
      exame: record.exame,
      createdAt: record.created_at,
      updatedAt: record.updated_at,
    };
  }
}

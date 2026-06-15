import { PrismaClient } from "./prisma/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../../core/env.js";
import { PDFMetadata } from "../../core/application/dto/CreatePDFRequest.dto.js";
import PDF from "../../core/domain/entity/PDF.js";
import PDFRepository from "../../core/domain/repository/PDFRepository.repository.js";

export class PDFPrismaRepository implements PDFRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: DATABASE_URL }),
    });
  }

  async savePDF(name: string, path: string, size: number) {
    const newData = await this.prisma.pdf.create({
      data: {
        name,
        path,
        size,
      },
    });
    return this.toEntity(newData);
  }

  async getPDFByUuid(id: string) {
    const response = await this.prisma.pdf.findUnique({
      where: { id, deleted_at: null },
    });

    if (!response) {
      return null;
    }

    return this.toEntity(response);
  }

  async deletePDF(id: string) {
    const response = await this.prisma.pdf.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
    return Boolean(response);
  }

  async listAllPDFs() {
    const pdf =await this.prisma.pdf.findMany({
      where: {
        deleted_at: null,
      },
    });
    return pdf.map((data: any) => this.toEntity(data));
  }

  toEntity(data: PDFMetadata) {
    const pdf = new PDF(data.id, data.name, data.path, data.size, data.created_at, data.updated_at, data.deleted_at);
    return pdf;
  }

  async closePrisma() {
    await this.prisma.$disconnect();
  }
}

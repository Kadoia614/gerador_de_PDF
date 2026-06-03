import { PrismaClient } from "./prisma/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../../core/env.js";

export class PDFRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: DATABASE_URL }),
    });
  }

  async savePDF(name: string, path: string, size: number) {
    return await this.prisma.pdf.create({
      data: {
        name,
        path,
        size,
      },
    });
  }

  async getPDFByUuid(id: string) {
    return await this.prisma.pdf.findUnique({
      where: { id },
    });
  }

  async deletePDF(id: string) {
    return await this.prisma.pdf.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  }

  async listAllPDFs() {
    return await this.prisma.pdf.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async closePrisma() {
    await this.prisma.$disconnect();
  }
}

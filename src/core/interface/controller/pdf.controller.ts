import { FastifyReply, FastifyRequest } from "fastify";
import GetByUuidUseCase from "../../application/getByUuid.use-case.js";
import CreateUseCase from "../../application/create.use-case.js";
import ListUseCase from "../../application/list.use-case.js";

import { CreatePDFRequestDTO } from "../../application/dto/CreateCarterinha.dto.js";

import { PDFPrismaRepository } from "../../../infra/database/pdf.repository.js";
import { PDFService } from "../../../infra/pdf/PDF.service.js";

export default class PDFController {
  static async createPDF(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as CreatePDFRequestDTO;

      if (!body.name || !body.entityData) {
        return reply.status(400).send({
          error: "name e entityData são obrigatórios",
        });
      }

      const useCase = new CreateUseCase(new PDFService(), new PDFPrismaRepository());
      const result = await useCase.execute(body);

      return reply.status(201).send(result);
    } catch (error) {
      console.error("Erro ao criar PDF:", error);
      return reply.status(500).send({
        error: `Erro ao criar PDF: ${error}`,
      });
    }
  }

  static async getPDFByUuid(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { uuid } = request.params as { uuid: string };

      if (!uuid) {
        return reply.status(400).send({
          error: "UUID é obrigatório",
        });
      }

      const useCase = new GetByUuidUseCase(new PDFService(), new PDFPrismaRepository());
      const result = await useCase.execute(uuid);

      return reply
        .status(200)
        .header("Content-Type", result.mimeType)
        .header("Content-Disposition", `inline; filename="${result.name}.pdf"`)
        .send(result.file);
    } catch (error) {
      console.error("Erro ao recuperar PDF:", error);
      return reply.status(404).send({
        error: `PDF não encontrado: ${error}`,
      });
    }
  }

  static async listPDFs(request: FastifyRequest, reply: FastifyReply) {
    try {
      const useCase = new ListUseCase(new PDFPrismaRepository());
      const result = await useCase.execute();
      return reply.status(200).send(result);
    } catch (error) {
      console.error("Erro ao listar PDFs:", error);
      return reply.status(500).send({
        error: `Erro ao listar PDFs: ${error}`,
      });
    }
  }
}
import { FastifyReply, FastifyRequest } from "fastify";
import CreateCarterinhaEsporteUseCase from "../../application/esporte/create-carterinha-esporte.use-case.js";
import GetCarterinhaEsporteByUuidUseCase from "../../application/esporte/get-carterinha-esporte-by-uuid.use-case.js";
import ListCarterinhasEsporteUseCase from "../../application/esporte/list-carterinhas-esporte.use-case.js";
import { CreateCarterinhaEsporteRequestDTO } from "../../application/esporte/dto/CarterinhaEsporte.dto.js";
import MontarSvgEsporte from "../../domain/service/MontarSvgEsporte.service.js";
import PrismaCarterinhaEsporteRepository from "../../../infra/database/carterinha-esporte.prisma.repository.js";

export default class CarterinhaEsporteController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as CreateCarterinhaEsporteRequestDTO;

      if (!body?.name || !body?.entityData) {
        return reply.status(400).send({
          error: "name e entityData sao obrigatorios",
        });
      }

      const useCase = new CreateCarterinhaEsporteUseCase(
        new PrismaCarterinhaEsporteRepository(),
      );
      const result = await useCase.execute(body);

      return reply.status(201).send(result);
    } catch (error) {
      request.log.error({ error }, "Erro ao criar carteirinha de esporte");
      return reply.status(500).send({
        error: `Erro ao criar carteirinha de esporte: ${error}`,
      });
    }
  }

  static async getByUuid(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { uuid } = request.params as { uuid: string };

      if (!uuid) {
        return reply.status(400).send({
          error: "UUID e obrigatorio",
        });
      }

      const useCase = new GetCarterinhaEsporteByUuidUseCase(
        new PrismaCarterinhaEsporteRepository(),
        new MontarSvgEsporte(),
      );
      const result = await useCase.execute(uuid);

      return reply
        .status(200)
        .header("Content-Type", result.mimeType)
        .header("Content-Disposition", `inline; filename="${result.name}.pdf"`)
        .send(result.file);
    } catch (error) {
      request.log.error({ error }, "Erro ao recuperar carteirinha de esporte");
      return reply.status(404).send({
        error: `Carteirinha de esporte nao encontrada: ${error}`,
      });
    }
  }

  static async list(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const useCase = new ListCarterinhasEsporteUseCase(
        new PrismaCarterinhaEsporteRepository(),
      );
      const result = await useCase.execute();

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        error: `Erro ao listar carteirinhas de esporte: ${error}`,
      });
    }
  }
}

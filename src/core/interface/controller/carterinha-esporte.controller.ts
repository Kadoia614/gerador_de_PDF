import { FastifyReply, FastifyRequest } from "fastify";
import RenderCarterinhaEsporteUseCase from "../../application/esporte/render-carterinha-esporte.use-case.js";
import { RenderCarterinhaEsporteRequestDTO } from "../../application/esporte/dto/CarterinhaEsporte.dto.js";
import MontarSvgEsporte from "../../domain/service/MontarSvgEsporte.service.js";

const serializeError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
  };
};

export default class CarterinhaEsporteController {
  static async render(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as RenderCarterinhaEsporteRequestDTO;

      if (!body?.name || !body?.entityData) {
        return reply.status(400).send({
          error: "name e entityData sao obrigatorios",
        });
      }

      const useCase = new RenderCarterinhaEsporteUseCase(new MontarSvgEsporte());
      const result = await useCase.execute(body);

      return reply
        .status(200)
        .header("Content-Type", result.mimeType)
        .header("Content-Disposition", `inline; filename="${result.fileName}.pdf"`)
        .send(result.file);
    } catch (error) {
      const serializedError = serializeError(error);

      request.log.error(
        {
          err: serializedError,
          body: {
            name: (request.body as RenderCarterinhaEsporteRequestDTO | undefined)
              ?.name,
            hasFoto: Boolean(
              (request.body as RenderCarterinhaEsporteRequestDTO | undefined)
                ?.entityData?.foto,
            ),
          },
        },
        "Erro ao renderizar carteirinha de esporte",
      );

      return reply.status(500).send({
        error: `Erro ao renderizar carteirinha de esporte: ${serializedError.message}`,
      });
    }
  }
}

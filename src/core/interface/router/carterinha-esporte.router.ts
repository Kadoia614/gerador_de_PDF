import { FastifyPluginAsync } from "fastify";
import CarterinhaEsporteController from "../controller/carterinha-esporte.controller.js";

export const CarterinhaEsporteRouter: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/render",
    schema: {
      summary: "Renderizar carteirinha de esporte",
      description:
        "Gera um PDF de carteirinha de esporte em memoria. A API nao persiste dados.",
      body: {
        type: "object",
        required: ["name", "entityData"],
        properties: {
          name: { type: "string", minLength: 1 },
          entityData: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              identidade: { type: "string" },
              modalidade: { type: "string" },
              cadastro: { type: "string" },
              nascimento: { type: "string" },
              endereco: { type: "string" },
              numero: { type: "string" },
              bairro: { type: "string" },
              cep: { type: "string" },
              obs: { type: "string" },
              exame: { type: "string" },
            },
          },
        },
      },
      response: {
        200: {
          description: "Arquivo PDF gerado",
          content: {
            "application/pdf": {
              schema: {
                type: "string",
                format: "binary",
              },
            },
          },
        },
      },
    },
    handler: CarterinhaEsporteController.render,
  });
};


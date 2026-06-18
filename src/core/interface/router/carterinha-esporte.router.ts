import { FastifyPluginAsync } from "fastify";
import CarterinhaEsporteController from "../controller/carterinha-esporte.controller.js";

export const CarterinhaEsporteRouter: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      summary: "Criar carteirinha de esporte",
      description: "Salva os dados da carteirinha de esporte. O PDF e gerado sob demanda no GET por UUID.",
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
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    handler: CarterinhaEsporteController.create,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      summary: "Listar carteirinhas de esporte",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              identidade: { type: ["string", "null"] },
              modalidade: { type: ["string", "null"] },
              cadastro: { type: ["string", "null"] },
              nascimento: { type: ["string", "null"] },
              endereco: { type: ["string", "null"] },
              numero: { type: ["string", "null"] },
              bairro: { type: ["string", "null"] },
              cep: { type: ["string", "null"] },
              obs: { type: ["string", "null"] },
              exame: { type: ["string", "null"] },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
    },
    handler: CarterinhaEsporteController.list,
  });

  fastify.route({
    method: "GET",
    url: "/:uuid",
    schema: {
      summary: "Recuperar PDF da carteirinha de esporte",
      params: {
        type: "object",
        required: ["uuid"],
        properties: {
          uuid: { type: "string" },
        },
      },
    },
    handler: CarterinhaEsporteController.getByUuid,
  });
};

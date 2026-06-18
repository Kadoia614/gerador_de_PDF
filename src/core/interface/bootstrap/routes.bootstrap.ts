import { FastifyInstance } from "fastify";
import { CarterinhaEsporteRouter } from "../router/carterinha-esporte.router.js";

export async function bootstrapRoutes(fastify: FastifyInstance) {
  await fastify.register(CarterinhaEsporteRouter, {
    prefix: "/api/v1/carterinhas/esporte",
  });
}


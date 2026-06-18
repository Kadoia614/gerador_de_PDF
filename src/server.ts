import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { PORT } from "./core/env.js";
import corsConfig from "./core/config/corsConfig.js";
import { bootstrapRoutes } from "./core/interface/bootstrap/routes.bootstrap.js";

const fastify = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
});

const port: number = Number(PORT);

fastify.register(corsConfig);

fastify.register(swagger, {
  openapi: {
    info: {
      title: "API PDF",
      description: "Documentacao da API para geracao, listagem e recuperacao de PDFs.",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1`,
      },
    ],
  },
});

fastify.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
  },
  transformSpecification: (schema) => schema,
});

const start = async () => {
  try {
    await bootstrapRoutes(fastify);
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();

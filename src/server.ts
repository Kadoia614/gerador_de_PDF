import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { PORT } from "./core/env.js";
import { PDFRouter } from "./core/interface/router/pdf.router.js";
import corsConfig from "./core/config/corsConfig.js";

const fastify = Fastify({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
})

const port: number = Number(PORT);

fastify.register(corsConfig);

fastify.register(swagger, {
  openapi: {
    info: {
      title: "API PDF",
      description: "Documentação da API para geração, listagem e recuperação de PDFs.",
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
  transformSpecification: (schema, request, reply) => schema,
});

fastify.register(PDFRouter, { prefix: "/api/v1" });

// inicialização
const start = () => {
  try {
    fastify.listen({ port, host: "0.0.0.0" });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
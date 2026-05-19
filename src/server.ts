import Fastify from "fastify";
import { PORT } from "./core/env.js";
import { PDFRouter } from "./core/interface/router/pdf.router.js";

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
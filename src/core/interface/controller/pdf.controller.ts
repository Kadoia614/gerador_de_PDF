import { FastifyReply, FastifyRequest } from "fastify";
import GetUseCase from "../../application/getModelo.use-case.js";
import CreateUseCase from "../../application/create.use-case.js";

export default class PDFController {
    static async getModel(request: FastifyRequest, reply: FastifyReply) {
        // const useCase = new GetUseCase()
        const useCase = new CreateUseCase()
        const modelo = await useCase.execute()
        reply.status(200).header("Content-Type", "image/png").send(modelo);
    }

}
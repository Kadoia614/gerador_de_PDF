import { FastifyPluginAsync } from "fastify";
import PDFController from "../controller/pdf.controller.js";

export const PDFRouter: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        method: "GET",
        url: "/pdf",
        handler: PDFController.getModel
    })


};
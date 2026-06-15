import { FastifyPluginAsync } from "fastify";
import PDFController from "../controller/pdf.controller.js";

export const PDFRouter: FastifyPluginAsync = async (fastify) => {
    fastify.route({
        method: "POST",
        url: "/pdf",
        schema: {
            summary: "Criar PDF",
            description: "Gera um PDF a partir dos dados enviados e salva metadados no banco.",
            body: {
                type: "object",
                required: ["name", "entityData"],
                properties: {
                    name: { type: "string", minLength: 1 },
                    entityData: { type: "object", additionalProperties: true },
                    modelType: { type: "string", default: "default" },
                },
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        message: { type: "string" },
                    },
                },
            },
        },
        handler: PDFController.createPDF,
    });

    fastify.route({
        method: "GET",
        url: "/pdf",
        schema: {
            summary: "Listar PDFs",
            description: "Retorna uma lista de metadados dos PDFs gerados.",
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            name: { type: "string" },
                            path: { type: "string" },
                            size: { type: "number" },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" },
                        },
                    },
                },
            },
        },
        handler: PDFController.listPDFs,
    });

    fastify.route({
        method: "GET",
        url: "/pdf/:uuid",
        schema: {
            summary: "Recuperar PDF",
            description: "Retorna o arquivo PDF gerado para o UUID especificado.",
            params: {
                type: "object",
                required: ["uuid"],
                properties: {
                    uuid: { type: "string" },
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
        handler: PDFController.getPDFByUuid,
    });
};
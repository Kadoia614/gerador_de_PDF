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
                    name: {
                        type: "string",
                        minLength: 1,
                        description: "Nome base do arquivo PDF gerado.",
                        examples: ["carteirinha-joao-silva"],
                    },
                    entityData: {
                        type: "object",
                        additionalProperties: true,
                        description:
                            "Dados usados para preencher o modelo. Para modelType esporte, os campos esperados são name, identidade, modalidade, cadastro, nascimento, endereco, numero, bairro, cep, obs e exame.",
                        properties: {
                            name: {
                                type: "string",
                                description: "Nome exibido na carteirinha. Posicao: x 30, y 53. Fallback: Nome não informado.",
                                examples: ["João Silva"],
                            },
                            identidade: {
                                type: "string",
                                description: "Documento/identidade exibido na carteirinha. Posicao: x 130, y 84. Fallback: Nome não informado.",
                                examples: ["12.345.678-9"],
                            },
                            modalidade: {
                                type: "string",
                                description: "Modalidade esportiva. Posicao: x 130, y 115. Fallback: Nome não informado.",
                                examples: ["Futebol"],
                            },
                            cadastro: {
                                type: "string",
                                description: "Data ou código de cadastro. Posicao: x 130, y 146. Fallback: N/A.",
                                examples: ["15/06/2026"],
                            },
                            nascimento: {
                                type: "string",
                                description: "Data de nascimento. Posicao: x 130, y 177. Fallback: Não informado.",
                                examples: ["31/12/2000"],
                            },
                            endereco: {
                                type: "string",
                                description: "Logradouro. Posicao: x 315, y 19. Fallback: Endereço não informado.",
                                examples: ["Rua Exemplo"],
                            },
                            numero: {
                                type: "string",
                                description: "Número do endereço. Posicao: x 315, y 53. Fallback: N/A.",
                                examples: ["123"],
                            },
                            bairro: {
                                type: "string",
                                description: "Bairro. Posicao: x 360, y 53. Fallback: Bairro não informado.",
                                examples: ["Centro"],
                            },
                            cep: {
                                type: "string",
                                description: "CEP. Posicao: x 510, y 53. Fallback: N/A.",
                                examples: ["06850-000"],
                            },
                            obs: {
                                type: "string",
                                description: "Observações. Posicao: x 315, y 84. Fallback: não possui.",
                                examples: ["Apto para atividades"],
                            },
                            exame: {
                                type: "string",
                                description: "Informação de exame médico. Posicao: x 315, y 117. Fallback: não possui.",
                                examples: ["Válido até 31/12/2026"],
                            },
                        },
                        examples: [
                            {
                                name: "João Silva",
                                identidade: "12.345.678-9",
                                modalidade: "Futebol",
                                cadastro: "15/06/2026",
                                nascimento: "31/12/2000",
                                endereco: "Rua Exemplo",
                                numero: "123",
                                bairro: "Centro",
                                cep: "06850-000",
                                obs: "Apto para atividades",
                                exame: "Válido até 31/12/2026",
                            },
                        ],
                    },
                    modelType: {
                        type: "string",
                        default: "default",
                        enum: ["default", "esporte"],
                        description: "Tipo do modelo usado para gerar o PDF. Use esporte para carteirinha esportiva.",
                    },
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

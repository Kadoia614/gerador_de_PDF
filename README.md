# API PDF

API responsável por gerar PDFs a partir de modelos e dados recebidos, salvar o arquivo no disco e registrar os metadados no banco de dados.

## Documentação

- Swagger UI: `http://localhost:3001/docs`
- Prefixo da API: `/api/v1`

## Endpoints

### POST /api/v1/pdf

Gera um PDF a partir dos dados enviados e salva os metadados no banco.

Request body:

```json
{
  "name": "nome-do-arquivo",
  "entityData": {
    "name": "Nome do usuário",
    "matricula": "12345",
    "endereco": "Rua Exemplo, 123",
    "cep": "00000-000"
  },
  "modelType": "esporte"
}
```

Response 201:

```json
{
  "id": "uuid-do-pdf",
  "name": "nome-do-arquivo",
  "message": "PDF criado com sucesso"
}
```

### GET /api/v1/pdf

Lista os metadados de todos os PDFs criados.

Response 200:

```json
[
  {
    "id": "uuid-do-pdf",
    "name": "nome-do-arquivo",
    "path": "public/modelos/esporte/carterinhas/nome-do-arquivo.pdf",
    "size": 12345,
    "createdAt": "2026-05-21T12:00:00.000Z",
    "updatedAt": "2026-05-21T12:00:00.000Z"
  }
]
```

### GET /api/v1/pdf/:uuid

Recupera o arquivo PDF gerado pelo UUID.

Response 200:

- `Content-Type: application/pdf`
- O corpo da resposta é o arquivo PDF binário.

### Swagger e validação

Os endpoints já possuem validação de entrada por schema Fastify e estão expostos na documentação Swagger disponível em `/docs`.

## Como rodar

```bash
cd c:\Projetos\Prefeitura\NodeReact\api\api_PDF
npm install
npx prisma generate
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

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
    "identidade": "12.345.678-9",
    "modalidade": "Futebol",
    "cadastro": "15/06/2026",
    "nascimento": "31/12/2000",
    "endereco": "Rua Exemplo",
    "numero": "123",
    "bairro": "Centro",
    "cep": "06850-000",
    "obs": "Apto para atividades",
    "exame": "Valido ate 31/12/2026"
  },
  "modelType": "esporte"
}
```

#### Modelo `esporte`

Quando `modelType` for `esporte`, o PDF usa os seguintes campos dentro de `entityData`:

| Campo | Posicao no modelo | Fallback |
| --- | --- | --- |
| `name` | `x: 30`, `y: 53` | `Nome nao informado` |
| `identidade` | `x: 130`, `y: 84` | `Nome nao informado` |
| `modalidade` | `x: 130`, `y: 115` | `Nome nao informado` |
| `cadastro` | `x: 130`, `y: 146` | `N/A` |
| `nascimento` | `x: 130`, `y: 177` | `Nao informado` |
| `endereco` | `x: 315`, `y: 19` | `Endereco nao informado` |
| `numero` | `x: 315`, `y: 53` | `N/A` |
| `bairro` | `x: 360`, `y: 53` | `Bairro nao informado` |
| `cep` | `x: 510`, `y: 53` | `N/A` |
| `obs` | `x: 315`, `y: 84` | `nao possui` |
| `exame` | `x: 315`, `y: 117` | `nao possui` |

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

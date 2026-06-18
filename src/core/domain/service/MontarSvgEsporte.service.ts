import { entityDataEsporteDTO } from "../../application/dto/CreateCarterinha.dto.js";

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

export default class MontarSvgEsporte {
  private CAMINHO_SVG = path.join(__dirname, "../../modelo.svg");

  async compilarCarteirinha(payload: entityDataEsporteDTO) {
    // 1. Resolve os buffers e conversões de dados da foto
    // const fotoBuffer = fs.readFileSync(fotoArquivo.path);
    // const fotoBase64 = `data:${fotoArquivo.mimetype};base64,${fotoBuffer.toString('base64')}`;

    // 2. Coleta o template estruturado do SVG e substitui dados dinâmicos
    if (!fs.existsSync(this.CAMINHO_SVG)) {
      throw new Error("Arquivo modelo.svg não encontrado na raiz do projeto.");
    }
    let conteudoSvg = fs.readFileSync(this.CAMINHO_SVG, "utf8");
    const dadosFixos = {
      name: "carteirinha-joao-silva",
      entityData: {
        name: "João Silva",
        identidade: "12.345.678-9",
        modalidade: "Futebol",
        cadastro: "1111111111",
        nascimento: "31/12/15000000",
        endereco: "Rua Exemplo",
        numero: "123",
        bairro: "Centro",
        cep: "06850-000",
        obs: "Apto para atividades",
        exame: "31/12/2021",
      },
      modelType: "esporte",
    };
    const atleta = dadosFixos.entityData;

    conteudoSvg = conteudoSvg.replaceAll("{{nome}}", atleta.name);
    conteudoSvg = conteudoSvg.replaceAll("{{name}}", atleta.name);
    conteudoSvg = conteudoSvg.replaceAll("{{identidade}}", atleta.identidade);
    conteudoSvg = conteudoSvg.replaceAll("{{modalidade}}", atleta.modalidade);
    conteudoSvg = conteudoSvg.replaceAll("{{cadastro}}", atleta.cadastro);
    conteudoSvg = conteudoSvg.replaceAll("{{nascimento}}", atleta.nascimento);
    conteudoSvg = conteudoSvg.replaceAll("{{endereco}}", atleta.endereco);
    conteudoSvg = conteudoSvg.replaceAll("{{numero}}", atleta.numero);
    conteudoSvg = conteudoSvg.replaceAll("{{bairro}}", atleta.bairro);
    conteudoSvg = conteudoSvg.replaceAll("{{cep}}", atleta.cep);
    conteudoSvg = conteudoSvg.replaceAll("{{obs}}", atleta.obs);
    conteudoSvg = conteudoSvg.replaceAll("{{exame}}", atleta.exame);

    // Insere a foto diretamente no SVG, na posição exata e com redimensionamento automático e centralizado
    // const imagemSvg = `<image x="34.425" y="133.223" width="146.824" height="193.733" preserveAspectRatio="xMidYMid slice" href="${fotoBase64}" />`;
    // conteudoSvg = conteudoSvg.replace("</svg>", `${imagemSvg}</svg>`);

    // 3. Monta a árvore HTML injetando os dados processados nos placeholders
    const caminhoTemplate = path.join(__dirname, "../views/template.html");
    let htmlFinal = fs.readFileSync(caminhoTemplate, "utf8");
    htmlFinal = htmlFinal.replace("{{SVG_CONTENT}}", conteudoSvg);

    // 4. Instancia o motor do Puppeteer com flags de estabilidade
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Carrega o CSS de impressão
    const caminhoCssDocumento = path.join(
      __dirname,
      "../views/css/documento.css",
    );
    const conteudoCssDocumento = fs.readFileSync(caminhoCssDocumento, "utf8");

    // GARANTIA DE RENDERIZAÇÃO: Injeta o HTML e o CSS
    await page.setContent(htmlFinal);
    await page.addStyleTag({ content: conteudoCssDocumento });

    // Força o Puppeteer a esperar 500ms para que o motor gráfico processe as cores do SVG e a imagem Base64
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Gera o PDF com dimensões ideais baseadas no seu modelo retangular
    const bufferPdf = await page.pdf({
      width: "900px",
      height: "320px",
      printBackground: true, // Crucial para o SVG colorido não ficar branco
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    });

    await browser.close();

    // Limpa o arquivo enviado do disco temporário
    // fs.unlinkSync(fotoArquivo.path);

    return bufferPdf;
  }
}

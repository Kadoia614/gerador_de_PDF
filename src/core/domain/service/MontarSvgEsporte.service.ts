import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import * as fs from "fs";

const LARGURA_MODELO_CARTEIRINHA = 998;
const ALTURA_MODELO_CARTEIRINHA = 344;
const LARGURA_A4 = 595.28;
const ALTURA_A4 = 841.89;
const LARGURA_CARTEIRINHA = LARGURA_A4;
const ALTURA_CARTEIRINHA =
  (LARGURA_CARTEIRINHA * ALTURA_MODELO_CARTEIRINHA) /
  LARGURA_MODELO_CARTEIRINHA;

export default class MontarSvgEsporte {
  async compilarCarteirinha(
    payload: Record<string, string | null | undefined>,
    pathModelo: string,
  ) {
    // const fotoBuffer = fs.readFileSync(fotoArquivo.path);
    // const fotoBase64 = `data:${fotoArquivo.mimetype};base64,${fotoBuffer.toString('base64')}`;

    if (!fs.existsSync(pathModelo)) {
      throw new Error("Arquivo modelo.svg não encontrado na raiz do projeto.");
    }

    let conteudoSvg = fs.readFileSync(pathModelo, "utf8");
    conteudoSvg = this.inserirFoto(conteudoSvg, payload.foto);

    for (const [key, value] of Object.entries(payload)) {
      conteudoSvg = conteudoSvg.replaceAll(`{{${key}}}`, String(value ?? ""));
    }

    const pngCarteirinha = await sharp(Buffer.from(conteudoSvg))
      .resize(LARGURA_MODELO_CARTEIRINHA, ALTURA_MODELO_CARTEIRINHA, {
        fit: "fill",
      })
      .png()
      .toBuffer();

    const documentoPdf = await PDFDocument.create();
    const pagina = documentoPdf.addPage([LARGURA_A4, ALTURA_A4]);
    const imagemCarteirinha = await documentoPdf.embedPng(pngCarteirinha);

    pagina.drawImage(imagemCarteirinha, {
      x: 0,
      y: ALTURA_A4 - ALTURA_CARTEIRINHA,
      width: LARGURA_CARTEIRINHA,
      height: ALTURA_CARTEIRINHA,
    });

    // Limpa o arquivo enviado do disco temporário
    // fs.unlinkSync(fotoArquivo.path);

    return Buffer.from(await documentoPdf.save());
  }

  private inserirFoto(conteudoSvg: string, foto?: string | null): string {
    const fotoNormalizada = String(foto || "").trim();

    if (!fotoNormalizada) {
      return conteudoSvg;
    }

    const fotoSvg = `<image x="34.425" y="133.223" width="146.824" height="193.733" preserveAspectRatio="xMidYMid slice" href="${fotoNormalizada}" />`;

    return conteudoSvg.replace("</svg>", `${fotoSvg}</svg>`);
  }
}

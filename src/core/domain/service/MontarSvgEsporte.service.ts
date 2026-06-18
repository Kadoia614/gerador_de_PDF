import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import * as fs from "fs";

const LARGURA_CARTEIRINHA = 998;
const ALTURA_CARTEIRINHA = 344;

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

    for (const [key, value] of Object.entries(payload)) {
      conteudoSvg = conteudoSvg.replaceAll(`{{${key}}}`, String(value ?? ""));
    }

    const pngCarteirinha = await sharp(Buffer.from(conteudoSvg))
      .resize(LARGURA_CARTEIRINHA, ALTURA_CARTEIRINHA, { fit: "fill" })
      .png()
      .toBuffer();

    const documentoPdf = await PDFDocument.create();
    const pagina = documentoPdf.addPage([
      LARGURA_CARTEIRINHA,
      ALTURA_CARTEIRINHA,
    ]);
    const imagemCarteirinha = await documentoPdf.embedPng(pngCarteirinha);

    pagina.drawImage(imagemCarteirinha, {
      x: 0,
      y: 0,
      width: LARGURA_CARTEIRINHA,
      height: ALTURA_CARTEIRINHA,
    });

    // Limpa o arquivo enviado do disco temporário
    // fs.unlinkSync(fotoArquivo.path);

    return Buffer.from(await documentoPdf.save());
  }
}

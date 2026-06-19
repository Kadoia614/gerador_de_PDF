import path from "path";
import {
  RenderCarterinhaEsporteRequestDTO,
  RenderCarterinhaEsporteResponseDTO,
} from "./dto/CarterinhaEsporte.dto.js";
import MontarSvgEsporte from "../../domain/service/MontarSvgEsporte.service.js";

const MODELO_ESPORTE_PATH = path.resolve("public/modelos/esporte/modeloEsporte.svg");

export default class RenderCarterinhaEsporteUseCase {
  constructor(private readonly montarSvgEsporte: MontarSvgEsporte) {}

  async execute(
    request: RenderCarterinhaEsporteRequestDTO,
  ): Promise<RenderCarterinhaEsporteResponseDTO> {
    const file = await this.montarSvgEsporte.compilarCarteirinha(
      {
        ...request.entityData,
        name: request.entityData.name || request.name,
      },
      MODELO_ESPORTE_PATH,
    );

    return {
      file,
      fileName: this.sanitizeFileName(request.name),
      mimeType: "application/pdf",
    };
  }

  private sanitizeFileName(fileName: string): string {
    return fileName.replace(/[<>:"/\\|?*]+/g, "-");
  }
}


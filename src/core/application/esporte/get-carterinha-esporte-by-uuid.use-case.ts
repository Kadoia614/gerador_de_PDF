import path from "path";
import { GetCarterinhaEsporteFileDTO } from "./dto/CarterinhaEsporte.dto.js";
import CarterinhaEsporteRepository from "../../domain/repository/CarterinhaEsporte.repository.js";
import MontarSvgEsporte from "../../domain/service/MontarSvgEsporte.service.js";

const MODELO_ESPORTE_PATH = path.resolve("public/modelos/esporte/modeloEsporte.svg");

export default class GetCarterinhaEsporteByUuidUseCase {
  constructor(
    private readonly carterinhaEsporteRepository: CarterinhaEsporteRepository,
    private readonly montarSvgEsporte: MontarSvgEsporte,
  ) {}

  async execute(uuid: string): Promise<GetCarterinhaEsporteFileDTO> {
    const carterinha = await this.carterinhaEsporteRepository.findById(uuid);

    if (!carterinha) {
      throw new Error(`Carteirinha com UUID ${uuid} nao encontrada`);
    }

    const file = await this.montarSvgEsporte.compilarCarteirinha(
      {
        name: carterinha.name,
        identidade: carterinha.identidade,
        modalidade: carterinha.modalidade,
        cadastro: carterinha.cadastro,
        nascimento: carterinha.nascimento,
        endereco: carterinha.endereco,
        numero: carterinha.numero,
        bairro: carterinha.bairro,
        cep: carterinha.cep,
        obs: carterinha.obs,
        exame: carterinha.exame,
      },
      MODELO_ESPORTE_PATH,
    );

    return {
      id: carterinha.id,
      name: carterinha.name,
      file,
      mimeType: "application/pdf",
    };
  }
}

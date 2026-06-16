import path from "path";

export default class CarterinhaPolicy {
  private name: string;
  private modelType: string;

  constructor(name: string, modelType: string) {
    let normalizeName = name.replace(/[<>:"/\\|?*]+/g, "-");
    this.name = `${normalizeName}-${modelType}-${Date.now()}`;
    this.modelType = modelType;
  }

  getName(): string {
    return this.name;
  }

  getModelAndPath(): {
    PDF_PATH: string;
    MODELO_PATH: string;
    FULL_PATH: string;
  } {
    let PDF_PATH: string;
    let MODELO_PATH: string;

    switch (this.modelType.toLowerCase()) {
      case "esporte":
        PDF_PATH = path.resolve("public/modelos/esporte/carterinhas");
        MODELO_PATH = path.resolve("public/modelos/esporte/modeloEsporte.png");
        break;
      default:
        console.log("default");
        throw new Error("Modelo de PDF desconhecido");
    }
    return {
      PDF_PATH: PDF_PATH,
      MODELO_PATH: MODELO_PATH,
      FULL_PATH: `${PDF_PATH}/${this.name}.pdf`,
    };
  }
}

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
    MODELO_PATH: string;
  } {
    let MODELO_PATH: string;

    switch (this.modelType.toLowerCase()) {
      case "esporte":
        MODELO_PATH = path.resolve("public/modelos/esporte/modeloEsporte.svg");
        break;
      default:
        console.log("default");
        throw new Error("Modelo de PDF desconhecido");
    }
    return {
      MODELO_PATH: MODELO_PATH,
    };
  }
}

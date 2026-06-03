// Mapeamento de dados da entidade para posições no PDF
export class DataMapper {
  static mapEsporteData(data: Record<string, any>) {
    // Mapeamento de dados de esporte para o modelo de carteirinha
    return [
      { data: data.name || "Nome não informado", x: 30, y: 53 },
      { data: data.matricula || "", x: 315, y: 53 },
      { data: data.endereco || "Endereço não informado", x: 360, y: 53 },
      { data: data.cep || "", x: 510, y: 53 },
    ];
  }

  static mapByModelType(modelType: string, data: Record<string, any>) {
    switch (modelType.toLowerCase()) {
      case "esporte":
        return this.mapEsporteData(data);
      default:
        return this.mapEsporteData(data);
    }
  }
}

// Mapeamento de dados da entidade para posições no PDF
export class DataMapper {
  static mapEsporteData(data: Record<string, any>) {
    // Mapeamento de dados de esporte para o modelo de carteirinha
    return [
      { data: data.name || "Nome não informado", x: 30, y: 53 },
      { data: data.identidade || "Nome não informado", x: 130, y: 84 },
      { data: data.modalidade || "Nome não informado", x: 130, y: 115 },
      { data: data.cadastro || "N/A", x: 130, y: 146 },
      { data: data.nascimento || "Não informado", x: 130, y: 177 },

      { data: data.endereco || "Endereço não informado", x: 315, y: 19 },
      { data: data.numero || "N/A", x: 315, y: 53 },
      { data: data.bairro || "Bairro não informado", x: 360, y: 53 },
      { data: data.cep || "N/A", x: 510, y: 53 },

      { data: data.obs || "não possui", x: 315, y: 84 },
      { data: data.exame || "não possui", x: 315, y: 117 },
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

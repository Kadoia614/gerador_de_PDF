export class SvgEsporteData {
  uuid: string;
  archive_uuid: string;
  name: string;
  identidade: string;
  modalidade: string;
  cadastro: string;
  nascimento: string;
  endereco: string;
  numero: string;
  bairro: string;
  cep: string;
  obs: string;
  exame: string;
  createAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  modelType: string;

  constructor(
    uuid: string,
    archive_uuid: string,
    name: string,
    identidade: string,
    modalidade: string,
    cadastro: string,
    nascimento: string,
    endereco: string,
    numero: string,
    bairro: string,
    cep: string,
    obs: string,
    exame: string,
    createAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    this.uuid = uuid;
    this.archive_uuid = archive_uuid;
    this.name = name;
    this.identidade = identidade;
    this.modalidade = modalidade;
    this.cadastro = cadastro;
    this.nascimento = nascimento;
    this.endereco = endereco;
    this.numero = numero;
    this.bairro = bairro;
    this.cep = cep;
    this.obs = obs;
    this.exame = exame;

    this.createAt = createAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;

    this.modelType = "esporte";
  }
}

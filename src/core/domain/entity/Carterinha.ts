export default class Carterinha {
  id: string;
  name: string;
  modelType: string;
  create_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(
    id: string,
    name: string,
    modelType: string,
    create_at: Date,
    updated_at: Date,
    deleted_at: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.modelType = modelType;
    this.create_at = create_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

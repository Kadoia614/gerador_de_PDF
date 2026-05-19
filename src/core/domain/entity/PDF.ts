export default class PDF {
  id: number;
  name: string;
  size: number;
  path: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor(data: PDF) {
    this.id = data.id;
    this.name = data.name;
    this.size = data.size;
    this.path = data.path;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at;
  }
}

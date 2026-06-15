export default class PDF {
  id: string;
  name: string;
  path: string;
  size: number;
  create_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(
    id: string,
    name: string,
    path: string,
    size: number,
    create_at: Date,
    updated_at: Date,
    deleted_at: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.size = size;
    this.create_at = create_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

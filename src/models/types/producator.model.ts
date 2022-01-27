export interface ProducatorAttributes {
  id: number;
  nume: string;
  logo: string;
  deleted: number;
}

export class Producator implements ProducatorAttributes {
  declare id: number;
  declare nume: string;
  declare logo: string;
  declare deleted: number;

  constructor({ id = 0, nume = "", logo = "", deleted = 0 }) {
    this.id = id;
    this.nume = nume;
    this.logo = logo;
    this.deleted = deleted;
  }
}

export interface ProdusAttributes {
  id: number;
  cod: string;
  nume: string;
  pret: number;
  descriere: string;
  imagine: string;
  idProducator: number;
  stoc: number;
  deleted: number;
}

export class Produs implements ProdusAttributes {
  declare id: number;
  declare cod: string;
  declare nume: string;
  declare pret: number;
  declare descriere: string;
  declare imagine: string;
  declare idProducator: number;
  declare stoc: number;
  declare deleted: number;

  constructor({
    id = 0,
    cod = "",
    nume = "",
    pret = 0,
    descriere = "",
    imagine = "",
    idProducator = 0,
    stoc = 0,
    deleted = 0,
  }) {
    this.id = id;
    this.cod = cod;
    this.nume = nume;
    this.pret = pret;
    this.descriere = descriere;
    this.imagine = imagine;
    this.idProducator = idProducator;
    this.stoc = stoc;
    this.deleted = deleted;
  }
}

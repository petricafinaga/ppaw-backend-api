export interface CosAttributes {
  idProdus: number;
  cantitate: number;
}

export class Cos implements CosAttributes {
  declare idProdus: number;
  declare cantitate: number;

  constructor({ idProdus = 0, cantitate = 0 }) {
    this.idProdus = idProdus;
    this.cantitate = cantitate;
  }
}

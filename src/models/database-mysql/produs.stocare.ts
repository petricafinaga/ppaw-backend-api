import { Connection } from "mysql2";
import { IStocareModel } from "../interfaces/IStocareModel";
import { Produs } from "../types/produs.model";

export class StocareProdus implements IStocareModel<Produs> {
  constructor(private _con: Connection) {}

  async get(id: number): Promise<Produs> {
    const query = `SELECT * FROM produse WHERE id = ${id}`;

    return new Promise<Produs>((resolve, reject) => {
      this._con.execute(query, (err, result: any) => {
        resolve(new Produs({ ...result[0] }));
      });
    });
  }

  async getAll(): Promise<Produs[]> {
    const query = "SELECT * from produse";

    return new Promise<Produs[]>((resolve, reject) => {
      this._con.execute(query, (err, result: any[]) => {
        const produse: Produs[] = [];
        result.forEach((produs) => {
          produse.push(new Produs({ ...produs }));
        });

        resolve(produse);
      });
    });
  }

  async add(produs: Produs): Promise<boolean> {
    const query = `INSERT INTO produse (nume, pret, cod, descriere, imagine, idProducator) VALUES('${
      produs.nume
    }', ${produs.pret}, '${produs.cod}', '${produs.descriere.trim()}', '${
      produs.imagine
    }', ${produs.idProducator})`;
    console.log(query);

    return new Promise<boolean>((resolve, reject) => {
      this._con.execute(query, (err, result: any) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async update(produs: Produs): Promise<boolean> {
    const query = `UPDATE produse SET nume = '${produs.nume}', pret = ${produs.pret}, descriere = '${produs.descriere}', imagine = '${produs.imagine}', idProducator = ${produs.idProducator} WHERE id = ${produs.id}`;

    return new Promise<boolean>((resolve) => {
      this._con.execute(query, (err, result: any) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async delete(id: number): Promise<boolean> {
    return false;
  }
}

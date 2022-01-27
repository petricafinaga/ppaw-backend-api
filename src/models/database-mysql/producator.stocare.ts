import { Connection } from "mysql2";
import { IStocareModel } from "../interfaces/IStocareModel";

import { Producator } from "../types/producator.model";

export class StocareProducator implements IStocareModel<Producator> {
  constructor(private _con: Connection) {}

  async get(id: number): Promise<Producator> {
    const query = `SELECT * FROM producatori WHERE id = ${id}`;

    return new Promise<Producator>((resolve, reject) => {
      this._con.execute(query, (err, result: any) => {
        resolve(new Producator({ ...result[0] }));
      });
    });
  }

  async getAll(): Promise<Producator[]> {
    const query = "SELECT * from producatori";

    return new Promise<Producator[]>((resolve, reject) => {
      this._con.execute(query, (err, result: any[]) => {
        const producatori: Producator[] = [];
        result.forEach((producator) => {
          producatori.push(new Producator({ ...producator }));
        });

        resolve(producatori);
      });
    });
  }

  async add(producator: Producator): Promise<boolean> {
    const query = `INSERT INTO producatori (nume, logo) VALUES('${producator.nume}', '${producator.logo}')`;

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

  async update(producator: Producator): Promise<boolean> {
    const query = `UPDATE producatori SET nume = '${producator.nume}', logo = '${producator.logo}' WHERE id = ${producator.id}`;

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

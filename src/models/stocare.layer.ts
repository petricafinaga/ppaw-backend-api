import mysql, { Connection } from "mysql2";
import { Sequelize } from "sequelize";

import { IStocareModel } from "./interfaces/IStocareModel";
import { DATABASES, DB_SETTINGS, SQL_SETTINGS } from "../constants/constants";

// MySQL Models
import { StocareProdus as StocareProdusMySQL } from "./database-mysql/produs.stocare";
import { StocareProducator as StocareProducatorMySQL } from "./database-mysql/producator.stocare";

// ORM Models
import { StocareCos as StocareCosOrm } from "./database-orm/cos.stocare";
import { StocareProdus as StocareProdusOrm } from "./database-orm/produs.stocare";
import { StocareProducator as StocareProducatorMyOrm } from "./database-orm/producator.stocare";

const classes: any = {
  mysql: { Produs: StocareProdusMySQL, Producator: StocareProducatorMySQL },
  orm: { Produs: StocareProdusOrm, Producator: StocareProducatorMyOrm, Cos: StocareCosOrm },
};

export class StocareLayer<T> implements IStocareModel<T> {
  private static initConnection = () => {
    let connection: Connection | Sequelize;

    switch (DB_SETTINGS.database) {
      case DATABASES.ORM:
        const { host, port, user, password, database } = SQL_SETTINGS;
        connection = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);
        break;

      case DATABASES.MySQL:
        connection = mysql.createConnection(SQL_SETTINGS);
        connection.connect((err) => {
          if (err) console.log("Cannot connect to MySQL database", err);
          else {
            console.log("Connected to MySQL");
          }
        });
        break;

      default:
        connection = {} as Connection;
    }

    return connection;
  };

  private static _connection: Connection | Sequelize = StocareLayer.initConnection();
  private _model: IStocareModel<T>;

  constructor(type: string) {
    this._model = new classes[DB_SETTINGS.database][type](
      StocareLayer._connection
    );
  }

  async getAll(): Promise<T[]> {
    return this._model.getAll();
  }

  async get(value: number): Promise<T | null> {
    return this._model.get(value);
  }

  async add(value: T): Promise<boolean> {
    return this._model.add(value);
  }

  async update(value: T): Promise<boolean> {
    return this._model.update(value);
  }

  async delete(value: number): Promise<boolean> {
    return this._model.delete(value);
  }
}

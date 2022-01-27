import { Sequelize, Model, DataTypes } from "sequelize";
import { IStocareModel } from "../interfaces/IStocareModel";
import { CosAttributes } from "../types/cos.model";
import { ProdusService } from "../../services/produs.service";

export class Cos extends Model<CosAttributes> implements CosAttributes {
  declare idProdus: number;
  declare cantitate: number;
}

export class StocareCos implements IStocareModel<Cos> {
  private _produsService: ProdusService = new ProdusService();

  constructor(private sequelize: Sequelize) {
    Cos.init(
      {
        idProdus: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        cantitate: {
          type: new DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: this.sequelize,
        timestamps: false,
        tableName: "cos",
      }
    );
  }

  async get(): Promise<Cos | null> {
    return null;
  }

  async getAll(): Promise<Cos[]> {
    return await Cos.findAll();
  }

  async add(cos: Cos): Promise<boolean> {
    const produs = await Cos.findOne({ where: { idProdus: cos.idProdus } });

    await this._produsService.updateStock(cos.idProdus, true);
    if (produs) {
      produs.cantitate++;
      return Boolean(produs.save());
    } else {
      return Boolean(Cos.create({ idProdus: cos.idProdus, cantitate: 1, }));
    }
  }

  async update(cos: Cos): Promise<boolean> {
    return false;
  }

  async delete(id: number): Promise<boolean> {
    const produs = await Cos.findOne({ where: { idProdus: id } });

    if (produs) {
      await this._produsService.updateStock(id, false);
      produs.cantitate--;
      return Boolean(produs.cantitate === 0 ? produs.destroy() : produs.save());
    }
    return false;
  }
}

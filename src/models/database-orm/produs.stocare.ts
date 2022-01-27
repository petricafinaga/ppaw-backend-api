import { Sequelize, Optional, Model, DataTypes, Op } from "sequelize";
import { IStocareModel } from "../interfaces/IStocareModel";
import { ProdusAttributes } from "../types/produs.model";

interface ProdusOptionalAttributes extends Optional<ProdusAttributes, 'id'> { }

export class Produs extends Model<ProdusAttributes, ProdusOptionalAttributes> implements ProdusAttributes {
  declare id: number;
  declare cod: string;
  declare nume: string;
  declare pret: number;
  declare descriere: string;
  declare imagine: string;
  declare idProducator: number;
  declare stoc: number;
  declare deleted: number;
}

export class StocareProdus implements IStocareModel<Produs> {
  constructor(private sequelize: Sequelize) {
    Produs.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cod: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        nume: {
          type: new DataTypes.STRING(100),
          allowNull: false,
        },
        pret: {
          type: new DataTypes.DOUBLE,
          allowNull: true,
        },
        descriere: {
          type: new DataTypes.STRING(200),
          allowNull: false,
        },
        imagine: {
          type: new DataTypes.TEXT,
          allowNull: true,
        },
        idProducator: {
          type: new DataTypes.NUMBER,
          allowNull: false,
        },
        stoc: {
          type: new DataTypes.NUMBER,
          allowNull: false,
        },
        deleted: {
          type: new DataTypes.TINYINT,
          allowNull: false,
        }
      },
      {
        sequelize: this.sequelize,
        timestamps: false,
        tableName: "produse",
      }
    );
  }

  async get(id: number): Promise<Produs | null> {
    return await Produs.findByPk(id, { attributes: { exclude: ['deleted'] } });
  }

  async getAll(): Promise<Produs[]> {
    return await Produs.findAll({ where: { deleted: { [Op.ne]: 1 } }, attributes: { exclude: ['deleted'] } });
  }

  async add(produs: Produs): Promise<boolean> {
    return Boolean(await Produs.create(produs));
  }

  async update(produs: Produs): Promise<boolean> {
    return Boolean(await Produs.update(produs, { where: { id: produs.id } }));
  }

  async delete(id: number): Promise<boolean> {
    const produs = await Produs.findByPk(id);

    if (produs)
      return Boolean(produs.update({ deleted: 1 }));

    return false;
  }
}

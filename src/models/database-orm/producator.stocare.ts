import { Sequelize, Optional, Model, DataTypes, Op } from "sequelize";
import { IStocareModel } from "../interfaces/IStocareModel";
import { ProducatorAttributes } from "../types/producator.model";

interface ProducatorOptionalAttributes extends Optional<ProducatorAttributes, 'id'> { }

export class Producator extends Model<ProducatorAttributes, ProducatorOptionalAttributes> implements ProducatorAttributes {
  declare id: number;
  declare nume: string;
  declare logo: string;
  declare deleted: number;
}

export class StocareProducator implements IStocareModel<Producator> {
  constructor(private sequelize: Sequelize) {
    Producator.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nume: {
          type: new DataTypes.STRING(100),
          allowNull: false,
        },
        logo: {
          type: new DataTypes.STRING(200),
          allowNull: false,
        },
        deleted: {
          type: new DataTypes.TINYINT,
          allowNull: false,
        },
      },
      {
        sequelize: this.sequelize,
        timestamps: false,
        tableName: "producatori",
      }
    );
  }

  async get(id: number): Promise<Producator | null> {
    return await Producator.findByPk(id, { attributes: { exclude: ['deleted'] } });
  }

  async getAll(): Promise<Producator[]> {
    return await Producator.findAll({ where: { deleted: { [Op.ne]: 1 } }, attributes: { exclude: ['deleted'] } });
  }

  async add(producator: Producator): Promise<boolean> {
    return Boolean(await Producator.create(producator));
  }

  async update(producator: Producator): Promise<boolean> {
    return Boolean(await Producator.update(producator, { where: { id: producator.id } }));
  }

  async delete(id: number): Promise<boolean> {
    const producator = await Producator.findByPk(id);

    if (producator)
      return Boolean(producator.update({ deleted: 1 }));

    return false;
  }
}

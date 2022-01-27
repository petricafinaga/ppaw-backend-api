import { Request, Response } from "express";
import { StocareLayer } from "../models/stocare.layer";
import { Cos } from "../models/types/cos.model";
import { Produs } from "../models/types/produs.model";
import { ProdusService } from "./produs.service";

export class CosService {
  private _stocareLayer: StocareLayer<Cos> = new StocareLayer("Cos");
  private _produsService: ProdusService = new ProdusService();

  getItems = async (req: Request, res: Response) => {
    const items = await this._stocareLayer.getAll();
    const completeItems: any[] = [];

    await Promise.all(items.map(async (item) => {
      const produs = await this._produsService.getProdus(item.idProdus) as any;

      completeItems.push({ ...new Produs({ ...produs.dataValues }), cantitate: item.cantitate });
    }));

    res.send(completeItems);
  };

  addItem = async (req: Request, res: Response) => {
    try {
      const success = await this._stocareLayer.add(new Cos({ ...req.body }));

      if (success) {
        res.send({});
      } else {
        res.sendStatus(500);
      }
    } catch (err: any) {
      res.sendStatus(err.message);
    }
  };

  deleteItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.query.id;
      const success = await this._stocareLayer.delete(Number(itemId));

      if (success) {
        res.send({});
      } else {
        res.sendStatus(500);
      }
    } catch (err: any) {
      res.sendStatus(err.message);
    }
  }
}

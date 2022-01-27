import { Request, Response } from "express";
import { StocareLayer } from "../models/stocare.layer";
import { Produs } from "../models/types/produs.model";

export class ProdusService {
  private _stocareLayer: StocareLayer<Produs> = new StocareLayer("Produs");

  getProdus = async (id: number) => {
    return await this._stocareLayer.get(id);
  };

  getProduse = async (req: Request, res: Response) => {
    const productId = req.query.id;

    if (productId) {
      const produs = await this._stocareLayer.get(Number(productId));
      res.send(produs);
    } else {
      const produse = await this._stocareLayer.getAll();
      res.send(produse);
    }
  };

  updateProduse = async (req: Request, res: Response) => {
    try {
      const success = await this._stocareLayer.update(
        new Produs({ ...req.body })
      );

      if (success) {
        res.send({});
      } else {
        res.sendStatus(500);
      }
    } catch (err: any) {
      res.sendStatus(err.message);
    }
  };

  saveProduse = async (req: Request, res: Response) => {
    try {
      const success = await this._stocareLayer.add(new Produs({ ...req.body }));

      if (success) {
        res.send({});
      } else {
        res.sendStatus(500);
      }
    } catch (err: any) {
      res.sendStatus(err.message);
    }
  };

  deleteProduse = async (req: Request, res: Response) => {
    try {
      const productId = req.query.id;

      const success = await this._stocareLayer.delete(Number(productId));

      if (success) {
        res.send({});
      } else {
        res.sendStatus(500);
      }
    } catch (err: any) {
      res.sendStatus(err.message);
    }
  }

  updateStock = async (id: number, decrement: boolean = true) => {
    try {
      const produs = await this._stocareLayer.get(id) as any;

      if (produs) {
        produs.stoc += decrement ? -1 : 1;
        const success = await this._stocareLayer.update(new Produs({ ...produs.dataValues }));

        return success;
      }

      return false;
    } catch (err: any) {
      return false;
    }
  }
}

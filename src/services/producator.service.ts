import { Request, Response } from "express";
import { StocareLayer } from "../models/stocare.layer";
import { Producator } from "../models/types/producator.model";

export class ProducatorService {
  private _stocareLayer: StocareLayer<Producator> = new StocareLayer(
    "Producator"
  );

  getProducatori = async (req: Request, res: Response) => {
    const producatorId = req.query.id;

    if (producatorId) {
      const producator = await this._stocareLayer.get(Number(producatorId));
      res.send(producator);
    } else {
      const producatori = await this._stocareLayer.getAll();
      res.send(producatori);
    }
  };

  updateProducatori = async (req: Request, res: Response) => {
    try {
      const success = await this._stocareLayer.update(
        new Producator({ ...req.body })
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

  saveProducatori = async (req: Request, res: Response) => {
    try {
      const success = await this._stocareLayer.add(
        new Producator({ ...req.body })
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

  deleteProducatori = async (req: Request, res: Response) => {
    try {
      const producerId = req.query.id;
      const success = await this._stocareLayer.delete(Number(producerId));

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

import { Request, Response } from "express";
import { ProdusService  } from "../services/produs.service";

export class ProdusController {
  private _produsService: ProdusService = new ProdusService();

  getProduse = async (req: Request, res: Response) => {
    this._produsService.getProduse(req, res);
  };

  updateProduse = async (req: Request, res: Response) => {
    this._produsService.updateProduse(req, res);
  };

  saveProduse = async (req: Request, res: Response) => {
    this._produsService.saveProduse(req, res);
  };

  deleteProduse = async (req: Request, res: Response) => {
    this._produsService.deleteProduse(req, res);
  };
}

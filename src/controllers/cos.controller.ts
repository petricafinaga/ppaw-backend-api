import { Request, Response } from "express";
import { CosService } from "../services/cos.service";

export class CosController {
  private _cosService: CosService = new CosService();

  getItems = async (req: Request, res: Response) => {
    this._cosService.getItems(req, res);
  };

  addItem = async (req: Request, res: Response) => {
    this._cosService.addItem(req, res);
  };

  deleteItem = async (req: Request, res: Response) => {
    this._cosService.deleteItem(req, res);
  };
}

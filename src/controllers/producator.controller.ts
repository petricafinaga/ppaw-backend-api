import { Request, Response } from "express";
import { ProducatorService } from "../services/producator.service";

export class ProducatorController {
  private _producatorService: ProducatorService = new ProducatorService();

  getProducatori = async (req: Request, res: Response) => {
    this._producatorService.getProducatori(req, res);
  };

  updateProducatori = async (req: Request, res: Response) => {
    this._producatorService.updateProducatori(req, res);
  };

  saveProducatori = async (req: Request, res: Response) => {
    this._producatorService.saveProducatori(req, res);
  };

  deleteProducatori = async (req: Request, res: Response) => {
    this._producatorService.deleteProducatori(req, res);
  };
}

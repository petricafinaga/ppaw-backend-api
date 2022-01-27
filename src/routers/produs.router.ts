import express, { Router } from "express";
import { ProdusController } from "../controllers/produs.controller";

export class ProdusRouter {
  private _router: Router;
  private _produsController = new ProdusController();

  constructor() {
    this._router = express.Router();

    this.defineRoutes();
  }

  defineRoutes() {
    this.router.get("/produse", this._produsController.getProduse);
    this.router.post("/produse", this._produsController.saveProduse);
    this.router.put("/produse", this._produsController.updateProduse);
    this.router.delete("/produse", this._produsController.deleteProduse);
  }

  get router(): Router {
    return this._router;
  }
}

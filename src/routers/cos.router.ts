import express, { Router } from "express";
import { CosController } from "../controllers/cos.controller";

export class CosRouter {
  private _router: Router;
  private _cosController = new CosController();

  constructor() {
    this._router = express.Router();

    this.defineRoutes();
  }

  defineRoutes() {
    this.router.get("/cos", this._cosController.getItems);
    this.router.post("/cos", this._cosController.addItem);
    this.router.delete("/cos", this._cosController.deleteItem);
  }

  get router(): Router {
    return this._router;
  }
}

import express, { Router } from "express";
import { ProducatorController } from "../controllers/producator.controller";

export class ProducatorRouter {
  private _router: Router;
  private _producatorController = new ProducatorController();

  constructor() {
    this._router = express.Router();

    this.defineRoutes();
  }

  defineRoutes() {
    this.router.get("/producatori", this._producatorController.getProducatori);
    this.router.post("/producatori", this._producatorController.saveProducatori);
    this.router.put(
      "/producatori",
      this._producatorController.updateProducatori
    );
    this.router.delete("/producatori", this._producatorController.deleteProducatori);
  }

  get router(): Router {
    return this._router;
  }
}

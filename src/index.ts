import express from "express";

import { SERVER_PORT } from "./constants/constants";
import { CosRouter } from "./routers/cos.router";
import { ProdusRouter } from "./routers/produs.router";
import { ProducatorRouter } from "./routers/producator.router";

const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(new CosRouter().router);
app.use(new ProdusRouter().router);
app.use(new ProducatorRouter().router);

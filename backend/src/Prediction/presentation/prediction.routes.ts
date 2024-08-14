import { Router, Express } from "express";
import PredictionController from "./prediction.controller.js";

export default class PredictionRoutes {
  constructor(
    public predictionController: PredictionController,
    server: Express
  ) {
    const predictionRouter = Router();
    server.use("/api/predictions", predictionRouter);

    predictionRouter.get("/:matchId", predictionController.getValuesByMatch);
    predictionRouter.post("/", predictionController.insertOne);
  }
}

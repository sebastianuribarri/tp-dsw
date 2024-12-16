import { Router, Express } from "express";
import PredictionController from "./prediction.controller.js";

export default class PredictionRoutes {
  constructor(
    private readonly predictionController: PredictionController,
    server: Express
  ) {
    const predictionRouter = Router();
    server.use("/api/predictions", predictionRouter);

    predictionRouter.get("/:matchId", predictionController.getValuesByMatch);
    predictionRouter.post(
      "/",
      (req, res, next) => {
        console.log("Router level - req.body:", req.body);
        next();
      },
      predictionController.insertOne
    );
    predictionRouter.get(
      "/:matchId/:userId",
      predictionController.getPredictionByIds
    );
  }
}

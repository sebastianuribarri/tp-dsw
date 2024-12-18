import { Router, Express } from "express";
import PredictionController from "./prediction.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";

export default class PredictionRoutes {
  constructor(
    private readonly predictionController: PredictionController,
    server: Express
  ) {
    const predictionRouter = Router();
    server.use("/api/predictions", predictionRouter);
    predictionRouter.use((req, res, next) => {
      authenticateUser(req, res, next, { premium: true });
    });
    predictionRouter.get("/:matchId", predictionController.getValuesByMatch);
    predictionRouter.post("/", predictionController.insertOne);
    predictionRouter.get(
      "/:matchId/:userId",
      predictionController.getPredictionByIds
    );
  }
}

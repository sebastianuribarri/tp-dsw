import PredictionUseCases from "./application/prediction.use_cases.js";
import { IPredictionRepository } from "./domain/prediction.repository.js";
import PredictionMongoRepository from "./infrastructure/prediction.repository.mongo.js";
import PredictionController from "./presentation/prediction.controller.js";
import PredictionRoutes from "./presentation/prediction.routes.js";
import { Express } from "express";

export default class PredictionApp {
  predictionDbRepository: IPredictionRepository;
  predictionUseCases: PredictionUseCases;
  predictionController: PredictionController;
  predictionRoutes: PredictionRoutes;

  constructor(server: Express) {
    // ----------------- infrastructure layer -------------------
    this.predictionDbRepository = new PredictionMongoRepository();

    // ----------------- application layer -----------------
    this.predictionUseCases = new PredictionUseCases(
      this.predictionDbRepository
    );

    // ----------------- presentation layer -----------------
    this.predictionController = new PredictionController(
      this.predictionUseCases
    );
    this.predictionRoutes = new PredictionRoutes(
      this.predictionController,
      server
    );
  }
}

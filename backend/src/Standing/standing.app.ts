import StandingUseCases from "./application/standing.use_cases.js";
import {
  IStandingApiRepository,
  IStandingRepository,
} from "./domain/standing.repository.js";
import StandingsApiRepository from "./infrastructure/standing.repository.api.js";
import StandingMongoRepository from "./infrastructure/standing.repository.mongo.js";
import StandingController from "./presentation/standing.controller.js";
import StandingRoutes from "./presentation/standing.routes.js";
import { Express } from "express";

export default class StandingsApp {
  standingApiRepository: IStandingApiRepository;
  standingDbRepository: IStandingRepository;
  standingUseCases: StandingUseCases;
  standingController: StandingController;
  standingRoutes: StandingRoutes;

  constructor(server: Express) {
    // ----------------- infrastructure layout -------------------
    this.standingApiRepository = new StandingsApiRepository();
    this.standingDbRepository = new StandingMongoRepository();

    // ----------------- application layout -----------------
    this.standingUseCases = new StandingUseCases(
      this.standingApiRepository,
      this.standingDbRepository
    );

    // ----------------- presentation layout -----------------
    this.standingController = new StandingController(this.standingUseCases);
    this.standingRoutes = new StandingRoutes(this.standingController, server);
  }
}

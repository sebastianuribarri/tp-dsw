import StandingUseCases from "./application/standing.use_cases.js";
import {
  IStandingApiRepository,
  IStandingRepository,
} from "./domain/standing.repository.js";
import StandingsApiRepository from "./infrastructure/standing.repository.api.js";
import StandingMongoRepository from "./infrastructure/standing.repository.mongo.js";
import StandingController from "./presentation/standing.controller.js";
import StandingsRoutes from "./presentation/standing.routes.js";
import { Express } from "express";

export default class StandingsApp {
  standingsApiRepository: IStandingApiRepository;
  standingsDbRepository: IStandingRepository;
  standingsUseCases: StandingUseCases;
  standingsController: StandingController;
  standingsRoutes: StandingsRoutes;

  constructor(server: Express) {
    // ----------------- infrastructure layout -------------------
    this.standingsApiRepository = new StandingsApiRepository();
    this.standingsDbRepository = new StandingMongoRepository();

    // ----------------- application layout -----------------
    this.standingsUseCases = new StandingUseCases(
      this.standingsApiRepository,
      this.standingsDbRepository
    );

    // ----------------- presentation layout -----------------
    this.standingsController = new StandingController(
      this.standingsUseCases
    );
    this.standingsRoutes = new StandingsRoutes(
      this.standingsController,
      server
    );
  }
}

import StandingUseCases from "./application/standing.use_cases.js";

import IStandingRepository from "./domain/standing.repository.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import StandingsApiRepository from "./infrastructure/standing.repository.api.js";
import StandingMongoRepository from "./infrastructure/standing.repository.mongo.js";
import StandingController from "./presentation/standing.controller.js";
import StandingRoutes from "./presentation/standing.routes.js";
import { Express } from "express";
import Standing from "./domain/standing.entity.js";
import CompetitionUseCases from "../Competition/application/competition.use_cases.js";

export default class StandingApp {
  standingApiRepository: IApiRepository<Standing>;
  standingDbRepository: IStandingRepository;
  standingUseCases: StandingUseCases;
  standingController: StandingController;
  standingRoutes: StandingRoutes;

  constructor(competitionUseCases: CompetitionUseCases, server: Express) {
    // ----------------- infrastructure layout -------------------
    this.standingApiRepository = new StandingsApiRepository();
    this.standingDbRepository = new StandingMongoRepository();

    // ----------------- application layout -----------------
    this.standingUseCases = new StandingUseCases(
      this.standingApiRepository,
      this.standingDbRepository,
      competitionUseCases
    );

    // ----------------- presentation layout -----------------
    this.standingController = new StandingController(this.standingUseCases);
    this.standingRoutes = new StandingRoutes(this.standingController, server);
  }
}

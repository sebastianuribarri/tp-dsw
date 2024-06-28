import CompetitionUseCases from "./application/competition.use_cases.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import Competition from "./domain/competiton.entity.js";
import ICompetitionRepository from "./domain/competition.repository.js";
import CompetitionApiRepository from "./infrastructure/competition.repository.api.js";
import CompetitionMongoRepository from "./infrastructure/competition.repository.mongo.js";
import CompetitionController from "./presentation/competition.controller.js";
import CompetitionRoutes from "./presentation/competition.routes.js";
import { Express } from "express";
import StandingUseCases from "./application/standing.use_cases.js";
import StandingApiRepository from "../Standing/infrastructure/standing.repository.api.js";
import Standing from "./domain/standing.entity.js";

export default class CompetitionApp {
  competitionApiRepository: IApiRepository<Competition>;
  competitionDbRepository: ICompetitionRepository;
  competitionUseCases: CompetitionUseCases;
  competitionController: CompetitionController;
  competitionRoutes: CompetitionRoutes;
  standingsUseCases: StandingUseCases;

  standingApiRepository: IApiRepository<Standing>;

  constructor(server: Express) {
    // ----------------- infrastructure layer -------------------
    this.standingApiRepository = new StandingApiRepository();
    this.competitionApiRepository = new CompetitionApiRepository();
    this.competitionDbRepository = new CompetitionMongoRepository();

    // ----------------- application layer -----------------

     this.standingsUseCases = new StandingUseCases(
      this.standingApiRepository,
    );

    this.competitionUseCases = new CompetitionUseCases(
      this.competitionApiRepository,
      this.competitionDbRepository,
      this.standingsUseCases,
    );

    // ----------------- presentation layer -----------------
    this.competitionController = new CompetitionController(
      this.competitionUseCases
    );
    this.competitionRoutes = new CompetitionRoutes(
      this.competitionController,
      server
    );
  }
}

import CompetitionUseCases from "./application/competition.use_cases.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import Competition, { CompetitionDetail } from "./domain/competition.entity.js";
import ICompetitionRepository from "./domain/competition.repository.js";
import CompetitionApiRepository from "./infrastructure/competition.repository.api.js";
import CompetitionMongoRepository from "./infrastructure/competition.repository.mongo.js";
import CompetitionController from "./presentation/competition.controller.js";
import CompetitionRoutes from "./presentation/competition.routes.js";
import IMatchRepository from "../Match/domain/match.repository.js";
import { Express } from "express";
import StandingApp from "../Standing/standing.app.js";
import StandingUseCases from "../Standing/application/standing.use_cases.js";
import ApiFootball from "../ApiFootball/api.js";
import MatchMongoRepository from "../Match/infrastructure/match.repository.mongo.js";

export default class CompetitionApp {
  competitionApiRepository: IApiRepository<Competition>;
  competitionDbRepository: ICompetitionRepository;
  matchDbRepository: IMatchRepository;
  competitionUseCases: CompetitionUseCases;
  competitionController: CompetitionController;
  competitionRoutes: CompetitionRoutes;

  constructor(
    public readonly standingApp: StandingApp,
    api: ApiFootball,
    server: Express
  ) {
    // ----------------- infrastructure layer -------------------

    this.competitionApiRepository = new CompetitionApiRepository(api);
    this.competitionDbRepository = new CompetitionMongoRepository();
    this.matchDbRepository = new MatchMongoRepository();

    // ----------------- application layer -----------------

    this.competitionUseCases = new CompetitionUseCases(
      this.competitionApiRepository,
      this.competitionDbRepository,
      this.matchDbRepository,
      standingApp.standingUseCases
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

  public async setup() {
    await this.competitionUseCases.listAll();
  }
}

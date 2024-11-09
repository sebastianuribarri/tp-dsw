import { Express } from "express";
import MatchApiRepository from "./infrastructure/match.repository.api.js";
import MatchMongoRepository from "./infrastructure/match.repository.mongo.js";
import MatchUseCases from "./application/match.use_cases.js";
import MatchController from "./presentation/match.controller.js";
import MatchRoutes from "./presentation/match.routes.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import Match from "./domain/match.entity.js";
import IMatchRepository from "./domain/match.repository.js";
import EventApp from "../Event/event.app.js";
import LineUpApp from "../LineUp/lineup.app.js";
import CompetitionApp from "../Competition/competition.app.js";

export default class MatchApp {
  matchApiRepository: IApiRepository<Match>;
  matchDbRepository: IMatchRepository;
  matchUseCases: MatchUseCases;
  matchController: MatchController;
  matchRoutes: MatchRoutes;
  constructor(
    private readonly eventApp: EventApp,
    private readonly lineUpApp: LineUpApp,
    private readonly competitionApp: CompetitionApp,
    private readonly apiFootball,
    server: Express
  ) {
    // ----------------- infrastructure layer -------------------

    this.matchApiRepository = new MatchApiRepository(apiFootball);
    this.matchDbRepository = new MatchMongoRepository();

    // ----------------- application layer -----------------

    this.matchUseCases = new MatchUseCases(
      this.matchApiRepository,
      this.matchDbRepository,
      eventApp.eventUseCases,
      lineUpApp.lineupUseCases,
      competitionApp.competitionUseCases
    );

    // ----------------- presentation layer -----------------

    this.matchController = new MatchController(this.matchUseCases);
    this.matchRoutes = new MatchRoutes(this.matchController, server);
  }
}

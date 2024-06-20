import CompetitionUseCases from "./application/competition.use_cases.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import Competition from "./domain/competiton.entity.js";
import ICompetitionRepository from "./domain/competition.repository.js";
import CompetitionApiRepository from "./infrastructure/competition.repository.api.js";
import CompetitionMongoRepository from "./infrastructure/competition.repository.mongo.js";
import CompetitionController from "./presentation/competition.controller.js";
import CompetitionRoutes from "./presentation/competition.routes.js";
import { Express } from "express";

export default class CompetitionApp {
  competitionApiRepository: IApiRepository<Competition>;
  competitionDbRepository: ICompetitionRepository;
  competitionUseCases: CompetitionUseCases;
  competitionController: CompetitionController;
  competitionRoutes: CompetitionRoutes;

  constructor(server: Express) {
    // ----------------- infrastructure layer -------------------
    this.competitionApiRepository = new CompetitionApiRepository();
    this.competitionDbRepository = new CompetitionMongoRepository();

    // ----------------- application layer -----------------
    this.competitionUseCases = new CompetitionUseCases(
      this.competitionApiRepository,
      this.competitionDbRepository
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

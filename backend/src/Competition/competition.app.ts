import CompetitionUseCases from "./application/competition.use_cases.js";
import {
  ICompetitionApiRepository,
  ICompetitionRepository,
} from "./domain/competition.repository.js";
import CompetitionsApiRepository from "./infrastructure/competition.repository.api.js";
import CompetitionMongoRepository from "./infrastructure/competition.repository.mongo.js";
import CompetitionController from "./presentation/competition.controller.js";
import CompetitionsRoutes from "./presentation/competition.routes.js";
import { Express } from "express";

export default class CompetitionsApp {
  competitionsApiRepository: ICompetitionApiRepository;
  competitionsDbRepository: ICompetitionRepository;
  competitionsUseCases: CompetitionUseCases;
  competitionsController: CompetitionController;
  competitionsRoutes: CompetitionsRoutes;

  constructor(server: Express) {
    // ----------------- infrastructure layout -------------------
    this.competitionsApiRepository = new CompetitionsApiRepository();
    this.competitionsDbRepository = new CompetitionMongoRepository();

    // ----------------- application layout -----------------
    this.competitionsUseCases = new CompetitionUseCases(
      this.competitionsApiRepository,
      this.competitionsDbRepository
    );

    // ----------------- presentation layout -----------------
    this.competitionsController = new CompetitionController(
      this.competitionsUseCases
    );
    this.competitionsRoutes = new CompetitionsRoutes(
      this.competitionsController,
      server
    );
  }
}

import { Router } from "express";
import CompetitionController from "./competition.controller.js";
import CompetitionUseCases from "../application/competition.use_cases.js";
import CompetitionApiRepository from "../infrastructure/competition.repository.api.js";
import CompetitionMongoRepository from "../infrastructure/competition.repository.mongo.js";

const competitionApiRepository = new CompetitionApiRepository();

const competitionMongoRepository = new CompetitionMongoRepository();

const competitionUseCases = new CompetitionUseCases(
  competitionApiRepository,
  competitionMongoRepository
);
const competitionController = new CompetitionController(competitionUseCases);

export const competitionRouter = Router();

competitionRouter.get("/", competitionController.getAll);
competitionRouter.get("/:id", competitionController.getOne);

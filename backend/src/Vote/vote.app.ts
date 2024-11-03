import VoteUseCases from "./application/vote.use_cases.js";
import { IVoteRepository } from "./domain/vote.repository.js";
import VoteMongoRepository from "./infraestructure/vote.repository.mongo.js";
import VoteController from "./presentation/vote.controller.js";
import VotesRoutes from "./presentation/vote.routes.js";
import { Express } from "express";

export default class VoteApp {
  voteDbRepository: IVoteRepository;
  voteUseCases: VoteUseCases;
  voteController: VoteController;
  voteRoutes: VotesRoutes;

  constructor(server: Express) {
    // ----------------- infrastructure layer -------------------
    this.voteDbRepository = new VoteMongoRepository();

    // ----------------- application layer -----------------
    this.voteUseCases = new VoteUseCases(this.voteDbRepository);

    // ----------------- presentation layer -----------------
    this.voteController = new VoteController(this.voteUseCases);
    this.voteRoutes = new VotesRoutes(this.voteController, server);
  }
}

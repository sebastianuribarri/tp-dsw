import TeamUseCases from "./application/team.use_cases.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import Team from "./domain/team.entity.js";
import ITeamRepository from "./domain/team.repository.js";
import TeamApiRepository from "./infrastructure/team.repository.api.js";
import TeamMongoRepository from "./infrastructure/team.repository.mongo.js";
import TeamController from "./presentation/team.controller.js";
import TeamRoutes from "./presentation/team.routes.js";
import { Express } from "express";
import PlayerUseCases from "../Player/application/player.use_cases.js";
import Player from "../Player/domain/player.entity.js";
import PlayerApiRepository from "../Player/infrastructure/player.repository.api.js";
import PlayerApp from "../Player/player.app.js";

export default class TeamApp {
  teamApiRepository: IApiRepository<Team>;
  teamDbRepository: ITeamRepository;
  teamUseCases: TeamUseCases;
  teamController: TeamController;
  teamRoutes: TeamRoutes;
  

  constructor(server: Express, playerApp: PlayerApp) {
    // ----------------- infrastructure layer -------------------
    this.teamApiRepository = new TeamApiRepository();
    this.teamDbRepository = new TeamMongoRepository();

    // -----------------  application layer  --------------------

    this.teamUseCases = new TeamUseCases(
      this.teamApiRepository,
      this.teamDbRepository,
      playerApp.playerUseCases,
    );

    // -----------------  presentation layer  -------------------
    this.teamController = new TeamController(this.teamUseCases);
    this.teamRoutes = new TeamRoutes(this.teamController, server);
  }
}

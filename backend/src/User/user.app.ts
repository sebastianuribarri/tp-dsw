import TeamUseCases from "../Team/application/team.use_cases.js";
import TeamMongoRepository from "../Team/infrastructure/team.repository.mongo.js";
import UserUseCases from "./application/user.use_cases.js";
import { IUserRepository } from "./domain/user.repository.js";
import UserMongoRepository from "./infrastructure/user.repository.mongo.js";
import UserController from "./presentation/user.controller.js";
import UsersRoutes from "./presentation/user.routes.js";
import { Express } from "express";

export default class UserApp {
  userDbRepository: IUserRepository;
  userUseCases: UserUseCases;
  userController: UserController;
  userRoutes: UsersRoutes;
  teamDbRepository: TeamMongoRepository;
  constructor(server: Express) {
    // ----------------- infrastructure layer -------------------
    this.userDbRepository = new UserMongoRepository();
    this.teamDbRepository = new TeamMongoRepository();
    // ----------------- application layer -----------------
    this.userUseCases = new UserUseCases(
      this.userDbRepository,
      this.teamDbRepository
    );

    // ----------------- presentation layer -----------------
    this.userController = new UserController(this.userUseCases);
    this.userRoutes = new UsersRoutes(this.userController, server);
  }
}

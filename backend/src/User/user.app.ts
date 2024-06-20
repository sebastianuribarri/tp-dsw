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

  constructor(server: Express) {
    // ----------------- infrastructure layer -------------------
    this.userDbRepository = new UserMongoRepository();

    // ----------------- application layer -----------------
    this.userUseCases = new UserUseCases(this.userDbRepository);

    // ----------------- presentation layer -----------------
    this.userController = new UserController(this.userUseCases);
    this.userRoutes = new UsersRoutes(this.userController, server);
  }
}

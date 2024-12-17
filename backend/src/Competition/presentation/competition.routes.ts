import { Router, Express } from "express";
import CompetitionController from "./competition.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";

export default class CompetitionsRoutes {
  constructor(competitionsController: CompetitionController, server: Express) {
    const competitionsRouter = Router();
    server.use("/api/competitions", competitionsRouter);
    competitionsRouter.use(authenticateUser);
    competitionsRouter.get("/", competitionsController.getAll);
    competitionsRouter.get("/search", competitionsController.getBySearch);
    competitionsRouter.get("/:id", competitionsController.getOne);
    competitionsRouter.get("/team/:teamId", competitionsController.getByTeam);
  }
}

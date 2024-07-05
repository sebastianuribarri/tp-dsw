import { Router, Express } from "express";
import CompetitionController from "./competition.controller.js";

export default class CompetitionsRoutes {
  constructor(competitionsController: CompetitionController, server: Express) {
    const competitionsRouter = Router();
    server.use("/api/competitions", competitionsRouter);

    competitionsRouter.get("/", competitionsController.getAll);
    competitionsRouter.get("/:id", competitionsController.getOne);
    competitionsRouter.get("/team/:teamId", competitionsController.getByTeam);
  }
}

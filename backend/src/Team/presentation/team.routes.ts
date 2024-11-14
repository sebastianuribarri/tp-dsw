import { Router, Express } from "express";
import TeamController from "./team.controller.js";

export default class TeamsRoutes {
  constructor(teamsController: TeamController, server: Express) {
    const teamsRouter = Router();
    server.use("/api/teams", teamsRouter);

    teamsRouter.get("/", teamsController.getAll);
    teamsRouter.get("/search/", teamsController.getBySearch);
    teamsRouter.get("/:id", teamsController.getOne);
  }
}
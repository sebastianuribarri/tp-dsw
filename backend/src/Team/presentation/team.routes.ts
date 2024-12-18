import { Router, Express } from "express";
import TeamController from "./team.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";


export default class TeamsRoutes {
  constructor(teamsController: TeamController, server: Express) {
    const teamsRouter = Router();
    server.use("/api/teams", teamsRouter);
    teamsRouter.use(authenticateUser);
    teamsRouter.get("/", teamsController.getAll);
    teamsRouter.get("/search", teamsController.getBySearch);
    teamsRouter.get("/:id", teamsController.getOne);
  }
}
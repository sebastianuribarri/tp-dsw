// match.routes.ts
import { Router, Express } from "express";
import MatchController from "./match.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";

export default class MatchRoutes {
  constructor(matchesController: MatchController, server: Express) {
    const matchesRouter = Router();
    server.use("/api/matches", matchesRouter);
    matchesRouter.use(authenticateUser);
    matchesRouter.get("/", matchesController.getAll);
    matchesRouter.get("/search", matchesController.getBySearch);
    matchesRouter.get("/team/:id", matchesController.getByTeam);
    matchesRouter.get("/teams", matchesController.getMatchesByTeams);
    matchesRouter.get("/live", matchesController.getLiveMatches);
    matchesRouter.get("/:id", matchesController.getOne);
    matchesRouter.get("/calendar", matchesController.getCalendar);
  }
}

import { Router, Express } from "express";
import MatchController from "./match.controller.js";

export default class MatchRoutes {
  constructor(matchesController: MatchController, server: Express) {
    const matchesRouter = Router();
    server.use("/api/matches", matchesRouter);
    matchesRouter.get("/", matchesController.getAll);
    matchesRouter.get("/team/:id", matchesController.getByTeam);
    matchesRouter.get("/live", matchesController.getLiveMatches);
    matchesRouter.get("/:id", matchesController.getOne);
  }
}

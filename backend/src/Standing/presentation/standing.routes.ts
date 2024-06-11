import { Express, Router } from "express";
import standingsController from "./standing.controller.js";

export default class StandingRoutes {
  constructor(standingController: standingsController, server: Express) {
          const standingsRouter = Router();
    server.use("/api/standings", standingsRouter);

    standingsRouter.get("/competition/:competitionId", standingController.getStandingsByCompetition);
    standingsRouter.get("/team/:teamId", standingController.getStandingsByTeam);
  }
  
}

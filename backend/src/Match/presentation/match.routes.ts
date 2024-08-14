import { Router, Express } from "express";

export default class MatchRoutes {
  constructor(matchesController: any, server: Express) {
    const matchesRouter = Router();
    server.use("/api/matches", matchesRouter);

    matchesRouter.get("/", matchesController.getAll);
    matchesRouter.get("/:id", matchesController.getOne);
    matchesRouter.get("/team/:teamId", matchesController.getByTeam);
  }
}

import { Router, Express } from "express";
import VoteController from "./vote.controller.js";
import { authenticateUser } from "../../Shared/infrastructure/authenticate.js";

export default class VotesRoutes {
  constructor(private voteController: VoteController, server: Express) {
    const voteRouter = Router();
    server.use("/api/votes", voteRouter);
    voteRouter.use((req, res, next) => {
      authenticateUser(req, res, next, { premium: true });
    });
    voteRouter.get("/:match", voteController.getVotesByMatch);
    voteRouter.post("/", voteController.createVote);
    voteRouter.get("/:matchId/:userId", voteController.getVoteByIds);
  }
}

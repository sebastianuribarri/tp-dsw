import { Router, Express } from "express";
import VoteController from "./vote.controller.js";

export default class VotesRoutes {
  constructor(private voteController: VoteController, server: Express) {
    const voteRouter = Router();
    server.use("/api/votes", voteRouter);

    voteRouter.get("/:match", voteController.getVotesByMatch);
    voteRouter.post("/", voteController.createVote);
  }
}

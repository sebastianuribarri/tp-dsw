import { Response, Request } from "express";
import Vote from "../domain/vote.entity.js";
import VoteUseCases from "../application/vote.use_cases.js";
import Player from "../../Player/domain/player.entity.js";

export default class VoteController {
  constructor(public voteUseCases: VoteUseCases) {
    this.getVotesByMatch = this.getVotesByMatch.bind(this);
    this.createVote = this.createVote.bind(this);
    this.getVoteByIds = this.getVoteByIds.bind(this);
    this.voteUseCases = voteUseCases;
  }
  public async getVotesByMatch(req: Request, res: Response) {
    const result = await this.voteUseCases.getVotesByMatch(
      Number(req.params.match)
    );
    res.json(result);
  }

  public async createVote(req: Request, res: Response) {
    try {
      const { player, user, match } = req.body;
      if (!player || !user || !match) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const vote = new Vote({
        player: new Player({
          id: Number(player.id),
          name: String(player.name),
          image: String(player.image),
          number: Number(player.number),
          position: String(player.position),
        }),
        user: String(user),
        match: Number(match),
      });
      await this.voteUseCases.createVote(vote);
      res.json(vote);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getVoteByIds(req: Request, res: Response) {
    try {
      const { matchId, userId } = req.params;
      const vote = await this.voteUseCases.getVoteByIds(
        Number(matchId),
        userId
      );
      if (vote) {
        return res.json(vote);
      } else {
        return res.status(404).json({ message: "Vote not found" });
      }
    } catch (error) {
      console.log(error, "ERROR EN CONTROLLER");
      return res.status(500).json({ message: error.message });
    }
  }
}
import { Response, Request } from "express";
import Vote from "../domain/vote.entity.js";
import VoteUseCases from "../application/vote.use_cases.js";
import Player from "../../Player/domain/player.entity.js";

export default class VoteController {
  constructor(public voteUseCases: VoteUseCases) {
    this.getVotesByMatch = this.getVotesByMatch.bind(this);
    this.createVote = this.createVote.bind(this);
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
      const vote = new Vote({
        player: new Player({
          id: Number(req.body.player.id),
          name: String(req.body.player.name),
          image: String(req.body.player.image),
          number: Number(req.body.player.number),
          position: String(req.body.player.position),
        }),
        user: String(req.body.user),
        match: Number(req.body.match),
      });
      await this.voteUseCases.createVote(vote);
      res.json(vote);
    } catch (error) {
      console.log(error);
    }
  }
}

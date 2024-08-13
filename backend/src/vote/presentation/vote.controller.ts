import VoteUseCases from "../application/vote.use_cases.js";
import { Response, Request } from "express";
import Vote from "../domain/vote.entity.js";
import { match } from "assert";

export default class VoteController {
  constructor(private voteUseCases: VoteUseCases) {
    this.getVotesByMatch = this.getVotesByMatch.bind(this);
    this.voteUseCases = voteUseCases;
}
public async getVotesByMatch(req: Request, res: Response) {
    const result = await this.voteUseCases.getVotesByMatch(Number(req.params.match));
    res.json(result);
}

public async createVote(req: Request, res: Response) {
    try {
        const vote = new Vote({
            player: Number(req.body.player),
            user: Number(req.body.user),
            match: Number(req.body.match),

        })
    } catch (error) {
        console.log(error);
    }

}

}
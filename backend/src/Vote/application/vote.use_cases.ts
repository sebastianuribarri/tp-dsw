import Vote from "../domain/vote.entity.js";
import { IVoteRepository } from "../domain/vote.repository.js";

export default class VoteUseCases {
  private voteDbRepository: IVoteRepository;
  public constructor(voteDbRepository: IVoteRepository) {
    this.voteDbRepository = voteDbRepository;
  }

  public async getVotesByMatch(match: number) {
    const votes = await this.voteDbRepository.findByMatch(match);
    if (!votes) throw new Error("vote not found");
    return votes;
  }

  public async createVote(vote: Vote) {
    return await this.voteDbRepository.insertOne(vote);
  }

  public async getVoteByIds(matchId: number, userId: string) {
  const prediction = await this.voteDbRepository.getVoteByIds(matchId, userId);
  return prediction;
  }
}

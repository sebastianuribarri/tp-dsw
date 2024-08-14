import MatchBestPlayer from "./matchBestPlayer.entity.ts";
import Vote from "./vote.entity.ts";

export interface IVoteRepository {
  findByMatch(match: number): Promise<MatchBestPlayer[] | null>;
  insertOne(vote: Vote): Promise<void>;
}

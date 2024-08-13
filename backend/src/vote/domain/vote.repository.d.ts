import { MatchResult } from "./matchresult.entity.ts";
import Vote from "./vote.entity.ts";

export interface IVoteRepository {
  findByMatch(match: number): Promise<MatchResult [] | null>;
  insertOne(vote: Vote): Promise<void>;
}

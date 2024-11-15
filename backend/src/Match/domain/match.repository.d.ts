import Match, { MatchDetail } from "./match.entity.ts";

export default interface IMatchRepository {
  findAll(filters?: object): Promise<Match[] | null>;
  findRoundsByCompetitionId(competitionId: number): Promise<string[] | null>;
  findById(id: number): Promise<MatchDetail | null>;
  insertOne(match: MatchDetail): Promise<MatchDetail | void>;
  updateOne(id: number, newData: Match): Promise<MatchDetail | null>;
}

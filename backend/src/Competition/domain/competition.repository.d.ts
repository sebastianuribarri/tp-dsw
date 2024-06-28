import Competition, { CompetitionDetail } from "./competiton.entity.ts";

export default interface ICompetitionRepository {
  findAll(filters?: object): Promise<CompetitionDetail[] | null>;
  findById(id: number): Promise<CompetitionDetail | null>;
  insertOne(competition: Competition): Promise<CompetitionDetail | void>;
  updateOne(id: number, newData: Competition): Promise<CompetitionDetail | null>;
}

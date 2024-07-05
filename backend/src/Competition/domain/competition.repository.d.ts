import Competition, { CompetitionDetail } from "./competiton.entity.ts";

export default interface ICompetitionRepository {
  findAll(filters?: object): Promise<Competition[] | null>;
  findById(id: number): Promise<CompetitionDetail | null>;
  insertOne(competition: CompetitionDetail): Promise<CompetitionDetail | void>;
  updateOne(
    id: number,
    newData: Competition
  ): Promise<CompetitionDetail | null>;
}

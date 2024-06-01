import Competition from "./competiton.entity.ts";

export default interface ICompetitionRepository {
  findAll(): Promise<Competition[] | null>;
  findById(id: number): Promise<Competition | null>;
  insertOne(competition: Competition): Promise<Competition | void>;
  updateOne(id: number, newData: Competition): Promise<Competition | null>;
}

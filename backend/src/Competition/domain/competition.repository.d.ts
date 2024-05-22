import ICompetition from "./competition.js";

export interface ICompetitionApiRepository {
  findAll(): Promise<ICompetition[] | null>;
}

export interface ICompetitionRepository {
  findAll(): Promise<ICompetition[] | null>;
  findById(id: number): Promise<ICompetition | null>;
  insertOne(competition: ICompetition): Promise<ICompetition | void>;
  updateOne(
    id: number,
    { start }: { start: Date }
  ): Promise<ICompetition | null>;
}

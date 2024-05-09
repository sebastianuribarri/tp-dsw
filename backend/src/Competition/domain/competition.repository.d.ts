import ICompetition from "./competition.js";

export interface ICompetitionApiRepository {
  findAll(): Promise<any>;
}

export interface ICompetitionRepository {
  findAll(): Promise<ICompetition[] | null>;
  findById(id: number): Promise<ICompetition | null>;
  insertOne(competition: ICompetition): Promise<void>;
  updateOne(oldCompetition: ICompetition, any): Promise<ICompetition | null>;
}

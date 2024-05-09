import Competition from "./competition.js";

export default interface CompetitionRepository {
  findAll(): Promise<Competition[] | any>;
  findById?(id: number): Promise<Competition | null>;
  insertOne?(competition: Competition): Promise<Competition | null>;
  updateOne?(competition: Competition): Promise<Competition | null>;
  deleteOne?(id: number): Promise<Competition | null>;
}

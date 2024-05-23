import Standing from "./standing.entity.ts";

export interface IStandingApiRepository {
  findAll(competition: number, season: number): Promise<Standing[] | null>;
}

export interface IStandingRepository {
  findByCompetition(Competition: number): Promise<Standing[] | null>;
  findByTeam(id: number): Promise<Standing | null>;
  insertOne(standing: Standing):  Promise<void>;
  updateMany(
 filters: any, newdata: any,
  ):  Promise<void>;
  
  deleteMany(filters: any): Promise<void>
}
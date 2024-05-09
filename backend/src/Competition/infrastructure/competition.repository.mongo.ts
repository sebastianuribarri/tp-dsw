import CompetitionEntity from "../domain/competiton.entity.js";
import { db } from "../../middlewares/connection.js";
import Competition from "../domain/competiton.entity.js";
import CompetitionRepository from "../domain/competition.repository.js";

export interface ILeagueService {
  service: ILeagueService;
}

const competitions = db.collection<CompetitionEntity>("competitions");

export default class CompetitionMongoRepository
  implements CompetitionRepository
{
  public async findAll(): Promise<CompetitionEntity[] | void> {
    try {
      return (await competitions.find().toArray()).map((comp) => {
        return {
          id: comp.id,
          start: comp.start,
          name: comp.name,
          type: comp.type,
          logo: comp.logo,
        };
      });
    } catch (err) {
      console.log("ocurrio un error");
    }
  }
  public async findById(id: number): Promise<Competition | null> {
    return;
  }
  public async insertOne(id: Competition): Promise<Competition | null> {
    return;
  }
  public async updateOne(
    competition: Competition
  ): Promise<Competition | null> {
    return;
  }
  public async deleteOne(id: number): Promise<Competition | null> {
    return;
  }
}

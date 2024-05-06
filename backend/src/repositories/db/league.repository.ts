import { CompetitionModel } from "../../models/competiton.model.js";
import { db } from "../../middlewares/connection.js";
import { WithId } from "mongodb";
export interface ILeagueService {
  getAll(): [CompetitionModel];
}

export interface ILeagueService {
  service: ILeagueService;
}

const competitions = db.collection<CompetitionModel>("competitions");

export class LeagueMongoRepository {
  public async getAll(): Promise<CompetitionModel[] | void> {
    try {
      return (await competitions.find().toArray()).map((comp) => {
        return {
          id: comp.id,
          name: comp.name,
          type: comp.type,
          logo: comp.logo,
        };
      });
    } catch (err) {
      console.log("ocurrio un error");
    }
  }
}

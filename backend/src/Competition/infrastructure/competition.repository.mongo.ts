import ICompetition from "../domain/competiton.entity.js";
import { db } from "../../shared/middlewares/connection.js";
import { ICompetitionRepository } from "../domain/competition.repository.js";
import CompetitionModel from "./competition.schema.js";

export default class CompetitionMongoRepository
  implements ICompetitionRepository
{
  public async findAll(): Promise<ICompetition[] | null> {
    try {
      return await CompetitionModel.find();
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findById(id: number): Promise<ICompetition | null> {
    return;
  }

  public async insertOne(competition: ICompetition): Promise<void> {
    await CompetitionModel.create(competition);
  }
  public async updateOne(
    oldCompetition,
    newData: { start: Date }
  ): Promise<ICompetition | null> {
    const updatedCompetition = oldCompetition;
    updatedCompetition.start = newData.start;
    return updatedCompetition.save();
  }
}

import ICompetition from "../domain/competiton.entity.js";
import { ICompetitionRepository } from "../domain/competition.repository.js";
import CompetitionModel from "./competition.schema.js";
import Competition from "../domain/competiton.entity.js";

export default class CompetitionMongoRepository
  implements ICompetitionRepository
{
  public async findAll(): Promise<ICompetition[] | null> {
    try {
      const mongoCompetitions = await CompetitionModel.find();
      return mongoCompetitions.map((elem) => {
        return new Competition({
          id: elem.id,
          start: elem.start,
          name: elem.name,
          type: elem.type,
          logo: elem.logo,
        });
      });
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
    id: number,
    newData: { start: Date }
  ): Promise<ICompetition | null> {
    return await CompetitionModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}

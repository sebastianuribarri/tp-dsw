import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionModel from "./competition.schema.js";
import Competition, { CompetitionDetail } from "../domain/competition.entity.js";
import Standing from "../../Standing/domain/standing.entity.js";

export default class CompetitionMongoRepository
  implements ICompetitionRepository
{
  public async findAll(filters?: object): Promise<Competition[] | null> {
    try {
      const mongoCompetitions = await CompetitionModel.find(filters);

      return mongoCompetitions.map(
        (competition) => new Competition(competition)
      );
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findById(id: number): Promise<CompetitionDetail | null> {
    const competition = await CompetitionModel.findOne({ id: id });

    if (!competition) return null;
    let standings: Standing[];
    if (competition.standings) {
      standings = competition.standings.map(
        (standing) => new Standing(standing)
      );
    } else standings = [];
    return new CompetitionDetail(competition, standings);
  }

  public async insertOne(competition: CompetitionDetail): Promise<void> {
    await CompetitionModel.create(competition);
  }
  public async updateOne(
    id: number,
    newData: CompetitionDetail
  ): Promise<CompetitionDetail | null> {
    return await CompetitionModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}

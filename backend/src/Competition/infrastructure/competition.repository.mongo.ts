import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionModel from "./competition.schema.js";
import Competition, { CompetitionDetail } from "../domain/competiton.entity.js";
import Standing from "../domain/standing.entity.js";

export default class CompetitionMongoRepository
  implements ICompetitionRepository
{
  public async findAll(): Promise<Competition[] | null> {
    try {
      const mongoCompetitions = await CompetitionModel.find();
      return mongoCompetitions.map((competition) => {
        return new Competition({
          id: competition.id,
          start: competition.start,
          end: competition.end,
          name: competition.name,
          type: competition.type,
          logo: competition.logo,
          standingsTimmer: competition.standingsTimmer,
        });
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findById(id: number): Promise<Competition | null> {
    const competition = await CompetitionModel.findOne({ id: id });
    const standings = competition.standings.map((standing ) =>  new Standing(standing))
    return new CompetitionDetail({
      id: competition.id,
      start: competition.start,
      end: competition.end,
      name: competition.name,
      type: competition.type,
      logo: competition.logo,
      standingsTimmer: competition.standingsTimmer,

    }, standings );
  }

  public async insertOne(competition: Competition): Promise<void> {
    await CompetitionModel.create(competition);
  }
  public async updateOne(
    id: number,
    newData: Competition
  ): Promise<Competition | null> {
    return await CompetitionModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}

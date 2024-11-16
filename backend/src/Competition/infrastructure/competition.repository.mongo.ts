import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionModel from "./competition.schema.js";
import Competition, {
  CompetitionDetail,
} from "../domain/competition.entity.js";
import Standing from "../../Standing/domain/standing.entity.js";

export default class CompetitionMongoRepository
  implements ICompetitionRepository
{
  public async findAll(
    filters?: Record<string, any>
  ): Promise<Competition[] | null> {
    try {
      if (filters && filters.search) {
        // Split search terms and create a pattern that matches all words
        const searchTerms = filters.search.toLowerCase().split(" ");
        const regexPattern = searchTerms
          .map((term) => `(?=.*${term})`)
          .join("");
        filters = {
          name: {
            $regex: regexPattern,
            $options: "i",
          },
        };
      }

      const mongoCompetitions = await CompetitionModel.find(filters);

      return mongoCompetitions.map(
        (competition) => new Competition(competition)
      );
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
      return null;
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

    const competitionDetail = new CompetitionDetail(competition, standings, []);

    return competitionDetail;
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
  public async deleteOne(id: number) {
    await CompetitionModel.deleteOne({ id: id });
  }
}

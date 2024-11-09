import IMatchRepository from "../domain/match.repository.js";
import MatchModel, { matchSchema } from "./match.schema.js";
import Match, { MatchDetail } from "../domain/match.entity.js";

export default class MatchMongoRepository implements IMatchRepository {
  public async findAll(filters?: object): Promise<Match[] | null> {
    try {
      const mongoMatches = await MatchModel.find(filters).sort({ date: -1 });

      return mongoMatches.map((match) => new Match(match));
    } catch (error) {
      console.log("ocurrio un error en MongoRepository(findall)", error);
    }
  }
  public async findById(id: number): Promise<MatchDetail | null> {
    const match = await MatchModel.findOne({ id: id });

    if (!match) return null;
    return new MatchDetail(match, match.events, match.lineUps);
  }

  public async insertOne(match: MatchDetail): Promise<void> {
    await MatchModel.create(match);
  }

  public async updateOne(
    id: number,
    newData: Match
  ): Promise<MatchDetail | null> {
    return await MatchModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}

import IMatchRepository from "../domain/match.repository.js";
import MatchModel, { matchSchema } from "./match.schema.js";
import Match, { MatchDetail } from "../domain/match.entity.js";

export default class MatchMongoRepository implements IMatchRepository {

public async findAll(filters?: Record<string, any>): Promise<Match[] | null> {
  try {
    if (filters && filters.search) {
      // Dividir los términos de búsqueda y crear un patrón que coincida con cualquiera
      const searchTerms = filters.search.toLowerCase().split(' ');
      const regexPattern = searchTerms.map(term => `(?=.*${term})`).join('');
      const searchPattern = { $regex: regexPattern, $options: 'i' };
      
      filters = {
        $or: [
          { 'competition.name': searchPattern },
          { 'home.name': searchPattern },
          { 'away.name': searchPattern }
        ]
      };
    }


    const mongoMatches = await MatchModel.find(filters).sort({ date: 1 });
    return mongoMatches.map((match) => new Match(match));
  } catch (error) {
    console.error("Error in findAll:", error);
    return null;
  }
}

  public async findByDate(
    date: Date,
    filters?: Record<string, any>
  ): Promise<Match[] | null> {
    try {
      filters = { ...filters, date: { $eq: date } };

      // Query the database with the filters and sort by date
      const mongoMatches = await MatchModel.find(filters).sort({ date: 1 });

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

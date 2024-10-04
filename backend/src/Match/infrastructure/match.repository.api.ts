import ApiFootball from "../../ApiFootball/api.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import { ApiResponse_OK } from "../../Shared/infrastructure/api_response.js";
import Match from "../domain/match.entity.js";

export default class MatchApiRepository
  implements IApiRepository<Match>
{
  apiFootball: ApiFootball;
  constructor(apiFootball: ApiFootball) {
    this.apiFootball = apiFootball;
  }
  public async findAll(parameters?: object): Promise<Match[] | []> {
    const res: ApiResponse_OK<any> | null =
      await this.apiFootball.getResponse("fixtures", parameters);
    if (!res) return [];
    const matches = res.response.map((apiMatch) => {
      let match = new Match({
        id: apiMatch.fixture.id,
        competition: apiMatch.league.id,
        date: apiMatch.fixture.date,
        status: apiMatch.fixture.status.short,
        home: apiMatch.teams.home,
        away: apiMatch.teams.away,
        goals: {
          home: apiMatch.goals.home,
          away: apiMatch.goals.amay,
        },
      });
      return match;
    });
    return matches;
  }
}
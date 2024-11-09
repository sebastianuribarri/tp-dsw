import ApiFootball from "../../ApiFootball/api.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import { ApiResponse_OK } from "../../Shared/infrastructure/api_response.js";
import Match from "../domain/match.entity.js";

export default class MatchApiRepository implements IApiRepository<Match> {
  apiFootball: ApiFootball;
  constructor(apiFootball: ApiFootball) {
    this.apiFootball = apiFootball;
  }
  public async findAll(parameters?: object): Promise<Match[] | []> {
    const res: ApiResponse_OK<any> | null = await this.apiFootball.getResponse(
      "fixtures",
      parameters
    );
    if (!res || !res.response) return [];
    const matches = res.response.map((apiMatch) => {
      let match = new Match({
        id: apiMatch.fixture.id,
        competition: {
          id: apiMatch.league.id,
          name: apiMatch.league.name,
          country: apiMatch.league.country,
          season: apiMatch.league.season,
          logo: apiMatch.league.logo,
        },
        round: apiMatch.league.round,
        date: apiMatch.fixture.date,
        status: apiMatch.fixture.status.short,
        minute: apiMatch.fixture.status.elapsed,
        home: apiMatch.teams.home,
        away: apiMatch.teams.away,
        goals: {
          home: apiMatch.goals.home,
          away: apiMatch.goals.away,
        },
      });
      return match;
    });
    return matches;
  }
}

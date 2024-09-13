import IApiRepository from "../../Shared/domain/api.repository.js";
import Competition from "../domain/competition.entity.js";
import { ApiResponse_OK } from "../../Shared/infrastructure/api_response.js";
import ApiCompetition from "./competition.api_response.js";
import ApiFootball from "../../ApiFootball/api.js";

export default class CompetitionApiRepository
  implements IApiRepository<Competition>
{
  apiFootball: ApiFootball;
  constructor(apiFootball: ApiFootball) {
    this.apiFootball = apiFootball;
  }
  public async findAll(parameters?: object): Promise<Competition[] | null> {
    const res: ApiResponse_OK<ApiCompetition> | null =
      await this.apiFootball.getResponse("leagues", parameters);
    const competitions = res.response.map((apiCompetition) => {
      let competition = new Competition({
        id: apiCompetition.league.id,
        start: apiCompetition.seasons[0].start,
        end: apiCompetition.seasons[0].end,
        name: apiCompetition.league.name,
        type: apiCompetition.league.type,
        logo: apiCompetition.league.logo,
        coverage: {
          events: apiCompetition.seasons[0].coverage.fixtures.events,
          lineups: apiCompetition.seasons[0].coverage.fixtures.lineups,
        },
      });
      let standingsCoverage = apiCompetition.seasons[0].coverage.standings;
      competition.standingsTimmer.checkStandingsCoverage(standingsCoverage);
      return competition;
    });
    return competitions;
  }
}

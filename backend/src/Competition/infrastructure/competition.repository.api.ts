import IApiRepository from "../../Shared/domain/api.repository.js";
import Competition from "../domain/competiton.entity.js";
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
    let n = 0;
    const res: ApiResponse_OK<ApiCompetition> | null =
      await this.apiFootball.getResponse("leagues", parameters);
    const competitions = res.response.map((apiCompetition) => {
      let competition_ = new Competition({
        id: apiCompetition.league.id,
        start: apiCompetition.seasons[0].start,
        end: apiCompetition.seasons[0].end,
        name: apiCompetition.league.name,
        type: apiCompetition.league.type,
        logo: apiCompetition.league.logo,
      });
      let standingsExist = apiCompetition.seasons[0].coverage.standings;
      if (!standingsExist) competition_.standingsTimmer.disableTimmer();
      else n = n + 1;
      return competition_;
    });
    console.log("competitions with standings", n);
    return competitions;
  }
}

import IApiRepository from "../../Shared/domain/api.repository.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import Competition from "../domain/competiton.entity.js";
import { ApiResponse_OK } from "../../Shared/infrastructure/api_response.js";
import ApiCompetition from "./competition.api_response.js";

export default class CompetitionApiRepository
  implements IApiRepository<Competition>
{
  public async findAll(parameters?: object): Promise<Competition[] | null> {
    const res: ApiResponse_OK<ApiCompetition> | null = await apiResponse(
      "leagues",
      parameters
    );
    const competitions = res.response.map(
      (apiCompetition) =>
        new Competition({
          id: apiCompetition.league.id,
          start: apiCompetition.seasons[0].start,
          end: apiCompetition.seasons[0].end,
          name: apiCompetition.league.name,
          type: apiCompetition.league.type,
          logo: apiCompetition.league.logo,
        })
    );
    return competitions;
  }
}

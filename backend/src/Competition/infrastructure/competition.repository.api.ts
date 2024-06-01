import { countReset } from "console";
import IApiRepository from "../../Shared/domain/api.repository.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import Competition from "../domain/competiton.entity.js";

export default class CompetitionApiRepository
  implements IApiRepository<Competition>
{
  public async findAll(parameters?: object): Promise<Competition[] | null> {
    const res = await apiResponse("leagues", parameters);
    const apiCompetitions = res.response.map(
      (elem) =>
        new Competition({
          id: elem.league.id,
          start: elem.seasons[0].start,
          name: elem.league.name,
          type: elem.league.type,
          logo: elem.league.logo,
        })
    );
    return apiCompetitions;
  }
}

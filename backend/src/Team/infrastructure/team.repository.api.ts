import IApiRepository from "../../Shared/domain/api.repository.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import Team from "../domain/team.entity.js";

export default class TeamApiRepository
  implements IApiRepository<Team>
{
  public async findAll(parameters?: object): Promise<Team[] | null> {
    const res = await apiResponse("teams", parameters);
    const apiTeams = res.response.map(
      (elem) =>
        new Team({
          id: elem.league.id,
          name: elem.league.name,
          logo: elem.league.logo,
        })
    );
    return apiTeams;
  }
}

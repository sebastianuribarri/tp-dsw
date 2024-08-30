import IApiRepository from "../../Shared/domain/api.repository.js";
import ApiFootball from "../../Shared/infrastructure/api-connection.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import Team from "../domain/team.entity.js";

export default class TeamApiRepository implements IApiRepository<Team> {
  apiFootball: ApiFootball;
  constructor(apiFootball: ApiFootball) {
    this.apiFootball = apiFootball;
  }
  public async findAll(parameters?: object): Promise<Team[] | null> {
    const res = await apiResponse("teams", parameters);
    const apiTeams = res.response.map(
      (elem) =>
        new Team({
          id: elem.team.id,
          name: elem.team.name,
          logo: elem.team.logo,
        })
    );
    return apiTeams;
  }
}

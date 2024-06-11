import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";

export default class StandingApiRepository implements IApiRepository<Standing> {
  public async findAll(parameters: any[]): Promise<Standing[] | null> {
    const res = await apiResponse("standings", parameters);
    const apiStandings = res.response.map(
      (elem: any) =>
        new Standing({
          competition: elem.league.id,
          team: {
            id: elem.league.standings.team.id,
            name: elem.league.standings.team.name,
            logo: elem.league.standings.team.logo,
          },
          points: elem.league.standings.points,
          goalsDiff: elem.league.standings.goalsDiff,
          group: elem.league.standings.group,
          description: elem.league.standings.description,
        })
    );
    return apiStandings;
  }
}

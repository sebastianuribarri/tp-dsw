import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";
import Team from "../../Team/domain/team.entity.js";

export default class StandingApiRepository implements IApiRepository<Standing> {
  public async findAll(parameters: any): Promise<Standing[] | null> {
    const res: any = await apiResponse("standings", parameters);
    let apiStandings: Standing[] = [];
    // if is empty
    if (res.response.length === 0) return [];

    const standingsGroups: Standing[][] = res.response[0].league.standings;
    for (let standingsGroup of standingsGroups) {
      for (let standing of standingsGroup) {
        let newStanding = new Standing({
          competition: parameters.league,
          team: new Team({
            id: standing.team.id,
            name: standing.team.name,
            logo: standing.team.logo,
          }),
          points: standing.points,
          goalsDiff: standing.goalsDiff,
          group: standing.group,
          description: standing.description,
        });

        apiStandings.push(newStanding);
      }
    }
    return apiStandings;
  }
}

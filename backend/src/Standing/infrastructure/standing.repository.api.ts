import { apiResponse } from "../../shared/middlewares/api-football.js";
import { IStandingApiRepository } from "../domain/standing.repository.js";
import Standing from "../domain/standing.entity.js";

export default class StandingApiRepository
  implements IStandingApiRepository
{

  public async findAll(competition: number, season: number): Promise<Standing[] | null> {
              const res = await apiResponse(`standings?league=${competition}&season=${season}`);
              const apiStandings = res.response.map(
        (elem) =>
        new Standing({
     competition: elem.league.id  ,
     team: {
        id: elem.league.standings.team.id ,
        name: elem.league.standings.team.name ,
        logo: elem.league.standings.team.logo ,
     },
     points: elem.league.standings.points ,
     goalsDiff: elem.league.standings.goalsDiff ,
     group: elem.league.standings.group ,
     description: elem.league.standings.description,
             })
    );
    return apiStandings;
  }
}
  
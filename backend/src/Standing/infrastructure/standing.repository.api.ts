import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";
import Team from "../../Team/domain/team.entity.js";
import ApiFootball from "../../ApiFootball/api.js";

export default class StandingApiRepository implements IApiRepository<Standing> {
  apiFootball: ApiFootball;
  constructor(apiFootball: ApiFootball) {
    this.apiFootball = apiFootball;
  }
  public async findAll(parameters: any): Promise<Standing[] | null> {
    const res = await this.apiFootball.getResponse("standings", parameters);
    let apiStandings: Standing[] = [];
    // if is empty
    if (!res) return [];
    if (!res.response) return [];
    const standingsGroups: Standing[][] = res.response[0].league.standings;
    for (let standingsGroup of standingsGroups) {
      for (let standing of standingsGroup) {
        apiStandings.push(new Standing(standing));
      }
    }
    return apiStandings;
  }
}

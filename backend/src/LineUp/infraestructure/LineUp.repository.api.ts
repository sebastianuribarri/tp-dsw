import ApiFootball from "../../ApiFootball/api.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import LineUp from "../domain/lineup.entity.js";

export default class LineUpApiRepository implements IApiRepository<LineUp> {
  constructor(private readonly api: ApiFootball) {}
  public async findAll(parameters?: object): Promise<LineUp[] | null> {
    const res = await this.api.getResponse("fixtures/lineups", parameters);
    if (!res) {
      return null;
    }
    const apiLineUps = res.response[0].lineups.map(
      (lineup) => new LineUp(lineup)
    );
    return apiLineUps;
  }
}

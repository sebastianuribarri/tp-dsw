import ApiFootball from "../../ApiFootball/api.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import LineUp from "../domain/lineup.entity.js";

export default class LineUpApiRepository implements IApiRepository<LineUp> {
  constructor(private readonly api: ApiFootball) {}
  public async findAll(parameters?: object): Promise<LineUp[] | null> {
    try {
      const res = await this.api.getResponse("fixtures/lineups", parameters);
      const apiLineUps = res.response.map(
        (lineup) =>
          new LineUp({
            team: lineup.team.id,
            formation: lineup.formation,
            starters: lineup.startXI.map((item) => {
              return {
                id: item.player.id,
                name: item.player.name,
                number: item.player.number,
                position: item.player.pos,
                grid: item.player.grid,
              };
            }),
            substitutes: lineup.substitutes.map((item) => {
              return {
                id: item.player.id,
                name: item.player.name,
                number: item.player.number,
                position: item.player.pos,
              };
            }),
          })
      );
      return apiLineUps;
    } catch (err) {
      return null;
    }
  }
}

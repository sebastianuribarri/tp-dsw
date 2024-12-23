import IApiRepository from "../../Shared/domain/api.repository.js";
import ApiFootball from "../../ApiFootball/api.js";
import Player from "../domain/player.entity.js";

export default class PlayerApiRepository implements IApiRepository<Player> {
  apiFootball: ApiFootball;
  constructor(apiFootball: ApiFootball) {
    this.apiFootball = apiFootball;
  }
  public async findAll(parameters?: object): Promise<Player[] | null> {
    try {
      const res = await this.apiFootball.getResponse(
        "players/squads",
        parameters
      );
      const apiPlayers = res.response[0].players.map(
        (player) =>
          new Player({
            id: player.id,
            name: player.name,
            image: player.photo,
            number: player.number,
            position: player.position,
          })
      );
      return apiPlayers;
    } catch (err) {
      return null;
    }
  }
}

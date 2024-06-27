import IApiRepository from "../../Shared/domain/api.repository.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import Player from "../domain/player.entity.js";

export default class PlayerApiRepository implements IApiRepository<Player> {
    public async findAll(parameters?: object): Promise<Player[] | null> {
      const res = await apiResponse("players", parameters);
      const apiPlayers = res.response.map(
        (elem) =>
          new Player({
            id: elem.player.id,
            name: elem.player.name,
            image: elem.player.image,
            number: elem.player.number,
            position: elem.player.position,
          })
      );
      return apiPlayers;
    }
  }
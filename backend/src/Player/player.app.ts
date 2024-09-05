import IApiRepository from "../Shared/domain/api.repository.js";
import ApiFootball from "../ApiFootball/api.js";
import PlayerUseCases from "./application/player.use_cases.js";
import Player from "./domain/player.entity.js";
import PlayerApiRepository from "./infrastructure/player.repository.api.js";

export default class PlayerApp {
  playerUseCases: PlayerUseCases;
  playerApiRepository: IApiRepository<Player>;

  constructor(apiFootball: ApiFootball) {
    this.playerApiRepository = new PlayerApiRepository(apiFootball);
    this.playerUseCases = new PlayerUseCases(this.playerApiRepository);
  }
}

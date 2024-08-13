import IApiRepository from "../Shared/domain/api.repository.js";
import PlayerUseCases from "./application/player.use_cases.js";
import Player from "./domain/player.entity.js";
import PlayerApiRepository from "./infrastructure/player.repository.api.js";

export default class PlayerApp {
    playerUseCases: PlayerUseCases;
    playerApiRepository: IApiRepository<Player>;

    constructor(){
        this.playerApiRepository = new PlayerApiRepository();
        this.playerUseCases = new PlayerUseCases( this.playerApiRepository );
        
    }
}
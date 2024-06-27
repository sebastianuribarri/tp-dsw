import IApiRepository from "../../Shared/domain/api.repository.js";
import Player from "../domain/player.entity.js";
import ITeamRepository from "../domain/team.repository.js";

export default class PlayerUseCases{
    constructor (private readonly playerApiRepository: IApiRepository <Player> ) {

    }
}
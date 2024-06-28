import IApiRepository from "../../Shared/domain/api.repository.js";
import Player from "../domain/player.entity.js";
import { TeamDetail } from "../domain/team.entity.js";

export default class PlayerUseCases{
    constructor (private readonly playerApiRepository: IApiRepository <Player> ) {

    }

    public async needUpdate(teamDetail: TeamDetail) {
        const playersUpdated = teamDetail.playersUpdated();
        if (!playersUpdated) {
            const apiTeamPlayers = await this.playerApiRepository.findAll({
                team: teamDetail.id
            })

            teamDetail.playersTimmer.setUpdate()

            return apiTeamPlayers;
        }   
        return false;
    }   
}
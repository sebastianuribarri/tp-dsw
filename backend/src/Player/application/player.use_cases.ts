import IApiRepository from "../../Shared/domain/api.repository.js";
import Player from "../domain/player.entity.js";
import { TeamDetail } from "../../Team/domain/team.entity.js";

export default class PlayerUseCases {
  constructor(private readonly playerApiRepository: IApiRepository<Player>) {}

  public async needUpdate(teamDetail: TeamDetail) {
    console.log(
      `Players (Team ${teamDetail.id}) ------------------------------------------------------------------------`
    );
    const playersUpdated = teamDetail.playersTimmer.playersUpdated();
    if (!playersUpdated) {
      const apiTeamPlayers = await this.playerApiRepository.findAll({
        team: teamDetail.id,
      });
      if (!apiTeamPlayers) return false;
      teamDetail.playersTimmer.updateTimmer();

      return apiTeamPlayers;
    }
    return false;
  }
}

import IApiRepository from "../../Shared/domain/api.repository.js";
import LineUp from "../domain/lineup.entity.js";
import { MatchDetail } from "../../Match/domain/match.entity.js";

export default class LineUpUseCases {
  constructor(private readonly lineupApiRepository: IApiRepository<LineUp>) {}
  public async needUpdate(matchDetail: MatchDetail) {
    const lineupsUpdated = matchDetail.lineupsTimmer.lineUpUpdated(
      matchDetail.status
    );
    if (lineupsUpdated) return false;
    // lineups unupdated -> get updated lineups
    const apiMatchPlayers = await this.lineupApiRepository.findAll({
      fixture: matchDetail.id,
    });
    matchDetail.lineupsTimmer.updateTimmer();

    return apiMatchPlayers;
  }
}

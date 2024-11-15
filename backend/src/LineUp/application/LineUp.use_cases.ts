import IApiRepository from "../../Shared/domain/api.repository.js";
import LineUp from "../domain/lineup.entity.js";
import { MatchDetail } from "../../Match/domain/match.entity.js";

export default class LineUpUseCases {
  constructor(private readonly lineupApiRepository: IApiRepository<LineUp>) {}
  public async needUpdate(matchDetail: MatchDetail) {
    console.log(
      `LineUps (Match ${matchDetail.id}) ------------------------------------------------------------------------------`
    );
    const lineupsUpdated = matchDetail.lineupsTimmer.lineUpUpdated();
    if (lineupsUpdated) return false;
    // lineups unupdated -> get updated lineups
    const apiMatchLineUps = await this.lineupApiRepository.findAll({
      fixture: matchDetail.id,
    });
    if (!apiMatchLineUps) return false;
    matchDetail.lineupsTimmer.updateTimmer(matchDetail.date);

    return apiMatchLineUps;
  }
}

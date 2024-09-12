import IApiRepository from "../../Shared/domain/api.repository.js";
import LineUp from "../domain/lineup.entity.js";
import { MatchDetail } from "../../Match/domain/match.entity.js";

export default class LineUpUseCases {
    constructor (private readonly lineupApiRepository: IApiRepository <LineUp>) {

    }
  public async needUpdate (matchDetail: MatchDetail) {
      const lineupUpdated = matchDetail.lineupsUpdated();
      if (!lineupUpdated) {
          const apiMatchPlayers = await this. 
          lineupApiRepository.findAll({
              match: matchDetail.id
          })
          matchDetail.lineupsTimmer.setUpdate()

          return apiMatchPlayers;
      }
      return false;
  }
}

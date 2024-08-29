import IApiRepository from "../../Shared/domain/api.repository.js";
import Event from "../domain/event.entity.js";
import { MatchDetail } from "../../Match/domain/match.entity.js";

export default class EventUseCases {
  constructor (private readonly eventApiRepository: IApiRepository <Event> ) {

  }
  public async needUpdate (matchDetail: MatchDetail) {
    const eventUpdated = matchDetail.eventsUpdated();
    if (!eventUpdated) {
      const apiMatchPlayers = await this.eventApiRepository.findAll({
        match: matchDetail.id
      })
      matchDetail.eventsTimmer.setUpdate()

      return apiMatchPlayers;
    }
    return false;
  }
}
import IApiRepository from "../../Shared/domain/api.repository.js";
import Event from "../domain/event.entity.js";
import { MatchDetail } from "../../Match/domain/match.entity.js";

export default class EventUseCases {
  constructor(private readonly eventApiRepository: IApiRepository<Event>) {}

  public async needUpdate(matchDetail: MatchDetail) {
    const eventUpdated = matchDetail.eventsTimmer.eventsUpdated(
      matchDetail.status
    );
    if (!eventUpdated) return false;
    // players unupdated -> get players updated
    const apiMatchPlayers = await this.eventApiRepository.findAll({
      fixture: matchDetail.id,
    });
    matchDetail.eventsTimmer.updateTimmer();

    return apiMatchPlayers;
  }
}

import IApiRepository from "../../Shared/domain/api.repository.js";
import Event from "../domain/event.entity.js";
import { MatchDetail } from "../../Match/domain/match.entity.js";

export default class EventUseCases {
  constructor(private readonly eventApiRepository: IApiRepository<Event>) {}

  public async needUpdate(matchDetail: MatchDetail) {
    console.log(
      `Events (Match ${matchDetail.id}) ------------------------------------------------------------------------------`
    );
    const eventUpdated = matchDetail.eventsTimmer.eventsUpdated();
    if (eventUpdated) return false;
    const apiMatchEvents = await this.eventApiRepository.findAll({
      fixture: matchDetail.id,
    });
    if (!apiMatchEvents) return false;
    matchDetail.eventsTimmer.updateTimmer(matchDetail.date);

    return apiMatchEvents;
  }
}

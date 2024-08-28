import IApiRepository from "../../Shared/domain/api.repository.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import { ApiResponse } from "../../Shared/infrastructure/api_response.js";
import Event from "../domain/event.entity.js";

export default class EventApiRepository implements IApiRepository<Event> {
  public async findAll(parameters?: object): Promise<Event[] | null> {
    const res = await apiResponse ("fixtures/events", parameters);
    const apiEvents = res.response[0].events.map(
      (event)=>
        new Event ({
          time: event.time,
          team: event.player,
          player: event.player,
          assist: event.assist,
          type: event.type,
          detail: event.detail,
        })
    );
    return apiEvents;
  }
}
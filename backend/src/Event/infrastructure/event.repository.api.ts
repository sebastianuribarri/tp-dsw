import ApiFootball from "../../ApiFootball/api.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Event from "../domain/event.entity.js";

export default class EventApiRepository implements IApiRepository<Event> {
  constructor(private readonly api: ApiFootball) {}
  public async findAll(parameters?: object): Promise<Event[] | null> {
    const res = await this.api.getResponse("fixtures/events", parameters);
    if (!res || !res.response) return null;
    const apiEvents = res.response.map(
      (event) =>
        new Event({
          time: event.time.elapsed + (event.time.extra ?? 0),
          team: event.team,
          player: event.player,
          assist: event.assist,
          type: event.type,
          detail: event.detail,
        })
    );
    return apiEvents;
  }
}

import ApiFootball from "../ApiFootball/api.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import EventUseCases from "./application/event.use_cases.js";
import Event from "./domain/event.entity.js";
import EventApiRepository from "./infrastructure/event.repository.api.js";

export default class EventApp {
  public readonly eventUseCases: EventUseCases;
  private readonly eventApiRepository: IApiRepository<Event>;

  constructor(private readonly apiFootball: ApiFootball) {
    this.eventApiRepository = new EventApiRepository(this.apiFootball);
    this.eventUseCases = new EventUseCases(this.eventApiRepository);
  }
}

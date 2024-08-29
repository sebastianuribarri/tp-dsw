import IApiRepository from "../Shared/domain/api.repository.js";
import EventUseCases from "./application/event.use_cases.js";
import Event from "./domain/event.entity.js";
import EventApiRepository from "./infrastructure/event.repository.api.js";

export default class EventApp {
  eventUseCases: EventUseCases;
  eventApiRepository:IApiRepository<Event>;

  constructor(){
    this.eventApiRepository = new EventApiRepository();
    this.eventUseCases = new EventUseCases(this.eventApiRepository);
  }
}
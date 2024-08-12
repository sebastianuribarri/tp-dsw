import IApiRepository from "../Shared/domain/api.repository.js";
import StandingsApiRepository from "./infrastructure/standing.repository.api.js";

import { Express } from "express";
import Standing from "./domain/standing.entity.js";
import StandingUseCases from "./application/standing.use_cases.js";

export default class StandingApp {
  public standingApiRepository: IApiRepository<Standing>;
  public standingUseCases: StandingUseCases;

  constructor() {
    // ----------------- infrastructure layer -------------------
    this.standingApiRepository = new StandingsApiRepository();

    // ----------------- application layer -----------------
    this.standingUseCases = new StandingUseCases(this.standingApiRepository);
  }
}

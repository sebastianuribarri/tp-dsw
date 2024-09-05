import IApiRepository from "../Shared/domain/api.repository.js";
import StandingsApiRepository from "./infrastructure/standing.repository.api.js";
import Standing from "./domain/standing.entity.js";
import StandingUseCases from "./application/standing.use_cases.js";
import ApiFootball from "../ApiFootball/api.js";

export default class StandingApp {
  public standingApiRepository: IApiRepository<Standing>;
  public standingUseCases: StandingUseCases;

  constructor(apiFootball: ApiFootball) {
    // ----------------- infrastructure layer -------------------
    this.standingApiRepository = new StandingsApiRepository(apiFootball);

    // ----------------- application layer -----------------
    this.standingUseCases = new StandingUseCases(this.standingApiRepository);
  }
}

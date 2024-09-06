import IApiRepository from "../Shared/domain/api.repository.js";
import StandingsApiRepository from "./infrastructure/standing.repository.api.js";
import Standing from "./domain/standing.entity.js";
import StandingUseCases from "./application/standing.use_cases.js";
import ApiFootball from "../ApiFootball/api.js";
import TeamUseCases from "../Team/application/team.use_cases.js";
import TeamApp from "../Team/team.app.js";

export default class StandingApp {
  public standingApiRepository: IApiRepository<Standing>;
  public standingUseCases: StandingUseCases;
  private readonly teamUseCases: TeamUseCases;

  constructor(apiFootball: ApiFootball, teamApp: TeamApp) {
    // ----------------- infrastructure layer -------------------
    this.standingApiRepository = new StandingsApiRepository(apiFootball);

    // ----------------- application layer -----------------
    this.teamUseCases = teamApp.teamUseCases;
    this.standingUseCases = new StandingUseCases(
      this.standingApiRepository,
      this.teamUseCases
    );
  }
}

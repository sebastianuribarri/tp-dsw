import StandingUseCases from "../application/standing.use_cases.js";

export default class standingsController {
  constructor(private competitionUseCases: StandingUseCases) {

    this.competitionUseCases = competitionUseCases;
}}


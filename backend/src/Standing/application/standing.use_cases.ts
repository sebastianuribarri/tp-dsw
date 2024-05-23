import { IStandingApiRepository, IStandingRepository } from "../domain/standing.repository.js";

export default class StandingUseCases {
    public constructor(
    public competitionApiRepository: IStandingApiRepository,
    public competitionDbRepository: IStandingRepository,
  ) {
    this.competitionApiRepository = competitionApiRepository;
    this.competitionDbRepository = competitionDbRepository;
  }

}
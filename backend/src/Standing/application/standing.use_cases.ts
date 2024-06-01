import IStandingRepository from "../domain/standing.repository.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";

export default class StandingUseCases {
  constructor(
    private readonly competitionApiRepository: IApiRepository<Standing>,
    private readonly competitionDbRepository: IStandingRepository
  ) {}
}

import ApiFootball from "../ApiFootball/api.js";
import IApiRepository from "../Shared/domain/api.repository.js";
import LineUpUseCases from "./application/LineUp.use_cases.js";
import LineUp from "./domain/lineup.entity.js";
import LineUpApiRepository from "./infraestructure/LineUp.repository.api.js";

export default class LineUpApp {
  public readonly lineupUseCases: LineUpUseCases;
  private readonly lineupApiRepository: IApiRepository<LineUp>;

  constructor(private readonly apiFootball: ApiFootball) {
    this.lineupApiRepository = new LineUpApiRepository(this.apiFootball);
    this.lineupUseCases = new LineUpUseCases(this.lineupApiRepository);
  }
}

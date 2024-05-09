import CompetitionUseCases from "../application/competition.use_cases.js";
import { Response, Request } from "express";

export default class CompetitionController {
  constructor(private competitionUseCases: CompetitionUseCases) {
    this.getAll = this.getAll.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.competitionUseCases.getAll();
    res.json(result);
  }
}

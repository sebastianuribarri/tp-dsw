import CompetitionUseCases from "../application/competition.use_cases.js";
import { Response, Request } from "express";

export default class CompetitionController {
  constructor(private readonly competitionUseCases: CompetitionUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.competitionUseCases.listAll();
    res.json(result);
  }

  public async getOne(req: Request, res: Response) {
    console.log(req.params.id);
    const result = await this.competitionUseCases.getCompetition(
      Number(req.params.id)
    );
    res.json(result);
  }
}

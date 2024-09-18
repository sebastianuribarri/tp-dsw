import CompetitionUseCases from "../application/competition.use_cases.js";
import { Response, Request } from "express";

export default class CompetitionController {
  constructor(private readonly competitionUseCases: CompetitionUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getByTeam = this.getByTeam.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    try {
    const result = await this.competitionUseCases.listAll();
    res.json(result); } catch (error) {
        console.log(error);
        res.status(404).send({message: "competitions not founded"});
    }
  }

  public async getOne(req: Request, res: Response) {
    const result = await this.competitionUseCases.getCompetition(
      Number(req.params.id)
    );
    res.json(result);
  }

  public async getByTeam(req: Request, res: Response) {
    const result = await this.competitionUseCases.getCompetitionsByTeam(
      Number(req.params.teamId)
    );
    res.json(result);
  }
}

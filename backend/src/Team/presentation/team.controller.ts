import TeamUseCases from "../application/team.use_cases.js";
import { Response, Request } from "express";

export default class TeamController {
  constructor(private readonly teamUseCases: TeamUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    const result = await this.teamUseCases.listAll();
    res.json(result);
  }

  public async getOne(req: Request, res: Response) {
    const result = await this.teamUseCases.getTeam(
      Number(req.params.id)
    );
    res.json(result);
  }
}

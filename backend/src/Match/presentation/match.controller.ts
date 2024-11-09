import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
import { Response, Request } from "express";
import MatchUseCases from "../application/match.use_cases.js";

export default class MatchController {
  constructor(private readonly matchUseCases: MatchUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getByTeam = this.getByTeam.bind(this);
    this.getLiveMatches = this.getLiveMatches.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    try {
      const result = await this.matchUseCases.listMatches(req.query);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: "matches not founded" });
    }
  }
  public async getByTeam(req: Request, res: Response) {
    try {
      const result = await this.matchUseCases.listMatchesByTeam(
        Number(req.params.id)
      );
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: "matches not founded" });
    }
  }

  public async getOne(req: Request, res: Response) {
    const result = await this.matchUseCases.getMatch(Number(req.params.id));
    res.json(result);
  }

  public async getLiveMatches(req: Request, res: Response) {
    try {
      const result = await this.matchUseCases.listLiveMatches();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: "live matches not found" });
    }
  }
}

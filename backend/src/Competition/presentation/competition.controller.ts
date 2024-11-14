import CompetitionUseCases from "../application/competition.use_cases.js";
import { Response, Request } from "express";

export default class CompetitionController {
  constructor(private readonly competitionUseCases: CompetitionUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getByTeam = this.getByTeam.bind(this);
    this.getBySearch = this.getBySearch.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    try {
    const result = await this.competitionUseCases.listAll();
    res.json(result); } catch (error) {
        console.log(error);
        res.status(404).send({message: "competitions not found"});
    }
  }

  public async getBySearch(req: Request, res: Response) {
    try {
      const searchValue = req.query.search as string;
      if (!searchValue) {
        return res.status(400).json({ message: "Search parameter is required" });
      }
      
      const result = await this.competitionUseCases.getBySearch(searchValue);
      if (!result) {
        return res.status(404).json({ message: "No competitions found" });
      }
      res.json(result);
    } catch (error) {
      if (error instanceof Error && error.message.includes("4 characters")) {
        return res.status(400).json({ message: error.message });
      }
      console.error("Error in getBySearch:", error);
      res.status(500).json({ message: "Internal server error" });
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

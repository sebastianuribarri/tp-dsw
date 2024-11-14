import TeamUseCases from "../application/team.use_cases.js";
import { Response, Request } from "express";

export default class TeamController {
  constructor(private readonly teamUseCases: TeamUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getBySearch = this.getBySearch.bind(this);
  }

  public async getAll(req: Request, res: Response) {
    try {
    const result = await this.teamUseCases.listAll();
    res.json(result); } catch(error) {
        console.log(error);
        res.status(400).send({message: "teams not founded"});
    }
  }

  public async getBySearch(req: Request, res: Response) {
  try {
    const searchValue = req.query.search as string;
    if (!searchValue) {
      return res.status(400).json({ message: "Search parameter is required" });
    }
    
    const result = await this.teamUseCases.getBySearch(searchValue);
    if (!result) {
      return res.status(404).json({ message: "No teams found" });
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
    const result = await this.teamUseCases.getTeam(
      Number(req.params.id)
    );
    res.json(result);
  }
}

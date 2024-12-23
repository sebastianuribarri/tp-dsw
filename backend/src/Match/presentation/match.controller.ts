import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
import { Response, Request } from "express";
import MatchUseCases from "../application/match.use_cases.js";

export default class MatchController {
  constructor(private readonly matchUseCases: MatchUseCases) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getByTeam = this.getByTeam.bind(this);
    this.getLiveMatches = this.getLiveMatches.bind(this);
    this.getBySearch = this.getBySearch.bind(this);
    this.getMatchesByTeams = this.getMatchesByTeams.bind(this);
    this.getCalendar = this.getCalendar.bind(this);
  }

  public async getMatchesByTeams(req: Request, res: Response) {
    try {
      const teamIds = (req.query.teamIds as string).split(",").map(Number); // Convertir a arreglo de números
      const result = await this.matchUseCases.getMatchesByTeams(teamIds);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: "matches not found" });
    }
  }

  public async getCalendar(req: Request, res: Response) {
    try {
      const month = parseInt(req.query.month as string, 10);
      const teamIds = (req.query.teamIds as string).split(",").map(Number);

      if (isNaN(month) || !Array.isArray(teamIds) || teamIds.some(isNaN)) {
        return res.status(400).send({ message: "Invalid parameters" });
      }

      const result = await this.matchUseCases.getCalendar(month, teamIds);
      res.json(result);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving calendar" });
    }
  }

  public async getAll(req: Request, res: Response) {
    try {
      console.log("matches params", req.query);

      const result = await this.matchUseCases.listMatches(req.query);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: "matches not found" });
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
      res.status(404).send({ message: "matches not found" });
    }
  }

  public async getBySearch(req: Request, res: Response) {
    try {
      const searchValue = req.query.search as string;
      if (!searchValue) {
        return res
          .status(400)
          .json({ message: "Search parameter is required" });
      }

      const result = await this.matchUseCases.getBySearch(searchValue);
      if (!result) {
        return res.status(404).json({ message: "No matches found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
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

import { League } from "../interfaces/league.interface.js";

export interface ILeagueService {
  getAll(): Promise<League[] | void>;
}

export class LeagueController {
  service: ILeagueService;

  public constructor(public leagueService: ILeagueService) {
    this.service = leagueService;
  }

  public async getAll(req: any, res: any) {
    const result = await this.service.getAll();
    res.json(result);
  }
}

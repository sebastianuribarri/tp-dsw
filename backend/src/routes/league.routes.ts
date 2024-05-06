export interface ILeagueController {
  getAll: (req: any, res: any) => Promise<void>;
}

export class LeagueRoutes {
  leagueController: ILeagueController;
  public constructor(leagueController: ILeagueController) {
    this.leagueController = leagueController;
  }
  public async createRoutes(app: any) {
    app.get("/leagues", (req: any, res: any) =>
      this.leagueController.getAll(req, res)
    );
  }
}

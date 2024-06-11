import StandingUseCases from "../application/standing.use_cases.js";
import Standing from "../domain/standing.entity.js";

import { Response, Request } from "express";


export default class standingsController {
  constructor(private standingUseCases: StandingUseCases) {

    this.standingUseCases = standingUseCases;
     this.getStandingsByCompetition = this.getStandingsByCompetition.bind(this);
     this.getStandingsByTeam = this.getStandingsByTeam.bind(this);
}


public async getStandingsByCompetition(req: Request, res: Response) {
  const result = await this.standingUseCases.listStandingsByCompetition (Number(req.params.competitionId));


}

public async getStandingsByTeam (req: Request, res: Response) {
  const result = await this.standingUseCases.listStandingsByTeam( Number(req.params.teamId));

}

}
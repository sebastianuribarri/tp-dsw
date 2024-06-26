import { Express } from "express";
import express from "express";
import dbInit from "./Shared/infrastructure/db.js";
import CompetitionApp from "./Competition/competition.app.js";
import UserApp from "./User/user.app.js";
import TeamApp from "./Team/team.app.js";
import StandingApp from "./Standing/standing.app.js";
import MongoDatabase from "./Shared/infrastructure/db.js";

export default class App {
  server: Express;

  // contained apps
  competitionApp: CompetitionApp;
  userApp: UserApp;
  teamApp: TeamApp;
  standingApp: StandingApp;
  playerApp: any;
  matchApp: any;
  eventApp: any;
  formationApp: any;
  voteApp: any;
  predicitionApp: any;

  constructor(server: Express) {
    this.server = server;

    // apps setup
    this.competitionApp = new CompetitionApp(server);
    this.userApp = new UserApp(this.server);
    this.teamApp = new TeamApp(this.server);
    this.standingApp = new StandingApp(this.competitionApp, this.server);
  }

  public run(port: number, dbConnection: () => Promise<void>) {
    dbConnection().then();
    this.server.listen(port, () => {
      console.log("escuchando...", port);
    });
  }
}

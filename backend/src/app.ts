import { Express } from "express";
import CompetitionApp from "./Competition/competition.app.js";
import UserApp from "./User/user.app.js";
import TeamApp from "./Team/team.app.js";
import StandingApp from "./Standing/standing.app.js";
import PlayerApp from "./Player/player.app.js";
import PredictionApp from "./Prediction/prediction.app.js";
import VoteApp from "./Vote/vote.app.js";
import ApiFootball from "./Shared/infrastructure/api-connection.js";

export default class App {
  server: Express;
  apiFootball: ApiFootball;

  // contained apps
  competitionApp: CompetitionApp;
  userApp: UserApp;
  teamApp: TeamApp;
  public standingApp: StandingApp;
  playerApp: any;
  matchApp: any;
  eventApp: any;
  formationApp: any;
  voteApp: any;
  predictionApp: PredictionApp;

  constructor(server: Express, apiFootball: ApiFootball) {
    this.server = server;
    this.apiFootball = apiFootball;

    // apps setup
    this.standingApp = new StandingApp(this.apiFootball);
    this.playerApp = new PlayerApp(this.apiFootball);
    this.competitionApp = new CompetitionApp(
      this.standingApp,
      this.apiFootball,
      this.server
    );
    this.userApp = new UserApp(this.server);
    this.teamApp = new TeamApp(this.server, this.apiFootball, this.playerApp);
    this.predictionApp = new PredictionApp(this.server);
    this.voteApp = new VoteApp(this.server);
  }

  public run(port: number, dbConnection: () => Promise<void>) {
    dbConnection().then();
    this.server.listen(port, () => {
      console.log("escuchando...", port);
    });
  }
}

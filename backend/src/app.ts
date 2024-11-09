import { Express } from "express";
import CompetitionApp from "./Competition/competition.app.js";
import UserApp from "./User/user.app.js";
import TeamApp from "./Team/team.app.js";
import StandingApp from "./Standing/standing.app.js";
import PlayerApp from "./Player/player.app.js";
import PredictionApp from "./Prediction/prediction.app.js";
import VoteApp from "./Vote/vote.app.js";
import ApiFootball from "./ApiFootball/api.js";
import LineUpApp from "./LineUp/lineup.app.js";
import EventApp from "./Event/event.app.js";
import MatchApp from "./Match/match.app.js";

export default class App {
  server: Express;
  apiFootball: ApiFootball;

  // contained apps
  competitionApp: CompetitionApp;
  userApp: UserApp;
  teamApp: TeamApp;
  public standingApp: StandingApp;
  playerApp: any;
  matchApp: MatchApp;
  eventApp: EventApp;
  lineUpApp: LineUpApp;
  formationApp: any;
  voteApp: any;
  predictionApp: PredictionApp;

  constructor(server: Express, apiFootball: ApiFootball) {
    this.server = server;
    this.apiFootball = apiFootball;

    // apps setup
    this.userApp = new UserApp(this.server);

    this.playerApp = new PlayerApp(this.apiFootball);

    this.teamApp = new TeamApp(this.server, this.playerApp);

    this.standingApp = new StandingApp(this.apiFootball, this.teamApp);

    this.competitionApp = new CompetitionApp(
      this.standingApp,
      this.apiFootball,
      this.server
    );

    this.predictionApp = new PredictionApp(this.server);

    this.voteApp = new VoteApp(this.server);

    this.eventApp = new EventApp(this.apiFootball);

    this.lineUpApp = new LineUpApp(this.apiFootball);

    this.matchApp = new MatchApp(
      this.eventApp,
      this.lineUpApp,
      this.competitionApp,
      this.apiFootball,
      this.server
    );
  }

  public run(port: number) {
    this.server.listen(port, async () => {
      console.log("escuchando...", port);
      await this.competitionApp.setup();
    });
  }
}

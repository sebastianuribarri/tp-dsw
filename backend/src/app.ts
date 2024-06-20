import express from "express";

import dbInit from "./Shared/infrastructure/db.js";
import CompetitionApp from "./Competition/competition.app.js";
import UserApp from "./User/user.app.js";
import TeamApp from "./Team/team.app.js";
import StandingApp from "./Standing/standing.app.js";

export async function main() {
  const server = express();
  server.use(express.json());

  // para cada Entidad

  const competitionApp = new CompetitionApp(server);
  const userApp = new UserApp(server);
  const teamApp = new TeamApp(server);
  const standingApp = new StandingApp(competitionApp, teamApp, server);

  dbInit().then();
  server.listen(5000, () => {
    console.log("escuchando...", 5000);
  });
}

main();

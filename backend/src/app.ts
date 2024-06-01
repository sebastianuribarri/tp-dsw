import express from "express";

import dbInit from "./Shared/infrastructure/db.js";
import CompetitionsApp from "./Competition/competition.app.js";
import UsersApp from "./User/user.app.js";

export async function main() {
  const server = express();
  server.use(express.json());

  // para cada Entidad

  const competitionApp = new CompetitionsApp(server);
  const userApp = new UsersApp(server);

  dbInit().then();
  server.listen(5000, () => {
    console.log("escuchando...", 5000);
  });
}

main();

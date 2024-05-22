import express from "express";

import dbInit from "./shared/middlewares/db.js";
import CompetitionsApp from "./Competition/competition.app.js";

export async function main() {
  const server = express();
  server.use(express.json());

  // para cada Entidad

  const competitionsApp = new CompetitionsApp(server);

  dbInit().then();
  server.listen(5000, () => {
    console.log("escuchando...", 5000);
  });
}

main();

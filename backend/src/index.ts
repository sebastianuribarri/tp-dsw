import express from "express";

import { competitionRouter } from "./Competition/presentation/competition.routes.js";
import dbInit from "./shared/middlewares/db.js";

export async function main() {
  const app = express();
  app.use(express.json());

  // para cada Entidad
  app.use("/api/competitions", competitionRouter);

  dbInit().then();
  app.listen(5000, () => {
    console.log("escuchando...", 5000);
  });
}

main();

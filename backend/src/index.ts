import express from "express";

import { competitionRouter } from "./Competition/presentation/competition.routes.js";

export async function main() {
  const app = express();
  app.use(express.json());

  app.use("/api/competitions", competitionRouter);

  app.listen(5000, () => {
    console.log("escuchando...", 5000);
  });
}

main();

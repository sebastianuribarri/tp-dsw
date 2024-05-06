import express from "express";

import { LeagueRoutes } from "./routes/league.routes.js";
import { LeagueController } from "./controllers/league.controller.js";
import { LeagueService } from "./services/league.service.js";
import { LeagueMongoRepository } from "./repositories/db/league.repository.js";
import { LeagueApiRepository } from "./repositories/football-api/league.api-repository.js";

export async function main() {
  const app = express();
  app.use(express.json());

  const leagueApiRepository = new LeagueApiRepository();
  const leagueMongoRepository = new LeagueMongoRepository();
  const leagueService = new LeagueService(
    leagueApiRepository,
    leagueMongoRepository
  );
  const leagueController = new LeagueController(leagueService);
  const leagueRoutes = new LeagueRoutes(leagueController);
  leagueRoutes.createRoutes(app);

  app.listen(5000, () => {
    console.log("escuchando...", 5000);
  });
}

main();

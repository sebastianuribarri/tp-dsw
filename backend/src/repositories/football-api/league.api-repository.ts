import { apiResponse } from "../../middlewares/api-football.js";

import { League } from "../../interfaces/league.interface.js";
import { leagueFormatter } from "../../utils/formatters/league.formatter.js";

export class LeagueApiRepository {
  public async getAll(): Promise<[League] | void> {
    try {
      const response = await apiResponse(
        "leagues?country=argentina&current=true"
      );
      return leagueFormatter(response);
    } catch (err) {
      console.log("ocurrio un error");
      new Error("Error en la consulta a API");
    }
  }
}

import IApiRepository from "../../Shared/domain/api.repository.js";
import { ApiResponse } from "../../Shared/infrastructure/api_response.js";
import { apiResponse } from "../../Shared/infrastructure/api-football.js";
import LineUp, { PlayerLineUp } from "../domain/lineup.entity.js";


export default class  LineUpApiRepository implements IApiRepository <LineUp> {
    public async findAll(parameters?: object): Promise<LineUp[] | null > {
      const res = await apiResponse ("fixtures/lineups", parameters);
      if (!res ) {
          return null
      }
      const apiLineUps = res.response[0].lineups.map(
          (lineup) =>
              new LineUp (lineup)
              );
      return apiLineUps;
    }
}
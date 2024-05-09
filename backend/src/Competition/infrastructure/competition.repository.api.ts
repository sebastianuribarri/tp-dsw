import { apiResponse } from "../../shared/middlewares/api-football.js";
import { ICompetitionApiRepository } from "../domain/competition.repository.js";
import Competition from "../domain/competiton.entity.js";
export default class CompetitionApiRepository
  implements ICompetitionApiRepository
{
  public async findAll() {
    const res = await apiResponse("leagues?country=Argentina&current=true");
    const apiCompetitions = res.response.map((elem) => new Competition(elem));
    return apiCompetitions;
  }
}

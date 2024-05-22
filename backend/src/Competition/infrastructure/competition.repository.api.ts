import { apiResponse } from "../../shared/middlewares/api-football.js";
import { ICompetitionApiRepository } from "../domain/competition.repository.js";
import Competition from "../domain/competiton.entity.js";
import ICompetition from "../domain/competition.js";

export default class CompetitionApiRepository
  implements ICompetitionApiRepository
{
  public async findAll(): Promise<ICompetition[] | null> {
    const res = await apiResponse("leagues?country=Argentina&current=true");
    const apiCompetitions = res.response.map(
      (elem) =>
        new Competition({
          id: elem.league.id,
          start: elem.seasons[0].start,
          name: elem.league.name,
          type: elem.league.type,
          logo: elem.league.logo,
        })
    );
    return apiCompetitions;
  }
}

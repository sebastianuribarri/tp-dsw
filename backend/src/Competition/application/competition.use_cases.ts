import IApiRepository from "../../Shared/domain/api.repository.js";
import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionsTimmer from "../domain/competition.timmer.js";
import Competition, {
  CompetitionDetail,
} from "../domain/competition.entity.js";
import StandingUseCases from "../../Standing/application/standing.use_cases.js";
import IMatchRepository from "../../Match/domain/match.repository.js";

const REGIONS = ["Argentina", "World"];
// const REGIONS = ["Argentina"];
export default class CompetitionUseCases {
  public constructor(
    private readonly competitionApiRepository: IApiRepository<Competition>,
    private readonly competitionDbRepository: ICompetitionRepository,
    private readonly matchDbRepository: IMatchRepository,
    private readonly standingUseCases: StandingUseCases
  ) {}

  public async needUpdate() {
    console.log(
      `Competitions ------------------------------------------------------------------------------`
    );
    const competitionTimmer = await CompetitionsTimmer.getInstance();
    if (competitionTimmer.competitionsUpdated()) return false;
    const apiCompetitionsPromises = REGIONS.map(async (region) => {
      return await this.competitionApiRepository.findAll({
        country: region,
        current: true,
      });
    });
    if (apiCompetitionsPromises.some((regionCompetions) => !regionCompetions))
      return false;
    const competitionsResults = await Promise.all(apiCompetitionsPromises);

    const apiCompetitions = competitionsResults.flat();
    this.updateCompetitions(apiCompetitions);
    await competitionTimmer.updateTimmer();
    return apiCompetitions;
  }

  public async listAll() {
    const newData = await this.needUpdate();

    if (newData) return newData;

    return await this.competitionDbRepository.findAll();
  }

  public async getBySearch(value: string) {
    return await this.competitionDbRepository.findAll({ search: value });
  }

  public async getCompetition(id: number) {
    await this.needUpdate();
    let competitionDetail = await this.competitionDbRepository.findById(id);
    competitionDetail.rounds =
      (await this.getRoundsByCompetitionId(id)) ?? null;
    const newStandings = await this.standingUseCases.needUpdate(
      competitionDetail
    );
    if (newStandings) {
      competitionDetail.standings = newStandings;
      await this.updateCompetition(competitionDetail);
    }

    return competitionDetail;
  }

  private async getRoundsByCompetitionId(
    competitionId: number
  ): Promise<string[] | null> {
    return await this.matchDbRepository.findRoundsByCompetitionId(
      competitionId
    );
  }

  public async getCompetitionsByTeam(teamId: number) {
    return await this.competitionDbRepository.findAll({
      "standings.team.id": teamId,
    });
  }

  private async updateCompetitions(apiCompetitions: Competition[]) {
    // get database competitions
    let dbCompetitions = await this.competitionDbRepository.findAll();

    // update data on database
    apiCompetitions.forEach((apiCompetition) => {
      let founded = false;
      dbCompetitions.forEach(async (dbCompetition, i) => {
        if (dbCompetition.id === apiCompetition.id) {
          if (apiCompetition.start != dbCompetition.start) {
            await this.deleteCompetition(dbCompetition.id);
            await this.createCompetition(apiCompetition);
          }
          dbCompetitions.splice(i, 1);
          founded = true;
        }
      });
      if (!founded) this.createCompetition(apiCompetition);
    });
  }

  public async createCompetition(competition: Competition) {
    let newCompetitionStandings = await this.standingUseCases.needCreation(
      competition
    );
    let competitionDetail: CompetitionDetail;
    if (newCompetitionStandings) {
      competitionDetail = new CompetitionDetail(
        competition,
        newCompetitionStandings
      );
    } else {
      competitionDetail = new CompetitionDetail(competition, [], []);
    }
    return await this.competitionDbRepository.insertOne(competitionDetail);
  }

  public async updateCompetition(newCompetition: Competition) {
    return await this.competitionDbRepository.updateOne(
      newCompetition.id,
      newCompetition
    );
  }

  public async deleteCompetition(id: number) {
    return await this.competitionDbRepository.deleteOne(id);
  }
}

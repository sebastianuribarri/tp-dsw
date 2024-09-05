import IApiRepository from "../../Shared/domain/api.repository.js";
import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionsTimmer from "../domain/competition.timmer.js";
import Competition, { CompetitionDetail } from "../domain/competiton.entity.js";
import StandingUseCases from "../../Standing/application/standing.use_cases.js";

// const REGIONS = ["Argentina", "World"];
const REGIONS = ["Argentina"];
export default class CompetitionUseCases {
  private competitionsTimmer: CompetitionsTimmer;
  public constructor(
    private readonly competitionApiRepository: IApiRepository<Competition>,
    private readonly competitionDbRepository: ICompetitionRepository,
    private readonly standingUseCases: StandingUseCases
  ) {}

  public async getCompetitionsTimmer() {
    this.competitionsTimmer = new CompetitionsTimmer();
    await this.competitionsTimmer.createTimmer();
  }

  public async needUpdate() {
    console.log(
      `Competitions ------------------------------------------------------------------------------`
    );
    if (!this.competitionsTimmer) await this.getCompetitionsTimmer();
    if (this.competitionsTimmer.competitionsUpdated()) return false;
    const apiCompetitionsPromises = REGIONS.map(async (region) => {
      return await this.competitionApiRepository.findAll({
        country: region,
        current: true,
      });
    });
    const competitionsResults = await Promise.all(apiCompetitionsPromises);

    const apiCompetitions = competitionsResults.flat();
    this.updateCompetitions(apiCompetitions);
    await this.competitionsTimmer.updateTimmer();
    return apiCompetitions;
  }

  public async listAll() {
    const newData = await this.needUpdate();

    if (newData) return newData;

    return await this.competitionDbRepository.findAll();
  }

  public async getCompetition(id: number) {
    await this.needUpdate();
    let competitionDetail = await this.competitionDbRepository.findById(id);

    const newStandings = await this.standingUseCases.needUpdate(
      competitionDetail
    );
    if (newStandings) {
      competitionDetail.standings = newStandings;
      await this.updateCompetition(competitionDetail);
    }

    return competitionDetail;
  }

  public async getCompetitionsByTeam(teamId: number) {
    const competitions = await this.listAll();
    for (let competition of competitions) {
      let newCompetitionStandings = await this.standingUseCases.needCreation(
        competition
      );
      if (newCompetitionStandings) {
        let competitionDetail = new CompetitionDetail(
          competition,
          newCompetitionStandings
        );
        await this.updateCompetition(competitionDetail);
      }
    }

    return await this.competitionDbRepository.findAll({
      "standings.team.id": teamId,
    });
  }

  public async createCompetition(competition: Competition) {
    const competitionDetail = new CompetitionDetail(competition, []);
    return await this.competitionDbRepository.insertOne(competitionDetail);
  }

  private async updateCompetitions(apiCompetitions: Competition[]) {
    // get database competitions
    let dbCompetitions = await this.competitionDbRepository.findAll();

    // update data on database
    apiCompetitions.forEach((apiCompetition) => {
      let founded = false;
      dbCompetitions.forEach((dbCompetition, i) => {
        if (dbCompetition.id === apiCompetition.id) {
          if (apiCompetition.start != dbCompetition.start) {
            this.updateCompetition(apiCompetition);
          }
          dbCompetitions.splice(i, 1);
          founded = true;
        }
      });
      if (!founded) this.createCompetition(apiCompetition);
    });
  }

  public async updateCompetition(newCompetition: Competition) {
    return await this.competitionDbRepository.updateOne(
      newCompetition.id,
      newCompetition
    );
  }
}

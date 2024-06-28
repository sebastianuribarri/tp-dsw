import IApiRepository from "../../Shared/domain/api.repository.js";
import ICompetitionRepository from "../domain/competition.repository.js";
import GlobalCompetitions from "../domain/competition.timmer.js";
import CompetitionsTimmer from "../domain/competition.timmer.js";
import Competition, { CompetitionDetail } from "../domain/competiton.entity.js";
import StandingUseCases from "./standing.use_cases.js";

export default class CompetitionUseCases {
  private readonly competitionsTimmer: GlobalCompetitions;
  public constructor(
    private readonly competitionApiRepository: IApiRepository<Competition>,
    private readonly competitionDbRepository: ICompetitionRepository,
    private readonly standingUseCases: StandingUseCases
  ) {
    this.competitionsTimmer = new GlobalCompetitions();
    this.competitionsTimmer.createTimmer();
  }

  public async needUpdate() {
    if (this.competitionsTimmer.competitionsUpdated()) return false;
    const apiCompetitions = await this.competitionApiRepository.findAll({
      country: "Argentina",
      current: true,
    });
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
    let competition: Competition;
    let competitionDetail: CompetitionDetail;
    const newCompetitions = await this.needUpdate();
    competitionDetail = await this.competitionDbRepository.findById(id);

    const newStandings = await this.standingUseCases.needUpdate(
      competitionDetail
    );
    if (newStandings) {
      competitionDetail.standings = newStandings;
      await this.updateCompetition(competitionDetail);
    }

    return competitionDetail;
  }

  public async createCompetition(competition: Competition) {
    return await this.competitionDbRepository.insertOne(competition);
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
            this.updateCompetition(apiCompetition, dbCompetition);
          }
          dbCompetitions.splice(i, 1);
          founded = true;
        }
      });
      if (!founded) this.createCompetition(apiCompetition);
    });
  }

  public async updateCompetition(
    newCompetition: Competition,
    oldCompetition?: Competition
  ) {
    return await this.competitionDbRepository.updateOne(
      newCompetition.id,
      newCompetition
    );
  }
}

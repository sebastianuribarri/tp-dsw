import IApiRepository from "../../Shared/domain/api.repository.js";
import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionsTimmerHandler from "../domain/competition.timmer.js";
import CompetitionsTimmer from "../domain/competition.timmer.js";
import Competition from "../domain/competiton.entity.js";

export default class CompetitionUseCases {
  private readonly competitionsTimmerHandler: CompetitionsTimmerHandler;
  public constructor(
    private readonly competitionApiRepository: IApiRepository<Competition>,
    private readonly competitionDbRepository: ICompetitionRepository
  ) {
    this.competitionsTimmerHandler = new CompetitionsTimmerHandler();
    this.competitionsTimmerHandler.createTimmer();
  }

  public async needUpdate() {
    if (this.competitionsTimmerHandler.competitionsUpdated()) return false;
    const apiCompetitions = await this.competitionApiRepository.findAll({
      country: "Argentina",
      current: true,
    });
    this.updateCompetitions(apiCompetitions);
    await this.competitionsTimmerHandler.updateTimmer();
    return apiCompetitions;
  }

  public async listAll() {
    const newData = await this.needUpdate();

    if (newData) return newData;

    return await this.competitionDbRepository.findAll();
  }

  public async getCompetition(id: number) {
    const newData = await this.needUpdate();

    if (newData) return newData.find((comp) => comp.id === id);

    return await this.competitionDbRepository.findById(id);
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
    if (oldCompetition) {
      if (oldCompetition.start != newCompetition.start)
        newCompetition.standingsTimmer.resetUpdate();
    }
    return await this.competitionDbRepository.updateOne(
      newCompetition.id,
      newCompetition
    );
  }
}

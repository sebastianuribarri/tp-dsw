import IApiRepository from "../../Shared/domain/api.repository.js";
import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionsTimmer from "../domain/competition.timmer.js";
import Competition from "../domain/competiton.entity.js";

export default class CompetitionUseCases {
  private readonly competitionsTimmer: CompetitionsTimmer;
  public constructor(
    private readonly competitionApiRepository: IApiRepository<Competition>,
    private readonly competitionDbRepository: ICompetitionRepository
  ) {
    this.competitionsTimmer = new CompetitionsTimmer();
  }
  /**
   * @todo validacion de errores
   */
  private async updateCompetitionsData(newData: Competition[]) {
    // get database competitions
    let oldData = await this.competitionDbRepository.findAll();

    // update data on database
    if (newData && oldData) {
      // apiCompetitions loop
      newData.forEach((apiCompetition) => {
        let founded = false;
        // dbCompetitions loop
        oldData.forEach((dbCompetition, i) => {
          if (dbCompetition.id === apiCompetition.id) {
            if (apiCompetition != dbCompetition) {
              this.updateCompetition(dbCompetition.id, apiCompetition);
            }
            oldData.splice(i, 1);
            founded = true;
          }
        });
        if (!founded) {
          this.createCompetition(apiCompetition);
        }
      });
    }
  }

  public async needUpdate() {
    if (this.competitionsTimmer.updated) {
      return false;
    } else {
      const apiCompetitions = await this.competitionApiRepository.findAll({
        country: "Argentina",
        current: true,
      });
      const result = this.updateCompetitionsData(apiCompetitions);
      // no hay errores
      if (!(result instanceof Error)) {
        this.competitionsTimmer.setUpdate();
      }
      return apiCompetitions;
    }
  }

  public async listAll() {
    const newData = await this.needUpdate();
    if (newData) {
      return newData;
    } else {
      return await this.competitionDbRepository.findAll();
    }
  }

  public async getCompetition(id: number) {
    const newData = await this.needUpdate();
    if (newData) {
      return newData.find((comp) => comp.id === id);
    } else {
      return await this.competitionDbRepository.findById(id);
    }
  }

  public async createCompetition(competition: Competition) {
    return await this.competitionDbRepository.insertOne(competition);
  }

  public async updateCompetition(
    competitionId: number,
    newCompetitionData: Competition
  ) {
    return await this.competitionDbRepository.updateOne(
      competitionId,
      newCompetitionData
    );
  }
}

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

  private async getNewCompetitionsData() {
    const apiCompetitions = await this.competitionApiRepository.findAll({
      country: "Argentina",
      current: true,
    });
    let dbCompetitions = await this.competitionDbRepository.findAll();

    if (apiCompetitions && dbCompetitions) {
      // apiCompetitions loop
      apiCompetitions.forEach((apiCompetition) => {
        let founded = false;
        // dbCompetitions loop
        dbCompetitions.forEach((dbCompetition, i) => {
          if (dbCompetition.id === apiCompetition.id) {
            if (apiCompetition != dbCompetition) {
              this.updateCompetition(dbCompetition.id, apiCompetition);
            }
            dbCompetitions.splice(i, 0);
            founded = true;
          }
        });

        if (!founded) {
          this.createCompetition(apiCompetition);
        }
      });
      this.competitionsTimmer.setUpdate();
      return apiCompetitions;
    }
  }

  public async listAll() {
    const updated = this.competitionsTimmer.updated;
    if (updated) {
      return await this.competitionDbRepository.findAll();
    } else {
      return await this.getNewCompetitionsData();
    }
  }

  public async getCompetition(id: number) {
    const competitionsUpdated = this.competitionsTimmer.updated;
    let competition: Competition | null;
    if (competitionsUpdated) {
      // si las Competitions estan actualizadas
      competition = await this.competitionDbRepository.findById(id);
    } else {
      // sino, actualizar el listado
      const updatedCompetitions = await this.getNewCompetitionsData();
      competition = updatedCompetitions.find((comp) => comp.id === id);
    }
    return competition;
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

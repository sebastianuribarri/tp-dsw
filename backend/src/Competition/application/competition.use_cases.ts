import ICompetition from "../domain/competition.js";
import {
  ICompetitionApiRepository,
  ICompetitionRepository,
} from "../domain/competition.repository.js";

export default class CompetitionUseCases {
  public constructor(
    public competitionApiRepository: ICompetitionApiRepository,
    public competitionDBRepository: ICompetitionRepository
  ) {}

  private async getNewCompetitionsData() {
    const apiCompetitions = await this.competitionApiRepository.findAll();
    let mongoCompetitions = await this.competitionDBRepository.findAll();

    if (apiCompetitions && mongoCompetitions) {
      for (let i = 0; i < apiCompetitions.length; i++) {
        let founded = false;
        for (let j = 0; j < mongoCompetitions.length; j++) {
          if (apiCompetitions[i].id === mongoCompetitions[j].id) {
            if (apiCompetitions[i].start != mongoCompetitions[j].start) {
              // distintas fechas => actualiza competencia con datos de la nueva temporada
              this.updateCompetitionSeason(
                mongoCompetitions[j],
                apiCompetitions[i].start
              );
            }
            // fechas iguales => no hay cambios, se deja como esta

            founded = true;
            // cuando se encuentra la competencia, se elimina la instancia de la mongoCompetitions,
            // para que no siga comparandola con las demas instancias de apiCompetitions
            mongoCompetitions.splice(j, 1);
            break;
          }
        }
        if (!founded) {
          this.createCompetition(apiCompetitions[i]);
        }
      }
    }
    return apiCompetitions;
  }
  public async getAll() {
    const updated = false; // getTimer('competitions')
    if (updated) {
      const competitions = await this.competitionDBRepository.findAll();
      return competitions;
    } else {
      return await this.getNewCompetitionsData();
    }
  }

  public async getDetailedCompetition(id: number) {
    const updated = false;
    if (updated) {
      return await this.competitionDBRepository.findById(id);
    } else {
      const updatedCompetitions = await this.getNewCompetitionsData();
      const competition = updatedCompetitions.find((comp) => comp.id === id);
      return competition;
    }
  }

  public async createCompetition(competition: ICompetition) {
    const competitionCreated = await this.competitionDBRepository.insertOne(
      competition
    );
    return competitionCreated;
  }

  public async updateCompetitionSeason(
    oldCompetition: ICompetition,
    seasonStart: Date
  ) {
    const competitionUpdated = await this.competitionDBRepository.updateOne(
      oldCompetition,
      { start: seasonStart }
    );
    return competitionUpdated;
  }
}

import ICompetition from "../domain/competition.js";
import CompetitionRepository from "../domain/competition.repository.js";
import Competition from "../domain/competiton.entity.js";

export default class CompetitionUseCases {
  public constructor(
    public competitionApiRepository: CompetitionRepository,
    public competitionMongoRepository: CompetitionRepository
  ) {}

  public async getAll() {
    const updated = false; // getTimer('competitions')
    if (updated) {
      const competitions = await this.competitionMongoRepository.findAll();
      return competitions;
    } else {
      const apiCompetitions = await this.competitionApiRepository.findAll();
      const mongoCompetitions = await this.competitionMongoRepository.findAll();

      if (apiCompetitions && mongoCompetitions) {
        for (let i = 0; i < apiCompetitions.length; i++) {
          let founded = false;
          for (let j = 0; j < mongoCompetitions.length; j++) {
            console.log("compara:", apiCompetitions[i], mongoCompetitions[j]);
            if (apiCompetitions[i].id === mongoCompetitions[j].id) {
              // verificar fecha inicio
              // seasons distintas => this.createCompetition(apiCompetitions[i]);
              // season iguales
              console.log("founded");
              founded = true;
              break;
            }
          }
          if (!founded) {
            console.log("create competition:", apiCompetitions[i]);
            // this.createCompetition(apiCompetitions[i]);
          }
        }
      }
      return apiCompetitions;
    }
  }
  public async createCompetition(competition: ICompetition) {
    const competitionCreated = await this.competitionMongoRepository.insertOne(
      competition
    );
    return competitionCreated;
  }
}

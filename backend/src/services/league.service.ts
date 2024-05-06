import { error } from "console";
import { League } from "../interfaces/league.interface.js";

export interface IMongoRepository {
  getAll(): Promise<League[] | void>;
}

export interface IApiRepository {
  getAll(): Promise<League[] | void>;
}

export class LeagueService {
  apiRepository: IApiRepository;
  competitionMongoRepo: IMongoRepository;

  public constructor(
    public leagueApiRepository: IApiRepository,
    public leagueMongoRepository: IMongoRepository
  ) {
    this.apiRepository = leagueApiRepository;
    this.competitionMongoRepo = leagueMongoRepository;
  }

  public async getAll() {
    const updated = false; // getTimer('competitions')
    if (updated) {
      const competitions = await this.competitionMongoRepo.getAll();
      return competitions;
    } else {
      const apiCompetitions = await this.apiRepository.getAll();
      const mongoCompetitions = await this.competitionMongoRepo.getAll();

      if (apiCompetitions && mongoCompetitions) {
        for (let i = 0; i <= apiCompetitions.length; i++) {
          let founded = false;
          for (let j = 0; j <= mongoCompetitions.length; j++) {
            if (apiCompetitions[i].id === mongoCompetitions[j].id) {
              // verificar fecha inicio
              // seasons distintas => this.createCompetition(apiCompetitions[i]);
              // season iguales
              console.log("founded", mongoCompetitions[j]);
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
  // public async createCompetition(apiComp: League) {}
}

import IStandingRepository from "../domain/standing.repository.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";
import { NumericType } from "mongodb";
import Competition from "../../Competition/domain/competiton.entity.js";

export default class StandingUseCases {
  constructor(
    private readonly standingApiRepository: IApiRepository<Standing>,
    private readonly standingDbRepository: IStandingRepository
  ) {}
   private async getNewStandingsData(competition: number) {
    const apiStandings = await this.standingApiRepository.findAll({league: competition});
    let dbStandings = await this.standingDbRepository.findMany({competition: competition});

    if (apiStandings && dbStandings) {
      // apiStandings loop
      apiStandings.forEach((apiStanding) => {
        let founded = false;
        // dbStandings loop
        dbStandings.forEach((dbStanding, i) => {
          if (dbStanding.competition === apiStanding.competition && dbStanding.team.id === apiStanding.team.id) {
            if (apiStanding != dbStanding) {
              this.updateStanding( apiStanding);
            }
            dbStandings.splice(i, 1);
            founded = true;
          }
        });

        if (!founded) {
          this.createStandings(apiStandings);
        }
      });
     // this.standingsTimmer.setUpdate();
      return apiStandings;
    }
  }

  public async listStandingsByCompetition(competitionId: number) {
    const updated = false;
    if (updated) {
      return await this.standingDbRepository.findMany({competition: competitionId});
    } else {
      return await this.getNewStandingsData(competitionId);
    }
  }

  public async listStandingsByTeam(teamID: number) {
    return await this.standingDbRepository.findMany({team: teamID});
  }

  public async createStandings(standings: Standing[]) {
    return await this.standingDbRepository.insertMany(standings);
  }

  public async updateStanding(
    standing: Standing 
  ) {
    return await this.standingDbRepository.updateOne(
     standing.competition, standing.team.id , standing
    );
  }
}




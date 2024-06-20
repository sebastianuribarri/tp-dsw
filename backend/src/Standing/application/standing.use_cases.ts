import IStandingRepository from "../domain/standing.repository.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";
import { NumericType } from "mongodb";
import Competition from "../../Competition/domain/competiton.entity.js";
import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
import CompetitionStandingsTimmer from "../domain/standing.timmer.js";

export default class StandingUseCases {
  constructor(
    private readonly standingApiRepository: IApiRepository<Standing>,
    private readonly standingDbRepository: IStandingRepository,
    private readonly competitionUseCases: CompetitionUseCases
  ) {}

  public async findCompetitionTeams(competition: Competition) {
    // check if the standings of the competition exist or not
    const competitionStandingsExists = CompetitionStandingsTimmer.existUpdate(
      competition.id,
      competition.season
    );
    //  - if it not exist, they are created
    if (!competitionStandingsExists) {
      const apiCompetitionStandings = await this.standingApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });

      await this.createCompetitionStandings(
        competition,
        apiCompetitionStandings
      );
      return apiCompetitionStandings;
    } else {
      return await this.standingDbRepository.findMany({
        competition: competition,
      });
    }
  }

  public async needUpdate(competition: Competition) {
    // check if the competition standings need update
    const competitionStandingsUpdated = CompetitionStandingsTimmer.isUpdated(
      competition.id,
      competition.season
    );
    // if they are updated, return false
    if (competitionStandingsUpdated) return false;

    // if they need update:
    //   - seach all on the api repository
    const apiCompetitionStandings = await this.standingApiRepository.findAll({
      league: competition.id,
      season: competition.season,
    });
    // check if there are standings
    if (apiCompetitionStandings.length === 0) return null;

    for (let standing of apiCompetitionStandings) {
      standing.competition = competition;
    }
    //   - update on database
    // check if the competition standings exist or not
    const competitionStandingsExist = CompetitionStandingsTimmer.existUpdate(
      competition.id,
      competition.season
    );
    if (!competitionStandingsExist) {
      //    if they not exist, they are created
      await this.createCompetitionStandings(
        competition,
        apiCompetitionStandings
      );
    } else {
      //    if they exist, they are updated
      await this.updateCompetitionStandings(
        competition.id,
        apiCompetitionStandings
      );
    }

    //  - return the new data and set update with the actual date
    CompetitionStandingsTimmer.setUpdate(competition.id, competition.season);
    return apiCompetitionStandings;
  }

  public async listStandingsByCompetition(competitionId: number) {
    const competition = await this.competitionUseCases.getCompetition(
      competitionId
    );
    const newCompetitionStandingsData = await this.needUpdate(competition);

    if (newCompetitionStandingsData) return newCompetitionStandingsData;

    return await this.standingDbRepository.findMany({
      competition: competition,
    });
  }

  public async listStandingsByTeam(teamId: number) {
    let teamCompetitions: Standing[] = [];
    const competitions = await this.competitionUseCases.listAll();

    for (let competition of competitions) {
      let competitionStandings = await this.findCompetitionTeams(competition);
      console.log(competitionStandings);
      let teamStanding = competitionStandings.find(
        (standing) => standing.team.id === teamId
      );
      if (teamStanding instanceof Standing) {
        teamCompetitions.push(teamStanding);
      }
    }

    return teamCompetitions;
  }

  public async createCompetitionStandings(
    competition: Competition,
    standings: Standing[]
  ) {
    for (let standing of standings) {
      standing.competition = competition;
    }
    return await this.standingDbRepository.insertMany(standings);
  }

  private async updateCompetitionStandings(
    competitionId: number,
    newData: Standing[]
  ) {
    let oldData = await this.standingDbRepository.findMany({
      competition: competitionId,
    });
    if (newData) {
      // apiStandings loop
      for (let apiStanding of newData) {
        // dbStandings loop
        oldData.forEach((dbStanding, i) => {
          if (
            dbStanding.competition === apiStanding.competition &&
            dbStanding.team.id === apiStanding.team.id
          ) {
            if (apiStanding != dbStanding) {
              this.updateStanding(apiStanding);
            }
            oldData.splice(i, 1);
          }
        });
      }
      return newData;
    }
  }

  public async updateStanding(standing: Standing) {
    return await this.standingDbRepository.updateOne(standing);
  }
}

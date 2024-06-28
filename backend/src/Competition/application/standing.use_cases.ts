import IStandingRepository from "../domain/standing.repository.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Competition from "../../Competition/domain/competiton.entity.js";
import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
import Standing from "../domain/standing.entity.js";
import ICompetitionRepository from "../domain/competition.repository.js";
export default class StandingUseCases {
  constructor(
    private readonly standingApiRepository: IApiRepository<Standing>
  ) {}

  public async listStandingsByTeam(teamId: number) {
    let teamStandings: Standing[] = [];

    // search for team standing in each competition
    const competitions = await this.competitionUseCases.listAll();
    for (let competition of competitions) {
      let newStandings = await this.standingsNeedCreation(competition);
    }
    return await this.standingDbRepository.findMany({
      "team.id": teamId,
    });
  }

  public async standingsNeedCreation(competition: Competition) {
    // check if the standings of the competition exist or not
    const timmerExist = competition.standingsTimmer.existUpdate();
    //  - if it not exist, they are created and deleted standings of old seasons
    if (!timmerExist) {
      const apiCompetitionStandings = await this.standingApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });
      await this.createCompetitionStandings(
        competition,
        apiCompetitionStandings
      );
      await this.deleteOldStandings(competition);
      competition.standingsTimmer.setUpdate();
      await this.competitionUseCases.updateCompetition(competition);

      return apiCompetitionStandings;
    }
    return false;
  }

  public async needUpdate(competition: Competition) {
    let response: Standing[] | false = false;
    // check if the competition standings need update
    const standingsUpdated = competition.standingsUpdated();
    if (!standingsUpdated) {
      // if they need update:
      //   - seach all on the api repository
      const apiCompetitionStandings = await this.standingApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });

      competition.standingsTimmer.setUpdate();

      competition.updateStandingsTimmerStatus();

      //  - return the new data and set update with the actual date
      return apiCompetitionStandings;
    }
    // if they are updated, return false, instead return the new data
    return false;
  }

  private async deleteOldStandings(competition: Competition) {
    // get the standings of all the competition seasons stored
    const standings = await this.standingDbRepository.findMany({
      competition: { id: competition.id },
    });
    // get all the competition seasons that had standings stored
    let oldCompetitions: Competition[] = [];
    for (let standing of standings) {
      if (
        standing.competition.start != competition.start &&
        !oldCompetitions.includes(standing.competition)
      )
        oldCompetitions.push(standing.competition);
    }

    if (!oldCompetitions) return;

    // for each old season of the competition, delete all the stored standing
    for (let oldCompetition of oldCompetitions)
      this.standingDbRepository.deleteMany({ competition: oldCompetition });
  }
}

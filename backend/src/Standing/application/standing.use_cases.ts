import IStandingRepository from "../domain/standing.repository.js";
import IApiRepository from "../../Shared/domain/api.repository.js";
import Standing from "../domain/standing.entity.js";
import Competition from "../../Competition/domain/competiton.entity.js";
import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";

export default class StandingUseCases {
  constructor(
    private readonly standingApiRepository: IApiRepository<Standing>,
    private readonly standingDbRepository: IStandingRepository,
    private readonly competitionUseCases: CompetitionUseCases
  ) {}

  public async listStandingsByCompetition(competitionId: number) {
    const competition = await this.competitionUseCases.getCompetition(
      competitionId
    );

    const newCompetitionStandingsData = await this.standingsNeedUpdate(
      competition
    );
    if (newCompetitionStandingsData) return newCompetitionStandingsData;

    return await this.standingDbRepository.findMany({
      "competition.id": competition.id,
    });
  }

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

  private async standingsNeedUpdate(competition: Competition) {
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
      for (let standing of apiCompetitionStandings) {
        standing.competition = competition;
      }
      //   - update on database
      // check if the competition standings exist or not
      if (competition.standingsTimmer.existUpdate()) {
        //    if they not exist, they are created and delete standing of old seasons if exist
        await this.createCompetitionStandings(
          competition,
          apiCompetitionStandings
        );
        await this.deleteOldStandings(competition);
      } else {
        //    if they exist, they are updated
        await this.updateCompetitionStandings(
          competition.id,
          apiCompetitionStandings
        );
      }
      competition.standingsTimmer.setUpdate();
      //  - return the new data and set update with the actual date
      response = apiCompetitionStandings;
    } else {
      response = false;
    }
    // if the timmer has changed from the stored on db, update competition on db
    const standingsTimmerChangeStatus =
      competition.updateStandingsTimmerStatus();
    if (!standingsUpdated || standingsTimmerChangeStatus) {
      await this.competitionUseCases.updateCompetition(competition);
    }

    // if they are updated, return false, instead return the new data
    return response;
  }

  private async createCompetitionStandings(
    competition: Competition,
    standings: Standing[]
  ) {
    for (let standing of standings) standing.competition = competition;

    return await this.standingDbRepository.insertMany(standings);
  }

  private async updateCompetitionStandings(
    competitionId: number,
    newData: Standing[]
  ) {
    let oldData = await this.standingDbRepository.findMany({
      competition: competitionId,
    });
    // apiStandings loop
    for (let apiStanding of newData) {
      // dbStandings loop
      oldData.forEach((dbStanding, i) => {
        if (
          dbStanding.competition === apiStanding.competition &&
          dbStanding.team.id === apiStanding.team.id
        ) {
          if (apiStanding != dbStanding) this.updateStanding(apiStanding);

          oldData.splice(i, 1);
        }
      });
    }
    return newData;
  }

  private async updateStanding(standing: Standing) {
    return await this.standingDbRepository.updateOne(standing);
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

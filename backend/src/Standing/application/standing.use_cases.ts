import IApiRepository from "../../Shared/domain/api.repository.js";
import Competition from "../../Competition/domain/competiton.entity.js";
import Standing from "../domain/standing.entity.js";
import TeamUseCases from "../../Team/application/team.use_cases.js";
import Team from "../../Team/domain/team.entity.js";

export default class StandingUseCases {
  constructor(
    private readonly standingApiRepository: IApiRepository<Standing>,
    private readonly teamUseCases: TeamUseCases
  ) {}

  public async needCreation(competition: Competition) {
    console.log(
      `Standings (Competition ${competition.id}) ---------------------------------------------------------------`
    );
    // check if the standings of the competition exist or not
    const timmerExist = competition.standingsTimmer.isCreated();
    //  - if it not exist, they are created
    if (!timmerExist) {
      const apiCompetitionStandings = await this.standingApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });

      competition.standingsTimmer.setUpdate();

      const standingsWithTeam = apiCompetitionStandings.filter(
        (standing) => standing.team.id !== null
      );
      standingsWithTeam.forEach(
        async (standing) =>
          await this.teamUseCases.createTeam(new Team(standing.team))
      );

      return standingsWithTeam;
    }
    return false;
  }

  public async needUpdate(competition: Competition) {
    console.log(
      `Standings (Competition ${competition.id}) ---------------------------------------------------------------`
    );
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
}

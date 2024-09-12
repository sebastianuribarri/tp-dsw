import IApiRepository from "../../Shared/domain/api.repository.js";
import IMatchRepository from "../domain/match.repository.js";
import Match, {MatchDetail} from "../domain/match.entity.js";
import Competition from "../../Competition/domain/competition.entity.js";
import EventUseCases from "../../Event/application/event.use_cases.js";
import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
import CompetitionsRoutes from "../../Competition/presentation/competition.routes.js";


// const REGIONS = ["Argentina", "World"];
const REGIONS = ["Argentina"];

export default class MatchUseCases {
  public constructor(
    private readonly matchApiRepository: IApiRepository<Match>,
    private readonly matchDbRepository: IMatchRepository,
    private readonly eventUseCases: EventUseCases,
    private readonly competitionUseCases: CompetitionUseCases
  ){}

  public async needUpdate (competition: Competition){
    console.log(
      `Matchs (Competition ${competition.id})----------------------------------------------------------`
    );
    const matchesUpdated = competition.standingsUpdated();
    if (!matchesUpdated) {
      const apiCompetitionMatches = await this.matchApiRepository.findAll ({
        league: competition.id,
        season:competition.season,
      });
      competition.matchesTimmer.setUpdate();

      competition.updateMatchesTimmerStatus();
      await this.competitionUseCases.updateCompetition(competition);
      await this.updateCompetitionMatches(apiCompetitionMatches, competition);
      return apiCompetitionMatches;
    }
    return false
  }
  private async updateCompetitionMatches (matches: Match[], competition:Competition) {
    matches = matches.filter((match)=>match.date>competition.matchesTimmer.lastUpdate);
    const dbMatches = await this.matchDbRepository.findByCompetition(competition.id);
    for (let match of matches)
    {
      const dbMatch = await this.matchDbRepository.findById(match.id)
      if (!dbMatch)await this.createMatch(match)
        else await this.updateMatch(match);
    }
  }

  private async updateMatch (match: Match) {
    let dbMatch = await this.matchDbRepository.updateOne(match.id, match)
  }
    private async createMatch (match: Match) {
    const matchDetail=new MatchDetail(match, [], [])
    let dbMatch = await this.matchDbRepository.insertOne(matchDetail)
  }

  public async listAll() {
  const competitions = await this.competitionUseCases.listAll()
  for (let competition of competitions){
      await this.needUpdate(competition);
  }
  return await this.matchApiRepository.findAll();
  }


}


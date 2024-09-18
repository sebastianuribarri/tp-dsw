import IApiRepository from "../../Shared/domain/api.repository.js";
import IMatchRepository from "../domain/match.repository.js";
import Match, { MatchDetail } from "../domain/match.entity.js";
import Competition from "../../Competition/domain/competition.entity.js";
import EventUseCases from "../../Event/application/event.use_cases.js";
import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
import CompetitionsRoutes from "../../Competition/presentation/competition.routes.js";
import LineUpUseCases from "../../LineUp/application/LineUp.use_cases.js";
import LiveMatchesTimmer from "../domain/live_match.timmer.js";


// const REGIONS = ["Argentina", "World"];
const REGIONS = ["Argentina"];

export default class MatchUseCases {
  public constructor(
    private readonly matchApiRepository: IApiRepository<Match>,
    private readonly matchDbRepository: IMatchRepository,
    private readonly eventUseCases: EventUseCases,
    private readonly lineupUseCases: LineUpUseCases,
    private readonly competitionUseCases: CompetitionUseCases
  ) {}

  public async needUpdate(competition: Competition) {
    console.log(
      `Matchs (Competition ${competition.id})----------------------------------------------------------`
    );
    const matchesUpdated = competition.matchesTimmer.matchesUpdated(
      competition.end
    );
    if (!matchesUpdated) {
      const apiCompetitionMatches = await this.matchApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });

      competition.matchesTimmer.updateTimmer();

      await this.competitionUseCases.updateCompetition(competition);
      await this.updateCompetitionMatches(apiCompetitionMatches, competition);
      return apiCompetitionMatches;
    }
    return false;
  }

    public async liveMatchesNeedUpdate (){
        console.log(
      `LiveMatches ------------------------------------------------------------------------------`
    );
    const liveMatchesTimmer = await LiveMatchesTimmer.getInstance();

    if (liveMatchesTimmer.liveMatchesUpdated()) return false;
    
    const competitions = await this.competitionUseCases.listAll();
    let apiLiveMatches = await this.matchApiRepository.findAll({live:"all"});
    apiLiveMatches = apiLiveMatches.filter((match)=>
      competitions.find((competition)=>
        competition.id === match.competition.id))

    for(let liveMatch of apiLiveMatches){
      const dbMatch = await this.matchDbRepository.findById(liveMatch.id)
      if (!dbMatch) await this.createMatch(liveMatch);
      else {      
        dbMatch.updateMatch(liveMatch.date, liveMatch.status, liveMatch.goals)
        await this.updateMatch(dbMatch);
      }
    }
  }

  private async updateCompetitionMatches(
    matches: Match[],
    competition: Competition
  ) {
    const dbMatches = await this.matchDbRepository.findByCompetition(
      competition.id
    );
    for (let match of matches) {
      const dbMatch = dbMatches.find((dbMatch) => dbMatch.id === match.id);
      if (!dbMatch) await this.createMatch(match);
      else {      
        dbMatch.updateMatch(match.date, match.status, match.goals)
        await this.updateMatch(dbMatch);
      }
    }
  }

    public async getMatch (id: number){
    let matchDetail = await this.matchDbRepository.findById(id);

    let competitionMatches= await this.needUpdate(matchDetail.competition);
    if (competitionMatches){
      const match = competitionMatches.find((match_)=>match_.id===matchDetail.id)
      matchDetail.updateMatch(match.date, match.status, match.goals)
    }
    //chequear si se esta jugando

      const newEvents = await this.eventUseCases.needUpdate(
      matchDetail
    );
    if (newEvents) {
      matchDetail.events = newEvents;
    }

      const newLineUps = await this.lineupUseCases.needUpdate(
      matchDetail
    );
    if (newLineUps) {
      matchDetail.lineups = newLineUps;
    }

    if (newEvents || newLineUps || competitionMatches) this.matchDbRepository.updateOne(matchDetail.id, matchDetail)

    return matchDetail;
  }

  // public async listAll() {
  //   const competitions = await this.competitionUseCases.listAll();
  //   for (let competition of competitions) {
  //     await this.needUpdate(competition);
  //   }
  //   return await this.matchApiRepository.findAll();
  // }

  // public async listMatchesByDate(date: Date) {}

  // public async listMatchesByCompetition(competitionId: number) {}

  // public async listMatchesByTeam(teamId: number) {}

  // public async listMatchesByTeams(teamIds: number[]) {}

  public async listMatches(filters: object) {}

  public async listLiveMatches() {}


  private async updateMatch(match: Match) {
    let dbMatch = await this.matchDbRepository.updateOne(match.id, match);
  }
  private async createMatch(match: Match) {
    const matchDetail = new MatchDetail(match, [], []);
    let dbMatch = await this.matchDbRepository.insertOne(matchDetail);
  }
}

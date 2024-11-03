import IApiRepository from "../../Shared/domain/api.repository.js";
import IMatchRepository from "../domain/match.repository.js";
import Match, {
  MatchCompetition,
  MatchDetail,
} from "../domain/match.entity.js";
import Competition from "../../Competition/domain/competition.entity.js";
import EventUseCases from "../../Event/application/event.use_cases.js";
import CompetitionUseCases from "../../Competition/application/competition.use_cases.js";
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

  public async needUpdate(matchCompetition: MatchCompetition) {
    console.log(
      `Matches (Competition ${matchCompetition.id})----------------------------------------------------------`
    );
    const competition = await this.competitionUseCases.getCompetition(
      matchCompetition.id
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

  public async liveMatchesNeedUpdate() {
    console.log(
      `LiveMatches ------------------------------------------------------------------------------`
    );
    const liveMatchesTimmer = await LiveMatchesTimmer.getInstance();

    if (liveMatchesTimmer.liveMatchesUpdated()) return false;

    let apiLiveMatches = await this.matchApiRepository.findAll({ live: "all" });
    // HANDLE WITH COUNTRY PROP INSTEAD
    // const competitions = await this.competitionUseCases.listAll();
    // apiLiveMatches = apiLiveMatches.filter((match) =>
    //   competitions.find(
    //     (competition) => competition.id === match.competition.id
    //   )
    // );

    for (let liveMatch of apiLiveMatches) {
      // INCLUDE ALL THIS DIRECTLY ON THE UPDATE METHOD
      const dbMatch = await this.matchDbRepository.findById(liveMatch.id);
      if (!dbMatch) await this.createMatch(liveMatch);
      else {
        await this.updateMatch(dbMatch, liveMatch);
      }
    }
    return true;
  }

  private async updateCompetitionMatches(
    matches: Match[],
    competition: Competition
  ) {
    const dbMatches = await this.matchDbRepository.findAll({
      "competition.id": competition.id,
    });
    for (let match of matches) {
      const dbMatch = dbMatches.find((dbMatch) => dbMatch.id === match.id);
      if (!dbMatch) await this.createMatch(match);
      else {
        await this.updateMatch(dbMatch, match);
      }
    }
  }

  public async getMatch(id: number) {
    let matchDetail = await this.matchDbRepository.findById(id);
    let newMatchDetail: MatchDetail | null;

    let newCompetitionMatches = await this.needUpdate(matchDetail.competition);
    if (newCompetitionMatches) {
      const newMatch = newCompetitionMatches.find(
        (match) => match.id === matchDetail.id
      );
    } else {
      // chequear si se puede estar jugando
      // matchDetail.isPlaying() : boolean -> true: liveMatchesNeedUpdate
    }

    const newEvents = await this.eventUseCases.needUpdate(matchDetail);
    if (newEvents) {
      matchDetail.events = newEvents;
    }

    const newLineUps = await this.lineupUseCases.needUpdate(matchDetail);
    if (newLineUps) {
      matchDetail.lineups = newLineUps;
    }

    if (newMatchDetail) await this.updateMatch(matchDetail, newMatchDetail);
    if (newEvents || newLineUps || newCompetitionMatches)
      this.matchDbRepository.updateOne(matchDetail.id, matchDetail);

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

  public async listMatches(filters: Record<string, any>) {
    // get matches from db repo
    // ensure for each match competition that matches are updated
    // get matches updated from db repo
  }

  public async listLiveMatches() {
    let matchesUpdates = await this.liveMatchesNeedUpdate();
    let endDate = new Date();
    let startDate = new Date();
    startDate.setHours(startDate.getHours() - 2);
    let dbMatches = await this.matchDbRepository.findAll({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    return dbMatches;
  }

  private async updateMatch(match: Match, newMatch: Match) {
    let matchDataChange: boolean = false;
    if (newMatch instanceof MatchDetail) {
    }
    if (
      newMatch.date !== match.date ||
      newMatch.goals !== match.goals ||
      newMatch.status !== match.status
    ) {
      matchDataChange = true;
    }

    let dbMatch = await this.matchDbRepository.updateOne(match.id, match);
  }
  private async createMatch(match: Match) {
    const matchDetail = new MatchDetail(match, [], []);
    let dbMatch = await this.matchDbRepository.insertOne(matchDetail);
  }
}

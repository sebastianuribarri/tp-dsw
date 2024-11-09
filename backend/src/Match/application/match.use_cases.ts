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

const REGIONS = ["Argentina", "World"];
// const REGIONS = ["Argentina"];

export default class MatchUseCases {
  public constructor(
    private readonly matchApiRepository: IApiRepository<Match>,
    private readonly matchDbRepository: IMatchRepository,
    private readonly eventUseCases: EventUseCases,
    private readonly lineupUseCases: LineUpUseCases,
    private readonly competitionUseCases: CompetitionUseCases
  ) {}

  public async competitionMatchesNeedUpdate(
    matchCompetition: MatchCompetition
  ) {
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
      // get matches from api
      const apiCompetitionMatches = await this.matchApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });
      // update timmer
      competition.matchesTimmer.updateTimmer();
      await this.competitionUseCases.updateCompetition(competition);
      // update matches
      await this.updateCompetitionMatches(apiCompetitionMatches);
      return apiCompetitionMatches;
    }
    return false;
  }

  public async matchNeedUpdate(match: Match) {
    const competition = await this.competitionUseCases.getCompetition(
      match.competition.id
    );
    const matchUpdated = competition.matchesTimmer.matchUpdated(
      competition.end
    );
    if (!matchUpdated) {
      // get matches from api
      const apiCompetitionMatches = await this.matchApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });
      // update timmer
      competition.matchesTimmer.updateTimmer();
      await this.competitionUseCases.updateCompetition(competition);
      // update matches
      await this.updateCompetitionMatches(apiCompetitionMatches);
      return apiCompetitionMatches.find((match_) => match_.id === match.id);
    } else if (match.isPlaying()) {
      if (this.liveMatchesNeedUpdate()) {
        return await this.matchDbRepository.findById(match.id);
      }
    }
    return false;
  }

  public async liveMatchesNeedUpdate() {
    console.log(
      `LiveMatches ------------------------------------------------------------------------------`
    );

    if (LiveMatchesTimmer.liveMatchesUpdated()) return false;

    let apiLiveMatches = await this.matchApiRepository.findAll({ live: "all" });
    // HANDLE WITH COUNTRY PROP INSTEAD
    apiLiveMatches = apiLiveMatches.filter((match) =>
      REGIONS.includes(match.competition.country)
    );

    for (let liveMatch of apiLiveMatches) {
      // INCLUDE ALL THIS DIRECTLY ON THE UPDATE METHOD
      const dbMatch = await this.matchDbRepository.findById(liveMatch.id);
      if (!dbMatch) await this.createMatch(liveMatch);
      else {
        await this.updateMatch(dbMatch, liveMatch);
      }
    }
    return apiLiveMatches;
  }

  private async updateCompetitionMatches(matches: Match[]) {
    for (let match of matches) {
      const dbMatch = await this.matchDbRepository.findById(match.id);
      if (!dbMatch) await this.createMatch(match);
      else {
        await this.updateMatch(dbMatch, match);
      }
    }
  }

  public async getMatch(id: number) {
    let matchDetail = await this.matchDbRepository.findById(id);

    let matchUpdated = await this.matchNeedUpdate(matchDetail);

    if (matchUpdated) {
      matchDetail = new MatchDetail(
        matchUpdated,
        matchDetail.events,
        matchDetail.lineups
      );
    }
    const newEvents = await this.eventUseCases.needUpdate(matchDetail);
    if (newEvents) {
      matchDetail.events = newEvents;
    }

    const newLineUps = await this.lineupUseCases.needUpdate(matchDetail);
    if (newLineUps) {
      matchDetail.lineups = newLineUps;
    }
    if (newEvents || newLineUps || matchUpdated)
      this.matchDbRepository.updateOne(matchDetail.id, matchDetail);

    return matchDetail;
  }

  public async listMatchesByTeam(teamId: number) {
    const filters = { $or: [{ "home.id": teamId }, { "away.id": teamId }] };
    return await this.listMatches(filters);
  }

  // public async listMatchesByTeams(teamIds: number[]) {}

  public async listMatches(filters: Record<string, any>) {
    // get matches from db repo
    let matchChange = false;
    let matches = await this.matchDbRepository.findAll(filters);
    // ensure for each match competition that matches are updated
    if (matches.length == 0 || filters == null) {
      let competitions = await this.competitionUseCases.listAll();
      for (let competition of competitions) {
        // const competitionsMatchesUpdated =
        //   await this.competitionMatchesNeedUpdate(competition);
        // if (competitionsMatchesUpdated) matchChange = true;
      }
    } else {
      for (let match of matches) {
        // let matchUpdated = this.matchNeedUpdate(match);
        // if (matchUpdated) matchChange = true;
      }
    }
    if (matchChange) {
      return await this.matchDbRepository.findAll(filters);
    }
    return matches;
    // get matches updated from db repo
  }

  public async listLiveMatches() {
    let matchesUpdated = await this.liveMatchesNeedUpdate();
    if (matchesUpdated) return matchesUpdated;
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
    await this.matchDbRepository.updateOne(match.id, match);
  }

  private async createMatch(match: Match) {
    const matchDetail = new MatchDetail(match, [], []);
    let dbMatch = await this.matchDbRepository.insertOne(matchDetail);
  }
}

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
      if (!apiCompetitionMatches) return false;
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
    const matchUpdated = competition.matchesTimmer.matchUpdated(match.date);
    const matchesUpdated = competition.matchesTimmer.matchesUpdated(
      competition.end
    );
    if (!matchUpdated && !matchesUpdated) {
      // get matches from api
      const apiCompetitionMatches = await this.matchApiRepository.findAll({
        league: competition.id,
        season: competition.season,
      });
      if (!apiCompetitionMatches) return false;
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
    if (!apiLiveMatches) return false;
    apiLiveMatches = apiLiveMatches.filter((match) =>
      REGIONS.includes(match.competition.country)
    );

    for (let liveMatch of apiLiveMatches) {
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

  public async getMatchesByTeams(teamIds: number[]) {
    const filters = {
      $or: [{ "home.id": { $in: teamIds } }, { "away.id": { $in: teamIds } }],
    };
    return await this.listMatches(filters);
  }

  public async listMatches(filters: Record<string, any>) {
    if (filters && filters.date) {
      let start = new Date(filters.date);
      start.setHours(0, 0, 0, 0);
      let end = new Date(start);
      end.setDate(end.getDate() + 1);
      filters.date = {
        $gte: start,
        $lt: end,
      };
    }

    // get matches from db repo
    let matchChange = false;
    const originalFilters = { ...filters };
    console.log("Filters before listMatches: ", filters);
    let matches = await this.matchDbRepository.findAll(filters);

    const uniqueCompetitionsMap: Map<number, MatchCompetition> = new Map();
    matches.forEach((match) => {
      const competition = match.competition;
      if (!uniqueCompetitionsMap.has(competition.id)) {
        uniqueCompetitionsMap.set(competition.id, competition);
      }
    });

    const competitions = Array.from(uniqueCompetitionsMap.values());
    // ensure for each match competition that matches are updated
    for (let competition of competitions) {
      const competitionsMatchesUpdated =
        await this.competitionMatchesNeedUpdate(competition);
      if (competitionsMatchesUpdated) matchChange = true;
    }
    // get matches updated from db repo
    if (matchChange) {
      console.log("Filters after listMatches: ", originalFilters);

      return await this.matchDbRepository.findAll(originalFilters);
    }
    return matches;
  }

  public async getBySearch(value: string) {
    if (!value || value.length < 4) {
      throw new Error(
        "El termino de busqueda debe tener al menos 4 caracteres"
      );
    }
    console.log("Filters before getBySearch: ", { search: value });

    return await this.matchDbRepository.findAll({ search: value });
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
      newMatch.status !== match.status ||
      newMatch.round != match.round
    ) {
      await this.matchDbRepository.updateOne(match.id, newMatch);
    }
  }

  private async createMatch(match: Match) {
    const matchDetail = new MatchDetail(match, [], []);
    let dbMatch = await this.matchDbRepository.insertOne(matchDetail);
  }
}

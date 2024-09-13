import CompetitionMatchesTimmer from "../../Match/domain/match.timmer.js";
import { TimmerInput } from "../../Shared/domain/timmer.js";
import Standing from "../../Standing/domain/standing.entity.js";
import CompetitionStandingsTimmer from "../../Standing/domain/standing.timmer.js";

export default class Competition {
  readonly id: number;
  readonly start: Date;
  readonly end: Date;
  readonly name: string;
  readonly type: string;
  readonly logo: string;
  readonly coverage: {
    events: boolean;
    lineups: boolean;
  };

  standingsTimmer: CompetitionStandingsTimmer;
  matchesTimmer: CompetitionMatchesTimmer;

  constructor(competition: {
    id: number;
    start: Date;
    end: Date;
    name: string;
    type: string;
    logo: string;
    coverage: {
      events: boolean;
      lineups: boolean;
    };
    standingsTimmer?: TimmerInput;
    matchesTimmer?: TimmerInput;
  }) {
    this.id = competition.id;
    this.start = new Date(competition.start);
    this.end = new Date(competition.end);
    this.name = competition.name;
    this.type = competition.type;
    this.logo = competition.logo;
    this.coverage = competition.coverage;
    this.standingsTimmer = competition.standingsTimmer
      ? new CompetitionStandingsTimmer(competition.standingsTimmer)
      : new CompetitionStandingsTimmer();
    this.matchesTimmer = competition.matchesTimmer
      ? new CompetitionMatchesTimmer(competition.matchesTimmer)
      : new CompetitionMatchesTimmer();
  }

  get season() {
    const startDate = new Date(this.start);
    return startDate.getFullYear();
  }
}

export class CompetitionDetail extends Competition {
  standings: Standing[];

  constructor(
    competition: {
      id: number;
      start: Date;
      end: Date;
      name: string;
      type: string;
      logo: string;
      coverage: { events: boolean; lineups: boolean };
      standingsTimmer?: TimmerInput;
      matchesTimmer?: TimmerInput;
    },
    standings: Standing[]
  ) {
    super(competition);
    this.standings = standings;
  }
}

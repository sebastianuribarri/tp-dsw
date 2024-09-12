import Timmer from "../../Shared/domain/timmer.js";
import Standing from "../../Standing/domain/standing.entity.js";

export default class Competition {
  readonly id: number;
  readonly start: Date;
  readonly end: Date;
  readonly name: string;
  readonly type: string;
  readonly logo: string;
  readonly coverage: {events: boolean; lineup: boolean};

  private static readonly standingsTimmerInMinutes = 60;

  standingsTimmer: Timmer;
  matchesTimmer: Timmer;
  constructor(competition: {
    id: number;
    start: Date;
    end: Date;
    name: string;
    type: string;
    logo: string;
    coverage: {events: boolean; lineup: boolean}
    standingsTimmer?: { lastUpdate: Date | string; active: boolean };
    matchesTimmer?: { lastUpdate: Date | string; active: boolean };

  }) {
    this.id = competition.id;
    this.start = new Date(competition.start);
    this.end = new Date(competition.end);
    this.name = competition.name;
    this.type = competition.type;
    this.logo = competition.logo;
    this.coverage = competition.coverage;
    this.standingsTimmer = competition.standingsTimmer
      ? new Timmer(competition.standingsTimmer)
      : new Timmer();
    this.matchesTimmer = competition.matchesTimmer
      ? new Timmer(competition.matchesTimmer)
      : new Timmer();
  }

  get season() {
    const startDate = new Date(this.start);
    return startDate.getFullYear();
  }

  public standingsUpdated() {
    const updated = this.standingsTimmer.isUpdated(60);
    return updated;
  }

  public updateStandingsTimmerStatus() {
    const lastUpdate = this.standingsTimmer.lastUpdate;
    const oldStatus = this.standingsTimmer.active;

    // if the competitions ended 2 days or more time ago, the timer gets disable, instead it get activated
    const differenceInDays =
      (lastUpdate.getTime() - this.end.getTime()) / (1000 * 60 * 24);
    if (differenceInDays >= 2) this.standingsTimmer.disableTimmer();
    else this.standingsTimmer.activateTimmer();

    // if the status change, return true, instead return false
    if (oldStatus != this.standingsTimmer.active) return true;
    return false;
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
      coverage: {events: boolean; lineup: boolean}
      standingsTimmer?: { lastUpdate: Date | string; active: boolean };
      matchesTimmer?: { lastUpdate: Date | string; active: boolean };

    },
    standings: Standing[]
  ) {
    super(competition);
    this.standings = standings;
  }
}

import Competition from "../../Competition/domain/competiton.entity.js";
import LineUp from "../../LineUp/domain/lineup.entity.js";
import Timmer from "../../Shared/domain/timmer.js";
import Team from "../../Team/domain/team.entity.js";

export default class Match {
  id: number;
  competition: Competition;
  date: Date;
  status: string;
  home: Team;
  away: Team;
  goals: {
    home: number;
    away: number;
  };
  eventsTimmer: Timmer;
  lineupsTimmer: Timmer;

    private static readonly eventsTimmerInMinutes = 2;
    private static readonly lineupsTimmerInMinutes = 10;

  constructor (match:{
  id: number;
  competition: Competition;
  date: Date;
  status: string;
  home: Team;
  away: Team;
  goals: {
    home: number;
    away: number;
  };
  eventsTimmer: Timmer;
  lineupsTimmer: Timmer;
  }) {
    this.id= match.id
    this.competition= match.competition
    this.date= match.date
    this.status= match.status
    this.home= match.home
    this.away= match.away
    this.goals= match.goals
    this.eventsTimmer=match.eventsTimmer
      ? new Timmer(match.eventsTimmer)
      : new Timmer();
    this.lineupsTimmer=match.lineupsTimmer 
      ? new Timmer(match.lineupsTimmer)
      : new Timmer();
      
  }

    public eventsUpdated() {
    return this.eventsTimmer.isUpdated(Match.eventsTimmerInMinutes);
  }

    public lineupsUpdated() {
    return this.lineupsTimmer.isUpdated(Match.lineupsTimmerInMinutes);
  }
}


export class MatchDetail extends Match {
  events: Event[];
  lineups: LineUp[];

  constructor(
    match: Match,
    events: Event[],
    lineups: LineUp[]
  ) {
    super(match);
    this.events=events;
    this.lineups=lineups;
  }
}

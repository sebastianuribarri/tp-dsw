import Competition from "../../Competition/domain/competition.entity.js";
import MatchEventsTimmer from "../../Event/domain/event.timmer.js";
import LineUp from "../../LineUp/domain/lineup.entity.js";
import MatchLineUpTimmer from "../../LineUp/domain/lineup.timmer.js";
import Timmer, { TimmerInput } from "../../Shared/domain/timmer.js";
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
  eventsTimmer: MatchEventsTimmer;
  lineupsTimmer: MatchLineUpTimmer;

  constructor(match: {
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
    eventsTimmer: TimmerInput;
    lineupsTimmer: TimmerInput;
  }) {
    this.id = match.id;
    this.competition = match.competition;
    this.date = match.date;
    this.status = match.status;
    this.home = match.home;
    this.away = match.away;
    this.goals = match.goals;
    this.eventsTimmer = match.eventsTimmer
      ? new MatchEventsTimmer(match.eventsTimmer)
      : new MatchEventsTimmer();
    this.lineupsTimmer = match.lineupsTimmer
      ? new MatchLineUpTimmer(match.lineupsTimmer)
      : new MatchLineUpTimmer();
  }
}

export class MatchDetail extends Match {
  events: Event[];
  lineups: LineUp[];

  constructor(
    match: {
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
      eventsTimmer: TimmerInput;
      lineupsTimmer: TimmerInput;
    },
    events: Event[],
    lineups: LineUp[]
  ) {
    super(match);
    this.events = events;
    this.lineups = lineups;
  }
}

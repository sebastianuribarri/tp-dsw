import Competition, {
  CompetitionInput,
} from "../../Competition/domain/competition.entity.js";
import Event, { EventInput } from "../../Event/domain/event.entity.js";
import MatchEventsTimmer from "../../Event/domain/event.timmer.js";
import LineUp, { LineUpInput } from "../../LineUp/domain/lineup.entity.js";
import MatchLineUpTimmer from "../../LineUp/domain/lineup.timmer.js";
import { TimmerInput } from "../../Shared/domain/timmer.js";
import { TeamInput } from "../../Team/domain/team.entity.js";

// - add method isPlaying()
// - update method updateMatch(): should return boolean (change implementation also)
// - add competition season and country

export interface MatchCompetition {
  id: number;
  name: string;
  country: string;
  season: number;
  logo: string;
}
export interface MatchInput {
  id: number;
  competition: MatchCompetition;
  round: string;
  date: Date;
  status: string;
  home: TeamInput;
  away: TeamInput;
  goals: {
    home: number;
    away: number;
  };
  eventsTimmer?: TimmerInput;
  lineupsTimmer?: TimmerInput;
}

export default class Match {
  id: number;
  competition: MatchCompetition;
  round: string;
  date: Date;
  status: string;
  home: { id: number; name: string; logo: string };
  away: { id: number; name: string; logo: string };
  goals: {
    home: number;
    away: number;
  };
  eventsTimmer: MatchEventsTimmer;
  lineupsTimmer: MatchLineUpTimmer;

  constructor(match: MatchInput) {
    this.id = match.id;
    this.competition = match.competition;
    this.round = this.round;
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

  public isPlaying() {
    const differenceInHrs =
      Math.abs(this.date.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    return differenceInHrs > 2.15;
  }
}

export class MatchDetail extends Match {
  events: Event[];
  lineups: LineUp[];

  constructor(match: MatchInput, events: EventInput[], lineups: LineUpInput[]) {
    super(match);
    this.events = events.map((event) => new Event(event));
    this.lineups = lineups.map((lineup) => new LineUp(lineup));
  }
}

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
export interface MatchInput {
  id: number;
  competition: CompetitionInput;
  date: Date;
  status: string;
  home: TeamInput;
  away: TeamInput;
  goals: {
    home: number;
    away: number;
  };
  eventsTimmer: TimmerInput;
  lineupsTimmer: TimmerInput;
}

export default class Match {
  id: number;
  competition: Competition;
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
    this.competition = new Competition(match.competition);
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
  public updateMatch(
    date: Date,
    status: string,
    goals: {
      home: number;
      away: number;
    }
  ) {
    this.date = date;
    this.status = status;
    this.goals = goals;
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

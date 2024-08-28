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
  lineupsTimer: Timmer;
}

export class MatchDetail extends Match {
  events: Event[];
  lineups: LineUp[];
}

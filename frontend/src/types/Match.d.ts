import Team from "./Team";
import Competition from "./Competition";
import Event from "./Event";
interface Match {
  id: number;
  competition: Competition;
  round: string;
  status: string;
  timezone: string;
  date: Date;
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number;
    away: number;
  };
  venue: any;
}

export interface MatchDetail extends Match {
  events: Event[];
  lineups: {
    home: Lineup;
    away: Lineup;
  };
}

export default Match;

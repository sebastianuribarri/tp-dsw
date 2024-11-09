import Team from "./Team";
import Competition from "./Competition";
import Event from "./Event";
interface Match {
  id: number;
  competition: {
    id: number;
    name: string;
    start?: Date;
    end?: Date;
    logo: string;
  };
  round: string;
  status: string;
  minute?: number;
  timezone: string;
  date: string;

  home: Team;
  away: Team;

  goals: {
    home: number | null;
    away: number | null;
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

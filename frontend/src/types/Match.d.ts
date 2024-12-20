import { MatchStatus } from "./MatchStatus"; 

import Team from "./Team"; 
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
  status: MatchStatus; 
  minute?: number;
  timezone: string;
  date: string;

  home: Team;
  away: Team;

  goals: {
    home: number | null;
    away: number | null;
  };
}

export interface MatchDetail extends Match {
  events: Event[];  
  lineups: LineUp[]; 
}

export default Match;


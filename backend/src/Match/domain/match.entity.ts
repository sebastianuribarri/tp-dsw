import Competition from "../../Competition/domain/competiton.entity.js";
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
}

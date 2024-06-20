import Competition from "../../Competition/domain/competiton.entity.js";
import Team from "../../Team/domain/team.entity.js";

export default class Standing {
  competition: any; //Competition | number;
  readonly team: Team;
  readonly points: number;
  readonly goalsDiff: number;
  readonly group: string;
  readonly description: string;

  constructor(standing: {
    competition: any;
    team: Team;
    points: number;
    goalsDiff: number;
    group: string;
    description?: string;
  }) {
    this.competition = standing.competition;
    this.team = standing.team;
    this.points = standing.points;
    this.goalsDiff = standing.goalsDiff;
    this.group = standing.group;
    this.description = standing.description;
  }
}

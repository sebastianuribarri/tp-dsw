import Competition from "../../Competition/domain/competition.entity.js";
import Team from "../../Team/domain/team.entity.js";

export default class Standing {
  readonly team: {
    id: number;
    name: string;
    logo: string;
  };
  readonly points: number;
  readonly goalsDiff: number;
  readonly group: string;
  readonly description: string;

  constructor(standing: {
    team: {
      id: number;
      name: string;
      logo: string;
    };
    points: number;
    goalsDiff: number;
    group: string;
    description?: string;
  }) {
    this.team = standing.team;
    this.points = standing.points;
    this.goalsDiff = standing.goalsDiff;
    this.group = standing.group;
    this.description = standing.description;
  }
}

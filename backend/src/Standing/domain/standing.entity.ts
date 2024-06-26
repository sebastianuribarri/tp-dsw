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
    competition: {
      id: number;
      start: Date;
      end: Date;
      name: string;
      type: string;
      logo: string;
      standingsTimmer: { lastUpdate: Date; active: boolean };
    };
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
    this.competition = new Competition(standing.competition);
    this.team = new Team(standing.team);
    this.points = standing.points;
    this.goalsDiff = standing.goalsDiff;
    this.group = standing.group;
    this.description = standing.description;
  }
}

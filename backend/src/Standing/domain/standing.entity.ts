export default class Standing {
  readonly competition: number;
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
    competition: number;
    team: { id: number; name: string; logo: string };
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

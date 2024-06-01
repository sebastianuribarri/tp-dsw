export default class Competition {
  readonly id: number;
  readonly start: Date;
  readonly name: string;
  readonly type: string;
  readonly logo: string;
  constructor(competition: {
    id: number;
    start: Date;
    name: string;
    type: string;
    logo: string;
  }) {
    this.id = competition.id;
    this.start = competition.start;
    this.name = competition.name;
    this.type = competition.type;
    this.logo = competition.logo;
  }

  get season() {
    return this.start.getFullYear();
  }
}

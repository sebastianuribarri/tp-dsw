export default class Competition {
  readonly id: number;
  readonly start: Date;
  readonly end: Date;
  readonly name: string;
  readonly type: string;
  readonly logo: string;
  constructor(competition: {
    id: number;
    start: Date;
    end: Date;
    name: string;
    type: string;
    logo: string;
  }) {
    this.id = competition.id;
    this.start = competition.start;
    this.end = competition.end;
    this.name = competition.name;
    this.type = competition.type;
    this.logo = competition.logo;
  }

  get season() {
    const startDate = new Date(this.start);
    return startDate.getFullYear();
  }
}

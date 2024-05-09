import ICompetition from "./competition.js";

export default class Competition implements ICompetition {
  id: number;
  start: Date;
  name: string;
  type: string;
  logo: string;
  constructor(data: any) {
    this.id = data.league.id;
    this.start = data.seasons[0].start;
    this.name = data.league.name;
    this.type = data.league.type;
    this.logo = data.league.logo;
  }
}

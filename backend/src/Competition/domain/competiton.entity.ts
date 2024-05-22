import ICompetition from "./competition.js";

export default class Competition implements ICompetition {
  id: number;
  start: Date;
  name: string;
  type: string;
  logo: string;
  constructor(competition: { id; start; name; type; logo }) {
    this.id = competition.id;
    this.start = competition.start;
    this.name = competition.name;
    this.type = competition.type;
    this.logo = competition.logo;
  }
}

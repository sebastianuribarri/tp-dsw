import Standing from "./Standing";

export default interface Competition {
  id: number;
  name: string;
  start: Date;
  end: Date;
  logo: string;
}

export interface CompetitionDetail extends Competition {
  standings: Standing[];
  rounds: string[];
}

export default Competition;

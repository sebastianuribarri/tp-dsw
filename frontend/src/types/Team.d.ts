import Player from "./Player";

interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface TeamDetail extends Team {
  players: Player[];
}
export default Team;

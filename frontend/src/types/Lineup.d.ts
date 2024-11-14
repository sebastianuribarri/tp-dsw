import Team from "./Team";
import Player from "./Player";

export interface PlayerLineUp extends Player {
  grid?: {
    x: number;
    y: number;
  };
}
interface Lineup {
  team: number;
  formation: string;
  starters: PlayerLineUp[];
  substitutes: Player[];
}

export default Lineup;

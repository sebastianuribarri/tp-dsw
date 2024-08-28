import Player from "../../Player/domain/player.entity.js";

export interface PlayerLineUp extends Player {
  grid: {
    x: number | null;
    y: number | null;
  };
}

export default class LineUp {
  team: number;
  formation: string;
  starters: PlayerLineUp[];
  substitutes: PlayerLineUp[];
}

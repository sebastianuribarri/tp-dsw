import Player, { PlayerInput } from "../../Player/domain/player.entity.js";

export interface PlayerLineUpInput extends PlayerInput {
  grid?:
    | string
    | {
        x: number;
        y: number;
      };
}

export class PlayerLineUp extends Player {
  grid?: {
    x: number;
    y: number;
  };

  constructor(player: PlayerLineUpInput) {
    super(player);
    if (typeof player.grid === "string") {
      this.grid = {
        x: Number(player.grid ? player.grid[0] : 0),
        y: Number(player.grid ? player.grid[2] : 0),
      };
    } else this.grid = player.grid;
  }
}

export interface LineUpInput {
  team: number;
  formation: string;
  starters: PlayerLineUpInput[];
  substitutes: Player[];
}

export default class LineUp {
  team: number;
  formation: string;
  starters: PlayerLineUp[];
  substitutes: Player[];

  constructor(lineUp: LineUpInput) {
    this.formation = lineUp.formation;
    this.team = lineUp.team;
    this.starters = lineUp.starters.map((player) => new PlayerLineUp(player));
    this.substitutes = lineUp.substitutes.map((player) => new Player(player));
  }
}

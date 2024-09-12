import Player from "../../Player/domain/player.entity.js";

export class PlayerLineUp extends Player {
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

  constructor (lineUp: {
      team: number;
      formation: string;
      starters: [ {
          id: number;
          name: string;
          number: number;
          image? : string;
          position: string;
          grid? : string | null;

      } ]
      subtitutes : [ { 
        id: number;
          name: string;
          number: number;
          image? : string;
          position: string;
          grid? : string | null;
      } ]
  }) 
  {
      this.formation = lineUp.formation
      this.team = lineUp.team
      this.starters = this.playersTransformation(lineUp.starters)
      this.substitutes = this.playersTransformation(lineUp.subtitutes)

     
  }
   private playersTransformation (players) {
      return players.map((player) => { 
        player.grid = {x: Number(player.grid? player.grid[0]: 0), y: Number(player.grid? player.grid[2]: 0)}
        return new PlayerLineUp (
          player
        )}
      )
   }

}

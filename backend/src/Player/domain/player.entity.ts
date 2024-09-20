export interface PlayerInput {
  id: number;
  name: string;
  image?: string;
  number: number;
  position: string;
}

export default class Player {
  id: number;
  name: string;
  image: string;
  number: number;
  position: string;
  constructor(player: PlayerInput) {
    this.id = player.id;
    this.name = player.name;
    this.image = player.image
      ? player.image
      : `https://media.api-sports.io/football/players/${player.id}.png`;
    this.number = player.number;
    this.position = player.position;
  }
}

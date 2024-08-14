import Player from "../../Player/domain/player.entity.js";

export default class Vote {
  readonly match: number;
  readonly user: string;
  readonly player: Player;

  constructor(vote: { match: number; user: string; player: Player }) {
    this.match = vote.match;
    this.user = vote.user;
    this.player = vote.player;
  }
}

import User from "../../User/domain/user.entity.js";
import Player from "../../Player/domain/player.entity.js";

export default class Vote {
  readonly match:  number;
  readonly user: number;
  readonly player: number;


  constructor(vote: {
      match: number;
      user: number;
      player: number;
  }) {
      this.match = vote.match;
      this.user = vote.user;
      this.player = vote.player;
  }
}


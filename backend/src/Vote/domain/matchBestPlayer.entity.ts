import Player from "../../Player/domain/player.entity.js";

export default class MatchBestPlayer {
  player: Player;
  amount: number;

  constructor(matchresult: { player: Player; amount: number }) {
    this.player = matchresult.player;
    this.amount = matchresult.amount;
  }
}

import { Result } from "./prediction.entity.js";

export default class MatchPredictions {
  win: number;
  draw: number;
  lose: number;

  constructor() {
    this.win = 0;
    this.draw = 0;
    this.lose = 0;
  }
}

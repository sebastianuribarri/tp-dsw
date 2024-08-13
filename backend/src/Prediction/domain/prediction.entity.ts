export type Result = "win" | "draw" | "lose";

export default class Prediction {
  match: number;
  user: string;
  value: Result;

  constructor(match: number, user: string, value: Result) {
    this.match = match;
    this.user = user;
    this.value = value;
  }
}
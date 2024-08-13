import { Result } from "./prediction.entity.js";


export default class matchResult {
  value: Result;
  amount:number;

  constructor(value: Result, amount:number) {
    this.value = value;
    this.amount = amount;
  }
}
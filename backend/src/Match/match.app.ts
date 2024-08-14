import { Express } from "express";

export default class MatchApp {
  constructor(
    public readonly eventApp,
    public readonly lineUpApp,
    server: Express
  ) {}
}

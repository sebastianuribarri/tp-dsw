import { Express } from "express";
import standingsController from "./standing.controller.js";

export default class StandingRoutes {
  constructor(standingController: standingsController, server: Express) {}
}

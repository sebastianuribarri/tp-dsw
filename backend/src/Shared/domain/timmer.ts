import { ChildProcess } from "child_process";
import CompetitionsTimmer from "../../Competition/domain/competition.timmer.js";

export default class Timmer {
  public lastUpdate: Date;
  public active: boolean;

  constructor(timmer?: { lastUpdate: Date | string; active: boolean }) {
    this.lastUpdate = timmer ? new Date(timmer.lastUpdate) : null;
    this.active = timmer ? timmer.active : true;
  }

  public isUpdated(entityTimmer: number) {
    if (!this.active) {
      console.log("TIMMER DISABLE (no need creation, no need update)");
      return true;
    }
    if (!this.lastUpdate) {
      console.log("NO DATA (need creation)");
      return false;
    }

    let now: Date = new Date();
    let difference = (now.getTime() - this.lastUpdate.getTime()) / (1000 * 60); // tiempo transcurrido en minutos

    if (difference < entityTimmer) {
      console.log("DATA UPDATED");
      return true;
    }
    console.log("DATA UNUPDATED (need update)");
    return false;
  }

  public setUpdate() {
    this.lastUpdate = new Date();
  }

  public resetUpdate() {
    this.activateTimmer();
    this.lastUpdate = undefined;
  }

  public isCreated() {
    if (!this.active) {
      console.log("TIMMER DISABLE (no need creation)");
      return true;
    }
    if (!this.lastUpdate) {
      console.log("NO DATA (need creation)");
      return false;
    }

    console.log("DATA CREATED");

    return true;
  }
  public activateTimmer() {
    this.active = true;
  }

  public disableTimmer() {
    this.active = false;
  }
}

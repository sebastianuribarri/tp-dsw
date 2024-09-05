import { ChildProcess } from "child_process";
import CompetitionsTimmer from "../../Competition/domain/competition.timmer.js";

export default class Timmer {
  public lastUpdate: Date;
  public active: boolean;

  constructor(standingTimmer?: { lastUpdate: Date | string; active: boolean }) {
    this.lastUpdate = standingTimmer
      ? new Date(standingTimmer.lastUpdate)
      : null;
    this.active = standingTimmer ? standingTimmer.active : true;
  }

  public isUpdated(entityTimmer: number) {
    if (!this.active) {
      console.log("actualizacion desactivada");
      return true;
    }

    console.log("now:", new Date(), "last:", this.lastUpdate);
    if (!this.lastUpdate) {
      console.log("no hay registros, hay que actualizar");
      return false;
    }

    let now: Date = new Date();
    let difference = (now.getTime() - this.lastUpdate.getTime()) / (1000 * 60); // tiempo transcurrido en minutos

    if (difference < entityTimmer) {
      console.log("esta actualizado");
      return true;
    }
    console.log("hay que actualizar");
    return false;
  }

  public setUpdate() {
    this.lastUpdate = new Date();
  }

  public resetUpdate() {
    this.activateTimmer();
    this.lastUpdate = undefined;
  }

  public existUpdate() {
    const exist = this.lastUpdate !== null;
    if (!exist) console.log("No hay registros, hay que crear");
    return this.lastUpdate != null;
  }
  public activateTimmer() {
    this.active = true;
  }

  public disableTimmer() {
    this.active = false;
  }
}

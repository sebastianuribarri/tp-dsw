import { ChildProcess } from "child_process";
import CompetitionsTimmer from "../../Competition/domain/competition.timmer.js";

export default abstract class Timmer {
  public lastUpdate: Date;
  public isUpdated(entityTimmer: number) {
    if (this.lastUpdate) {
      let now: Date = new Date();
      let difference =
        (now.getTime() - this.lastUpdate.getTime()) / (1000 * 60); // tiempo transcurrido en minutos
      console.log(difference, entityTimmer);
      if (difference < entityTimmer) {
        console.log("esta actualizado");
        return true;
      } else {
        console.log("hay que actualizar");
        return false;
      }
    } else {
      console.log("no hay registros de ultima actualizacion, hay q actualizar");
      return false;
    }
  }
  public setUpdate() {
    this.lastUpdate = new Date();
  }
}

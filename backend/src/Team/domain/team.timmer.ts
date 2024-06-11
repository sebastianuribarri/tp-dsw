import Timmer from "../../Shared/domain/timmer.js";

export default class TeamsTimmer extends Timmer {
  static timmerInMinutes = 20 * 24 * 60; // 20 days

  get updated() {
    return this.isUpdated(TeamsTimmer.timmerInMinutes);
  }
}

import Timmer from "../../Shared/domain/timmer.js";

export default class CompetitionsTimmer extends Timmer {
  static timmerInMinutes = 10 * 24 * 60; // 10 days

  get updated() {
    return this.isUpdated(CompetitionsTimmer.timmerInMinutes);
  }
}

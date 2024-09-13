import Timmer from "../../Shared/domain/timmer.js";

export default class TeamPlayersTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 30 * 24 * 60; // 1 mes

  public playersUpdated() {
    return this.isUpdated(TeamPlayersTimmer.updateTimeInMinutes);
  }

  public updateTimmer() {
    this.setUpdate();
  }
}

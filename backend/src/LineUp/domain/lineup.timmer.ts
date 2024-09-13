import Timmer, { TIMMER_MODE } from "../../Shared/domain/timmer.js";

export default class MatchLineUpTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 1;

  public lineUpUpdated(status: string) {
    this.checkActiveness(status);
    return this.isUpdated(MatchLineUpTimmer.updateTimeInMinutes);
  }

  public checkLineUpCoverage(coverage: boolean) {
    if (!coverage) this.changeMode(TIMMER_MODE.NOT_UPDATE);
  }

  public updateTimmer() {
    this.setUpdate();
  }

  public checkActiveness(status: string) {}
}

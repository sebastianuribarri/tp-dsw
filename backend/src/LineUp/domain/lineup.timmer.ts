import Timmer, { TIMMER_MODE } from "../../Shared/domain/timmer.js";

export default class MatchLineUpTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 1;

  public lineUpUpdated(matchDate: Date) {
    this.checkActiveness(matchDate);
    return this.isUpdated(MatchLineUpTimmer.updateTimeInMinutes);
  }

  public checkLineUpCoverage(coverage: boolean) {
    if (!coverage) this.changeMode(TIMMER_MODE.NOT_UPDATE);
  }

  public updateTimmer() {
    this.setUpdate();
  }

  public checkActiveness(matchDate: Date) {
    if (!this.lastUpdate) return;
    if (!matchDate) return;

    if (matchDate < new Date()) this.mode = TIMMER_MODE.PRE_UPDATE;

    const differenceInMinutes =
      matchDate.getTime() - this.lastUpdate.getTime() / (1000 * 60);
    if (differenceInMinutes > 10) {
      this.mode = TIMMER_MODE.POST_UPDATE;
    }
  }
}

import Timmer, { TIMMER_MODE } from "../../Shared/domain/timmer.js";

export default class MatchEventsTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 1;

  public eventsUpdated() {
    if (this.mode !== TIMMER_MODE.NOT_UPDATE)
      return this.isUpdated(MatchEventsTimmer.updateTimeInMinutes);
  }

  public checkEventsCoverage(coverage: boolean) {
    if (!coverage) this.changeMode(TIMMER_MODE.NOT_UPDATE);
  }

  public updateTimmer(matchDate: Date) {
    this.setUpdate();
    this.checkActiveness(matchDate);
  }

  public checkActiveness(matchDate: Date) {
    if (!this.lastUpdate) return;
    if (!matchDate) return;
    if (new Date(matchDate) < new Date()) this.mode = TIMMER_MODE.PRE_UPDATE;
    const differenceInMinutes =
      new Date(matchDate).setTime(
        new Date(matchDate).getTime() + 2.3 * 60 * 60 * 1000
      ) -
      this.lastUpdate.getTime() / (1000 * 60);
    if (differenceInMinutes > 0) {
      this.mode = TIMMER_MODE.POST_UPDATE;
    }
  }
}

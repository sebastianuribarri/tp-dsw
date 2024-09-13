import Timmer, { TIMMER_MODE } from "../../Shared/domain/timmer.js";

export default class MatchEventsTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 1;

  public eventsUpdated(status: string) {
    if (this.mode !== TIMMER_MODE.NOT_UPDATE) this.checkActiveness(status);
    return this.isUpdated(MatchEventsTimmer.updateTimeInMinutes);
  }

  public checkEventsCoverage(coverage: boolean) {
    if (!coverage) this.changeMode(TIMMER_MODE.NOT_UPDATE);
  }

  public updateTimmer() {
    this.setUpdate();
  }

  public checkActiveness(status: string) {}
}

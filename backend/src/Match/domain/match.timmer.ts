import Timmer, { TIMMER_MODE } from "../../Shared/domain/timmer.js";
import LiveMatchesTimmer from "./live_match.timmer.js";

export default class CompetitionMatchesTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 12 * 60; // 12 hrs

  public matchesUpdated(competitionEnd: Date) {
    if (this.mode != TIMMER_MODE.NOT_UPDATE)
      this.checkActiveness(competitionEnd);
    return this.isUpdated(CompetitionMatchesTimmer.updateTimeInMinutes);
  }

  public matchUpdated(matchDate: Date) {
    if (!this.lastUpdate) return false;
    if (!matchDate) return true;
    const differenceInMinutes =
      matchDate.getTime() - this.lastUpdate.getTime() / (1000 * 60);
    if (differenceInMinutes > 10) {
      return false;
    }
    return true;
  }

  public matchesCreated() {
    return this.isCreated();
  }

  public checkMatchesCoverage(coverage: boolean) {
    if (!coverage) this.changeMode(TIMMER_MODE.NOT_UPDATE);
  }

  public updateTimmer() {
    this.setUpdate();
  }

  public checkActiveness(competitionEnd: Date) {
    // if the competitions ended 2 days ago or more from the last update the timmer gets disable
    if (!competitionEnd || !this.lastUpdate) {
      return;
    }
    const differenceInDays =
      (this.lastUpdate.getTime() - competitionEnd.getTime()) / (1000 * 60 * 24);
    if (differenceInDays >= 2) this.changeMode(TIMMER_MODE.POST_UPDATE);
  }
}

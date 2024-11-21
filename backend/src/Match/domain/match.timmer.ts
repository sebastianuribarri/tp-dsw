import Timmer, { TIMMER_MODE } from "../../Shared/domain/timmer.js";
import LiveMatchesTimmer from "./live_match.timmer.js";

export default class CompetitionMatchesTimmer extends Timmer {
  private static readonly updateTimeInMinutes = 6 * 60; // 12 hrs

  public matchesUpdated() {
    return this.isUpdated(CompetitionMatchesTimmer.updateTimeInMinutes);
  }

  public matchUpdated(matchDate: Date) {
    if (!this.lastUpdate) return false;
    if (!matchDate) return true;
    const differenceInMinutes =
      matchDate.getTime() - this.lastUpdate.getTime() / (1000 * 60);
    if (differenceInMinutes > 0) {
      // la ultima actualizacion fue antes que arranque el partido
      const dateMinusNow = matchDate.getTime() - new Date().getTime();
      if (dateMinusNow < 0) {
        // el partido ya arranco
        return false;
      } else {
        // el partido no arranco
        return true;
      }
    } else if (differenceInMinutes < -130) {
      // la ultima actualizacion fue despues de que termine el partido
      return true;
    } else {
      // la ultima actualizacion fue durante el partido
      this.matchesUpdated();
    }
  }

  public matchesCreated() {
    return this.isCreated();
  }

  public checkMatchesCoverage(coverage: boolean) {
    if (!coverage) this.changeMode(TIMMER_MODE.NOT_UPDATE);
  }

  public updateTimmer(competitionEnd: Date) {
    this.setUpdate();
    if (this.mode != TIMMER_MODE.NOT_UPDATE)
      this.checkActiveness(competitionEnd);
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

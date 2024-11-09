import Timmer from "../../Shared/domain/timmer.js";

// Singleton Pattern
export default class LiveMatchesTimmer extends Timmer {
  static timmerInMinutes = 2; // 2 minutes

  protected static instance: LiveMatchesTimmer;
  public static async getInstance() {
    if (LiveMatchesTimmer.instance) return LiveMatchesTimmer.instance;
    LiveMatchesTimmer.instance = new LiveMatchesTimmer();
    return LiveMatchesTimmer.instance;
  }

  public static liveMatchesUpdated() {
    this.getInstance();
    return LiveMatchesTimmer.instance.isUpdated(
      LiveMatchesTimmer.timmerInMinutes
    );
  }

  public static async updateTimmer() {
    LiveMatchesTimmer.instance.setUpdate();
  }
}

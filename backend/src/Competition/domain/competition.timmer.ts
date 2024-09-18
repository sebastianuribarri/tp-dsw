import Timmer from "../../Shared/domain/timmer.js";
import CompetitionsTimmerModel from "../infrastructure/timmer.schema.js";

// Singleton Pattern
export default class CompetitionsTimmer extends Timmer {
  static timmerInMinutes = 10 * 24 * 60; // 10 days

  protected static instance: CompetitionsTimmer;
  public static async getInstance() {
    if (CompetitionsTimmer.instance) return CompetitionsTimmer.instance;

    const timmerDoc = await CompetitionsTimmerModel.findOne();
    if (timmerDoc) {
      CompetitionsTimmer.instance = new CompetitionsTimmer(timmerDoc);
    } else {
      CompetitionsTimmer.instance = new CompetitionsTimmer();
      await CompetitionsTimmerModel.create(CompetitionsTimmer.instance);
    }
    return CompetitionsTimmer.instance;
  }

  public competitionsUpdated() {
    return CompetitionsTimmer.instance.isUpdated(
      CompetitionsTimmer.timmerInMinutes
    );
  }

  public async updateTimmer() {
    CompetitionsTimmer.instance.setUpdate();
    await CompetitionsTimmerModel.updateOne({}, CompetitionsTimmer.instance);
  }
}

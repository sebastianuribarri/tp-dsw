import Timmer from "../../Shared/domain/timmer.js";
import CompetitionsTimmerModel from "../infrastructure/timmer.schema.js";

export default class CompetitionsTimmer {
  static timmerInMinutes = 10 * 24 * 60; // 10 days

  timmer: Timmer;
  public async createTimmer() {
    const timmer = await CompetitionsTimmerModel.findOne();
    this.timmer = new Timmer(timmer);
    if (!this.timmer) {
      this.timmer = new Timmer();
      await CompetitionsTimmerModel.create(this.timmer);
    }
  }
  public competitionsUpdated() {
    return this.timmer.isUpdated(CompetitionsTimmer.timmerInMinutes);
  }

  public async updateTimmer() {
    this.timmer.setUpdate();
    await CompetitionsTimmerModel.updateOne({}, this.timmer);
  }
}

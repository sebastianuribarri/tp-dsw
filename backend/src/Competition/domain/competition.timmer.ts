import Timmer from "../../Shared/domain/timmer.js";
import CompetitionsTimmerModel from "../infrastructure/timmer.schema.js";

export default class CompetitionsTimmer {
  static timmerInMinutes = 10 * 24 * 60; // 10 days

  timmer: Timmer;
  public async createTimmer() {
    const timmerDoc = await CompetitionsTimmerModel.findOne();

    if (timmerDoc) {
      this.timmer = new Timmer({
        lastUpdate: new Date(timmerDoc.lastUpdate),
        active: timmerDoc.active,
      });
      console.log("timmer encontrado");
    } else {
      console.log("timmer creado");
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

import timmerSchema from "../../Shared/infrastructure/timmer.schema.js";
import { model } from "mongoose";
const CompetitionsTimmerModel = model("competitions_timmer", timmerSchema);

export default CompetitionsTimmerModel;

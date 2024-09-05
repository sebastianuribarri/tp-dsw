import { Schema, model } from "mongoose";
import timmerSchema from "../../Shared/infrastructure/timmer.schema.js";
import standingSchema from "../../Standing/infrastructure/standing.schema.js";

export const competitionSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  start: { type: Date, require: true, default: new Date() },
  end: { type: Date, require: true, default: new Date() },
  name: { type: String, require: true, default: "" },
  type: { type: String, default: "League" },
  logo: { type: String, require: true, default: "" },
  standingsTimmer: {
    type: timmerSchema,
    default: undefined,
  },
  standings: { type: [standingSchema], default: [] },
});

const CompetitionModel = model("competitions", competitionSchema);

export default CompetitionModel;

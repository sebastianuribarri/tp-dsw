import { Schema, model } from "mongoose";
import timmerSchema from "../../Shared/infrastructure/timmer.schema.js";
import standingSchema from "../../Standing/infrastructure/standing.schema.js";
import { RequireString } from "../../Shared/infrastructure/schema_types.js";

export const competitionSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  start: { type: Date, require: true, default: new Date() },
  end: { type: Date, require: true, default: new Date() },
  name: { type: String, require: true, default: "" },
  type: { type: String, default: "League" },
  logo: { type: String, require: true, default: "" },
  country: RequireString,
  standingsTimmer: {
    type: timmerSchema,
    default: undefined,
  },
  standings: { type: [standingSchema], default: [] },
  matchesTimmer: {
    type: timmerSchema,
    default: undefined,
  },
  coverage: {
    type: {
      events: { type: Boolean, require: true, default: true },
      lineups: { type: Boolean, require: true, default: true },
    },
    require: true,
    default: { events: true, lineups: true },
  },
});

const CompetitionModel = model("competitions", competitionSchema);

export default CompetitionModel;

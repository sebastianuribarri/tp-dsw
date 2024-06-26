import { Schema, model } from "mongoose";

export const competitionSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  start: { type: Date, require: true, default: new Date() },
  end: { type: Date, require: true, default: new Date() },
  name: { type: String, require: true, default: "" },
  type: { type: String, default: "League" },
  logo: { type: String, require: true, default: "" },
  standingsTimmer: {
    type: {
      lastUpdate: { type: Date, default: null },
      active: { type: Boolean, default: true },
    },
    default: undefined,
  },
});

const CompetitionModel = model("competitions", competitionSchema);

export default CompetitionModel;

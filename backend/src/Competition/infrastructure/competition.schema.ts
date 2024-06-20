import { Schema, model } from "mongoose";

export const competitionSchema = new Schema({
  id: { type: Number, require: true },
  start: { type: Date, require: true },
  end: { type: Date, require: true },
  name: { type: String, require: true },
  type: { type: String },
  logo: { type: String, require: true },
});

const CompetitionModel = model("competitions", competitionSchema);

export default CompetitionModel;

import { Schema, model } from "mongoose";

const competitionSchema = new Schema({
  id: { type: Number, require: true, unique: true },
  start: { type: Date, require: true },
  name: { type: String, require: true },
  type: { type: String },
  logo: { type: String, require: true },
});

const CompetitionModel = model("competitions", competitionSchema);

export default CompetitionModel;